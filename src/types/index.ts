// src/types/index.ts

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  contextData?: RelationshipContext;
}

export interface RelationshipContext {
  relationshipDuration?: string;
  issueCategory?: IssueCategory;
  urgencyLevel?: 'low' | 'medium' | 'high';
  previousTherapy?: boolean;
  additionalNotes?: string;
}

export type IssueCategory = 
  | 'communication'
  | 'trust'
  | 'intimacy'
  | 'conflict-resolution'
  | 'life-transitions'
  | 'family-dynamics'
  | 'financial'
  | 'other';

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export interface APIResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export interface GeminiRequestBody {
  messages: Message[];
  context?: RelationshipContext;
}

export interface ConversationAnalysis {
  sentiment: 'positive' | 'neutral' | 'negative';
  keyThemes: string[];
  suggestedActions: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

export interface OnboardingData {
  partnerName?: string;
  relationshipStatus?: 'dating' | 'engaged' | 'married' | 'complicated' | 'other';
  relationshipDuration?: string;
  primaryChallenges: string[];
  communicationStyle?: 'direct' | 'indirect' | 'conflict-avoidant' | 'not-sure';
  completedOnboarding: boolean;
}

export type MoodTheme = 'calm' | 'energetic' | 'neutral' | 'focused';

export interface UserMood {
  current: MoodTheme;
  timestamp: Date;
  reason?: string;
}