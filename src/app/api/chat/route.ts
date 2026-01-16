// src/app/api/chat/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getCounselorResponse } from '@/lib/gemini';
import { GeminiRequestBody } from '@/types';

/**
 * POST /api/chat
 * Handles chat messages and returns AI counselor responses
 */
export async function POST(request: NextRequest) {
  try {
    const body: GeminiRequestBody = await request.json();

    // Validation
    if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Get AI response
    const response = await getCounselorResponse(body.messages, body.context);

    return NextResponse.json({
      success: true,
      message: response,
    });

  } catch (error) {
    console.error('Chat API Error:', error);

    const errorMessage = error instanceof Error 
      ? error.message 
      : 'An unexpected error occurred';

    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage 
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/chat
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'HeartGuide API is running',
    version: '1.0.0',
  });
}