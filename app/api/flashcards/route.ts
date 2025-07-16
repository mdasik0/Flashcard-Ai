// api/flashcards/route.ts
import { NextResponse } from "next/server";
import { generateFlashcards } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const { input } = await req.json();
    
    if (!input || typeof input !== 'string' || input.trim().length === 0) {
      return NextResponse.json({ error: "Valid input is required" }, { status: 400 });
    }

    // Added: Input validation for length
    if (input.length > 2000) {
      return NextResponse.json({ error: "Input too long. Maximum 2000 characters." }, { status: 400 });
    }

    const flashcards = await generateFlashcards(input);
    
    if (!flashcards) {
      return NextResponse.json({ error: "No flashcards generated" }, { status: 500 });
    }

    return NextResponse.json({ flashcards });
  } catch (error) {
    console.error('Flashcard generation error:', error);
    
    // Better error handling
    if (error instanceof Error) {
      return NextResponse.json({ 
        error: error.message.includes('API key') ? 'Configuration error' : 'Generation failed' 
      }, { status: 500 });
    }
    
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}