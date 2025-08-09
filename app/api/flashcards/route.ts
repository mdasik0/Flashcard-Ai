// app/api/flashcards/route.ts
import { NextResponse } from "next/server";
import { generateFlashcards } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const { input } = await req.json();
    
    // Input validation
    if (!input || typeof input !== 'string') {
      return NextResponse.json({ 
        success: false,
        error: "Valid input is required" 
      }, { status: 400 });
    }

    const trimmedInput = input.trim();
    
    if (trimmedInput.length === 0) {
      return NextResponse.json({ 
        success: false,
        error: "Input cannot be empty" 
      }, { status: 400 });
    }

    if (trimmedInput.length > 2000) {
      return NextResponse.json({ 
        success: false,
        error: "Input too long. Maximum 2000 characters allowed." 
      }, { status: 400 });
    }

    // Generate flashcards using the enhanced function
    const result = await generateFlashcards(trimmedInput);
    
    if (!result.success) {
      return NextResponse.json({ 
        success: false,
        error: result.error,
        tokenUsage: result.tokenUsage
      }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true,
      flashcards: result.flashcards,
      tokenUsage: result.tokenUsage
    });
    
  } catch (error) {
    console.error('Flashcard generation error:', error);
    
    return NextResponse.json({ 
      success: false,
      error: "An unexpected error occurred. Please try again." 
    }, { status: 500 });
  }
}

// Optional: Add a GET endpoint to check token usage
export async function GET() {
  try {
    // You could import and use the getTokenUsage function here
    // For now, just return a simple status
    return NextResponse.json({ 
      status: "Flashcard API is running",
      info: "Use POST request with 'input' field to generate flashcards"
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 503 });
  }
}