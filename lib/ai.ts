export async function generateFlashcards(prompt: string) {
  // Using hardcoded API key for testing
  const apiKey = "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";
  
  console.log('Using API key:', apiKey.substring(0, 20) + '...');
  
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
        model: "mistralai/mistral-7b-instruct:free", // Added :free suffix
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that generates educational flashcards. Return the flashcards in a structured JSON format with 'question' and 'answer' fields for each card.",
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

    console.log('Response status:', res.status);
    console.log('Response ok:', res.ok);

    if (!res.ok) {
      const errorText = await res.text();
      console.error('OpenRouter API Error:', errorText);
      throw new Error(`OpenRouter API failed: ${res.status} ${res.statusText} - ${errorText}`);
    }

    const data = await res.json();
    console.log('Response data:', data);
    return data.choices?.[0]?.message?.content;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

// Alternative version with different model (try this if above doesn't work)
// export async function generateFlashcardsAlt(prompt: string) {
//   const apiKey = "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";
  
//   try {
//     const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Authorization": `Bearer ${apiKey}`,
//         "Content-Type": "application/json",
//         "HTTP-Referer": "http://localhost:3000",
//         "X-Title": "Flashcard Generator"
//       },
//       body: JSON.stringify({
//         model: "openai/gpt-3.5-turbo", // Different model
//         messages: [
//           {
//             role: "system",
//             content: "You are a helpful assistant that generates educational flashcards. Return the flashcards in a structured JSON format with 'question' and 'answer' fields for each card.",
//           },
//           {
//             role: "user",
//             content: prompt
//           }
//         ],
//         max_tokens: 1000,
//         temperature: 0.7
//       })
//     });

//     if (!res.ok) {
//       const errorText = await res.text();
//       console.error('OpenRouter API Error:', errorText);
//       throw new Error(`OpenRouter API failed: ${res.status} ${res.statusText} - ${errorText}`);
//     }

//     const data = await res.json();
//     return data.choices?.[0]?.message?.content;
//   } catch (error) {
//     console.error('Fetch error:', error);
//     throw error;
//   }
// }