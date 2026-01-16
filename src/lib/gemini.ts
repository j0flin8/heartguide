// src/lib/gemini.ts

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { Message, RelationshipContext } from '@/types';
import { 
  COUNSELOR_SYSTEM_PROMPT, 
  buildContextualPrompt, 
  buildCrisisDetectionPrompt 
} from './prompts';

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Model configuration
const MODEL_CONFIG = {
  temperature: 0.8,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 2048,
};

// Safety settings - using BLOCK_ONLY_HIGH for relationship discussions
const SAFETY_SETTINGS = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
];

/**
 * Formats messages for Gemini API compatibility
 * @param messages - Array of Message objects to format
 * @returns Formatted messages array compatible with Gemini API
 */
function formatMessagesForGemini(messages: Message[]): any[] {
  return messages.map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }],
  }));
}

/**
 * Gets a counselor response from Gemini AI based on conversation history
 * @param messages - Array of conversation messages
 * @param context - Optional relationship context for personalization
 * @returns Promise resolving to the AI counselor's response text
 * @throws Error if API key is missing, API fails, or response is invalid
 */
export async function getCounselorResponse(
  messages: Message[],
  context?: RelationshipContext
): Promise<string> {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-3-flash-preview',
    });

    let systemContext = COUNSELOR_SYSTEM_PROMPT;
    
    if (messages.length === 1) {
      systemContext += '\n\n' + buildCrisisDetectionPrompt();
    }

    if (context) {
      systemContext += '\n\n' + buildContextualPrompt(context);
    }

    const formattedMessages = formatMessagesForGemini(messages);

    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: systemContext }],
        },
        {
          role: 'model',
          parts: [{ text: 'I understand. I\'m here to provide empathetic, evidence-based relationship guidance. How can I support you today?' }],
        },
        ...formattedMessages.slice(0, -1),
      ],
      generationConfig: MODEL_CONFIG,
      safetySettings: SAFETY_SETTINGS,
    });

    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.content);
    const response = await result.response;
    
    return response.text();
  } catch (error) {
    console.error('Gemini API Error:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('API_KEY') || error.message.includes('API key')) {
        throw new Error('AI service is not properly configured. Please check your API key.');
      }
      if (error.message.includes('404') || error.message.includes('not found')) {
        throw new Error('The AI model is temporarily unavailable. Please try again in a moment.');
      }
      throw new Error(`Failed to get counselor response: ${error.message}`);
    }
    
    throw new Error('An unexpected error occurred. Please try again.');
  }
}


/**
 * Analyzes relationship data using Gemini AI
 * Provides structured insights based on user-provided relationship information
 * @param data - String containing structured relationship data to analyze
 * @returns Promise resolving to analysis text with insights and recommendations
 * @throws Error if API key is missing, API fails, or response is empty
 */
export async function analyzeRelationshipData(data: string): Promise<string> {
    try {
      if (!process.env.GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY is not configured');
      }
  
      console.log('Creating Gemini model for analysis...');
      const model = genAI.getGenerativeModel({
        model: 'gemini-3-flash-preview',
      });
  
      const prompt = `${COUNSELOR_SYSTEM_PROMPT}
  
  You are analyzing relationship data provided by a user. Provide a thoughtful, structured analysis.
  
  **User's Data:**
  ${data}
  
  Please provide:
  1. **Key Observations**: What stands out in this data?
  2. **Patterns**: What recurring themes or issues do you notice?
  3. **Strengths**: What positive aspects can be built upon?
  4. **Areas for Growth**: What needs attention?
  5. **Actionable Recommendations**: 3-5 specific steps they can take
  
  Be compassionate, specific, and practical in your analysis.`;
  
      console.log('Sending to Gemini API...');
      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { 
          temperature: 0.7,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 2048,
        },
        safetySettings: SAFETY_SETTINGS,
      });
      
      const response = await result.response;
      const text = response.text();
      
      console.log('Analysis received:', { length: text?.length, hasText: !!text });
      
      if (!text || text.trim().length === 0) {
        throw new Error('Empty response from AI');
      }
      
      return text.trim();
    } catch (error) {
      console.error('Data Analysis Error:', error);
      
      if (error instanceof Error) {
        if (error.message.includes('quota') || error.message.includes('429')) {
          throw new Error('API quota exceeded. Please try again later or use a new API key.');
        }
        if (error.message.includes('API_KEY')) {
          throw new Error('API key is invalid or not configured.');
        }
        throw new Error(`Analysis failed: ${error.message}`);
      }
      
      throw new Error('Failed to analyze data. Please try again.');
    }
  }