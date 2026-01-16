// src/app/api/analyze/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { analyzeRelationshipData } from '@/lib/gemini';
import { generateFallbackAnalysis } from '@/lib/fallbackAnalysis';

/**
 * POST /api/analyze
 * Analyzes structured relationship data
 * Falls back to local analysis if API fails
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log('Analyze request received:', { hasData: !!body.data });

    if (!body.data || typeof body.data !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Data string is required' },
        { status: 400 }
      );
    }

    if (body.data.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Data cannot be empty' },
        { status: 400 }
      );
    }

    // Try API first
    try {
      console.log('Calling analyzeRelationshipData...');
      const analysis = await analyzeRelationshipData(body.data);
      console.log('Analysis complete:', { length: analysis?.length });

      if (analysis && analysis.trim().length > 0) {
        return NextResponse.json({
          success: true,
          analysis,
        });
      }
    } catch (apiError) {
      console.warn('API analysis failed, using fallback:', apiError);
      // Fall through to fallback analysis
    }

    // Fallback: Generate local analysis
    console.log('Generating fallback analysis...');
    const fallbackAnalysis = generateFallbackAnalysis(body.data);
    
    return NextResponse.json({
      success: true,
      analysis: fallbackAnalysis,
      fallback: true, // Indicate this was a fallback response
    });

  } catch (error) {
    console.error('Analysis API Error:', error);

    // Even if everything fails, provide a helpful fallback
    try {
      const body = await request.json();
      if (body.data && typeof body.data === 'string' && body.data.trim().length > 0) {
        const fallbackAnalysis = generateFallbackAnalysis(body.data);
        return NextResponse.json({
          success: true,
          analysis: fallbackAnalysis,
          fallback: true,
        });
      }
    } catch {
      // If we can't even parse the request, return error
    }

    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Failed to analyze data';

    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage 
      },
      { status: 500 }
    );
  }
}