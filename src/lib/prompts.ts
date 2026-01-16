// src/lib/prompts.ts

import { RelationshipContext, IssueCategory } from '@/types';

export const COUNSELOR_SYSTEM_PROMPT = `You are HeartGuide, an empathetic and professional relationship counselor AI. Your role is to:

1. **Listen Actively**: Acknowledge emotions and validate feelings without judgment
2. **Ask Thoughtful Questions**: Help users explore their feelings and situations deeper
3. **Provide Evidence-Based Advice**: Draw from established relationship psychology (Gottman Method, Emotionally Focused Therapy, etc.)
4. **Maintain Boundaries**: You're a supportive guide, not a replacement for professional therapy in crisis situations
5. **Encourage Action**: Provide practical, actionable steps users can take

**Communication Style**:
- Warm, compassionate, and non-judgmental
- Use "I" statements when offering perspectives ("I notice...", "I wonder if...")
- Ask open-ended questions to encourage reflection
- Acknowledge both partners' perspectives when applicable
- Be direct but gentle when addressing difficult truths

**Safety Protocols**:
- If you detect signs of abuse, crisis, or severe mental health issues, encourage immediate professional help
- Remind users that you complement, but don't replace, professional therapy
- Never make definitive diagnoses or prescribe treatments

**Conversation Structure**:
1. Validate their feelings first
2. Clarify the situation with questions if needed
3. Offer insights or reframe perspectives
4. Provide 2-3 concrete action steps
5. Check in on their readiness to try these steps

Remember: Your goal is to empower users to understand their relationships better and make informed decisions about their path forward.`;

export function buildContextualPrompt(context?: RelationshipContext): string {
  if (!context) return '';

  const parts: string[] = ['**Context Information:**'];

  if (context.relationshipDuration) {
    parts.push(`- Relationship Duration: ${context.relationshipDuration}`);
  }

  if (context.issueCategory) {
    parts.push(`- Primary Issue: ${formatIssueCategory(context.issueCategory)}`);
  }

  if (context.urgencyLevel) {
    parts.push(`- Urgency Level: ${context.urgencyLevel}`);
  }

  if (context.previousTherapy !== undefined) {
    parts.push(`- Previous Therapy Experience: ${context.previousTherapy ? 'Yes' : 'No'}`);
  }

  if (context.additionalNotes) {
    parts.push(`- Additional Notes: ${context.additionalNotes}`);
  }

  return parts.join('\n');
}

export function formatIssueCategory(category: IssueCategory): string {
  const categoryMap: Record<IssueCategory, string> = {
    'communication': 'Communication Issues',
    'trust': 'Trust & Honesty',
    'intimacy': 'Intimacy & Connection',
    'conflict-resolution': 'Conflict Resolution',
    'life-transitions': 'Life Transitions',
    'family-dynamics': 'Family Dynamics',
    'financial': 'Financial Concerns',
    'other': 'General Relationship Concerns'
  };

  return categoryMap[category] || category;
}

export function buildCrisisDetectionPrompt(): string {
  return `Before responding, quickly assess if this message contains:
- Immediate safety concerns (abuse, self-harm, violence)
- Crisis-level mental health symptoms
- Urgent situations requiring professional intervention

If detected, prioritize safety in your response and direct them to appropriate resources.`;
}

export const CRISIS_RESOURCES = `**Immediate Help Resources**:
- **National Domestic Violence Hotline**: 1-800-799-7233 (24/7)
- **National Suicide Prevention Lifeline**: 988 (24/7)
- **Crisis Text Line**: Text HOME to 741741
- **SAMHSA National Helpline**: 1-800-662-4357 (Mental Health/Substance Abuse)

For ongoing support, please consider reaching out to a licensed therapist in your area.`;

export function buildDataAnalysisPrompt(data: string): string {
  return `The user has provided the following structured data about their relationship for analysis:

${data}

Please analyze this information and provide:
1. **Key Patterns**: What patterns or themes do you notice?
2. **Potential Areas of Concern**: What might need attention?
3. **Strengths to Build On**: What's working well?
4. **Recommended Focus Areas**: Where should they direct their energy?

Keep your analysis compassionate, specific, and actionable.`;
}