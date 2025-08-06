// lib/ai.ts
export async function generateFlashcards(prompt: string) {
  const apiKey = "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";
  
  // List of free models to try (updated for 2025)
  const freeModels = [
    "google/gemma-2-9b-it:free",
    "meta-llama/llama-3.2-3b-instruct:free", 
    "microsoft/phi-3-mini-128k-instruct:free",
    "qwen/qwen-2-7b-instruct:free",
    "huggingfaceh4/zephyr-7b-beta:free",
    "openchat/openchat-7b:free"
  ];
  
  console.log('Trying multiple models...');
  
  for (const model of freeModels) {
    try {
      console.log(`Trying model: ${model}`);
      
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "Flashcard Generator"
        },
        body: JSON.stringify({
          model: model,
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant that generates educational flashcards. Create 5 flashcards in this format:\n\nQ: [Question]\nA: [Answer]\n\nQ: [Question]\nA: [Answer]",
            },
            {
              role: "user",
              content: prompt
            }
          ],
          max_tokens: 1000,
          temperature: 0.7
        })
      });

      console.log(`Model ${model} - Status: ${res.status}`);

      if (res.ok) {
        const data = await res.json();
        console.log(`Success with model: ${model}`, data);
        return data.choices?.[0]?.message?.content;
      } else {
        const errorText = await res.text();
        console.log(`Model ${model} failed:`, errorText);
        // Continue to next model
        continue;
      }
    } catch (error) {
      console.log(`Model ${model} error:`, error);
      // Continue to next model
      continue;
    }
  }
  
  // If all models failed
  throw new Error("All free models failed. Please check your API key or try again later.");
}

// Alternative: Single model version with better error handling
export async function generateFlashcardsSimple(prompt: string) {
  const apiKey = "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";
  
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
        model: "google/gemma-2-9b-it:free",
        messages: [
          {
            role: "system",
            content: "Create 5 educational flashcards about the given topic. Format each as:\n\nQ: [Question]\nA: [Answer]\n",
          },
          {
            role: "user",
            content: `Create flashcards about: ${prompt}`
          }
        ],
        max_tokens: 800,
        temperature: 0.7
      })
    });

    console.log('Response status:', res.status);
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error('API Error:', errorText);
      
      // Parse error to give better feedback
      try {
        const errorData = JSON.parse(errorText);
        if (errorData.error?.message) {
          throw new Error(errorData.error.message);
        }
      } catch (parseError) {
        // If can't parse, use original error
      }
      
      throw new Error(`API Error (${res.status}): ${errorText}`);
    }

    const data = await res.json();
    console.log('Success:', data);
    
    if (data.choices?.[0]?.message?.content) {
      return data.choices[0].message.content;
    } else {
      throw new Error('No content in response');
    }
    
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

// Check available models (diagnostic function)
export async function checkAvailableModels() {
  const apiKey = "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";
  
  try {
    const res = await fetch("https://openrouter.ai/api/v1/models", {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      }
    });
    
    if (res.ok) {
      const data = await res.json();
      const freeModels = data.data.filter((model: any) => 
        model.pricing?.prompt === "0" || model.id.includes(":free")
      );
      console.log('Available free models:', freeModels.map((m: any) => m.id));
      return freeModels;
    }
  } catch (error) {
    console.error('Error checking models:', error);
  }
  return [];
}