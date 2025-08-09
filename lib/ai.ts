// lib/ai.ts
interface TokenUsage {
  totalTokensUsed: number;
  remainingTokens: number;
  lastReset: string;
}

interface FlashcardResponse {
  success: boolean;
  flashcards?: FlashcardResponse[];
  error?: string;
  tokenUsage?: TokenUsage;
}

// Simple in-memory token tracking (resets on server restart)
let dailyTokenUsage = 0;
let lastResetDate = new Date().toDateString();

const DAILY_TOKEN_LIMIT = 2000; // Adjust based on your needs
const MAX_FLASHCARDS_PER_REQUEST = 2;

function resetTokensIfNewDay() {
  const today = new Date().toDateString();
  if (lastResetDate !== today) {
    dailyTokenUsage = 0;
    lastResetDate = today;
  }
}

function checkTokenLimit(estimatedTokens: number): boolean {
  resetTokensIfNewDay();
  return (dailyTokenUsage + estimatedTokens) <= DAILY_TOKEN_LIMIT;
}

function updateTokenUsage(tokensUsed: number) {
  dailyTokenUsage += tokensUsed;
}

function getTokenUsage(): TokenUsage {
  resetTokensIfNewDay();
  return {
    totalTokensUsed: dailyTokenUsage,
    remainingTokens: Math.max(0, DAILY_TOKEN_LIMIT - dailyTokenUsage),
    lastReset: lastResetDate
  };
}

function analyzePrompt(prompt: string): { isValid: boolean; reason?: string; estimatedTokens: number } {
  const trimmedPrompt = prompt.trim();
  
  // Basic validation
  if (trimmedPrompt.length < 10) {
    return { isValid: false, reason: "Prompt too short. Please provide more details about what you want to learn.", estimatedTokens: 0 };
  }
  
  // Check if prompt is educational/study-related
  const educationalKeywords = [
    'learn', 'study', 'explain', 'define', 'concept', 'theory', 'practice',
    'understand', 'memorize', 'review', 'exam', 'test', 'quiz', 'lesson',
    'topic', 'subject', 'course', 'chapter', 'facts', 'information'
  ];
  
  const hasEducationalIntent = educationalKeywords.some(keyword => 
    trimmedPrompt.toLowerCase().includes(keyword)
  ) || trimmedPrompt.includes('?'); // Questions are usually educational
  
  if (!hasEducationalIntent && trimmedPrompt.length < 50) {
    return { 
      isValid: false, 
      reason: "Please provide a clear educational topic or question for flashcard generation.", 
      estimatedTokens: 0 
    };
  }
  
  // Rough token estimation (1 token ≈ 4 characters for English)
  const estimatedTokens = Math.ceil(trimmedPrompt.length / 4) + 500; // +500 for response
  
  return { isValid: true, estimatedTokens };
}

export async function generateFlashcards(prompt: string): Promise<FlashcardResponse> {
  const apiKey = process.env.OPENROUTER_API_KEY as string;
  
  if (!apiKey) {
    return { success: false, error: "API key not configured" };
  }
  
  // Analyze the prompt first
  const analysis = analyzePrompt(prompt);
  if (!analysis.isValid) {
    return { success: false, error: analysis.reason, tokenUsage: getTokenUsage() };
  }
  
  // Check token limits
  if (!checkTokenLimit(analysis.estimatedTokens)) {
    return { 
      success: false, 
      error: `Token limit reached! You have used ${dailyTokenUsage} out of ${DAILY_TOKEN_LIMIT} daily tokens. Limit resets tomorrow.`,
      tokenUsage: getTokenUsage()
    };
  }
  
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Flashcard Generator"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct:free",
        messages: [
          {
            role: "system",
            content: `You are a helpful assistant that generates educational flashcards. 
            
            IMPORTANT RULES:
            1. Generate EXACTLY ${MAX_FLASHCARDS_PER_REQUEST} flashcards, no more, no less
            2. Return ONLY valid JSON in this exact format: [{"question": "...", "answer": "..."}]
            3. Questions should be clear and specific
            4. Answers should be concise but complete
            5. Focus on the most important concepts from the input
            
            If the input is not educational or unclear, respond with: {"error": "Please provide a clear educational topic"}`,
          },
          {
            role: "user",
            content: `Create ${MAX_FLASHCARDS_PER_REQUEST} flashcards about: ${prompt}`
          }
        ],
        max_tokens: 400, // Reduced to control token usage
        temperature: 0.3 // Lower for more consistent formatting
      })
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('OpenRouter API Error:', errorText);
      
      // Handle specific error cases
      if (res.status === 429) {
        return { success: false, error: "Rate limit exceeded. Please wait before making another request.", tokenUsage: getTokenUsage() };
      }
      
      return { success: false, error: "Failed to generate flashcards. Please try again.", tokenUsage: getTokenUsage() };
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      return { success: false, error: "No content received from AI", tokenUsage: getTokenUsage() };
    }
    
    console.log('Flashcards:', data?.flashcards);
console.log('Tokens remaining:', data?.tokenUsage?.remainingTokens);
    // Update token usage
    const tokensUsed = data.usage?.total_tokens || analysis.estimatedTokens;
    updateTokenUsage(tokensUsed);
    
    // Try to parse JSON response
    try {
      const parsedContent = JSON.parse(content);
      
      // Check if AI returned an error
      if (parsedContent.error) {
        return { success: false, error: parsedContent.error, tokenUsage: getTokenUsage() };
      }
      
      // Validate flashcards format
      if (!Array.isArray(parsedContent)) {
        return { success: false, error: "Invalid response format from AI", tokenUsage: getTokenUsage() };
      }
      
      const validFlashcards = parsedContent.filter(card => 
        card && typeof card === 'object' && card.question && card.answer
      );
      
      if (validFlashcards.length === 0) {
        return { success: false, error: "No valid flashcards generated", tokenUsage: getTokenUsage() };
      }
      
      return { 
        success: true, 
        flashcards: validFlashcards.slice(0, MAX_FLASHCARDS_PER_REQUEST), // Ensure limit
        tokenUsage: getTokenUsage()
      };
      
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('Raw content:', content);
      return { success: false, error: "AI returned invalid format. Please try again.", tokenUsage: getTokenUsage() };
    }
    
  } catch (error) {
    console.error('Fetch error:', error);
    return { success: false, error: "Network error. Please check your connection.", tokenUsage: getTokenUsage() };
  }
}