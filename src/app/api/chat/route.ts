import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
  try {
    // Debug: Log environment variables
    console.log('Environment:', {
      nodeEnv: process.env.NODE_ENV,
      geminiKeyPresent: !!process.env.GEMINI_API_KEY
    });

    // Verify API key is loaded
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set in environment variables');
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const body = await req.json();
    const { message } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid or missing "message" in request body.' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    
    // Debug: Before API call
    console.log('Making API call with message:', message.substring(0, 50) + '...');

    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("Full Error:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code
    });

    return NextResponse.json(
      { 
        error: 'Internal Server Error',
        details: error.message || String(error),
        type: error.name || 'UnknownError'
      },
      { status: 500 }
    );
  }
}