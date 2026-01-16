// src/lib/fallbackAnalysis.ts
// Fallback analysis function that provides helpful insights when API is unavailable

/**
 * Generates a fallback analysis when the AI API is unavailable
 * Parses user data and provides structured insights based on detected patterns
 * @param data - String containing relationship data to analyze
 * @returns Formatted analysis text with observations, patterns, strengths, and recommendations
 */
export function generateFallbackAnalysis(data: string): string {
  const lowerData = data.toLowerCase();
  
  // Extract key information patterns
  const durationMatch = data.match(/(\d+)\s*(year|month|week|day)/i);
  const challenges: string[] = [];
  const strengths: string[] = [];
  const tried: string[] = [];
  
  // Common relationship challenges
  const challengeKeywords = {
    'communication': ['communication', 'talk', 'discuss', 'conversation', 'argue', 'fight'],
    'trust': ['trust', 'honesty', 'lie', 'secret', 'suspicious'],
    'intimacy': ['intimacy', 'sex', 'physical', 'emotional', 'connection', 'close'],
    'conflict': ['conflict', 'argument', 'disagree', 'fight', 'dispute', 'escalating'],
    'time': ['time', 'together', 'quality time', 'date', 'spend'],
    'boundaries': ['boundary', 'space', 'privacy', 'independence'],
    'expectations': ['expect', 'disappoint', 'want', 'need', 'should'],
    'family': ['family', 'parent', 'in-law', 'relative'],
    'financial': ['money', 'finance', 'budget', 'spend', 'cost'],
  };
  
  // Detect challenges
  Object.entries(challengeKeywords).forEach(([challenge, keywords]) => {
    if (keywords.some(keyword => lowerData.includes(keyword))) {
      challenges.push(challenge);
    }
  });
  
  // Extract positive aspects
  if (lowerData.includes('working') || lowerData.includes('good') || lowerData.includes('love') || lowerData.includes('happy')) {
    strengths.push('You mentioned some positive aspects in your relationship');
  }
  
  if (lowerData.includes('date night') || lowerData.includes('time together')) {
    strengths.push('You prioritize quality time together');
  }
  
  // Extract what they've tried
  const triedMatch = data.match(/tried[:\-]?\s*([^.]+)/i) || data.match(/we've tried[:\-]?\s*([^.]+)/i);
  if (triedMatch) {
    tried.push(triedMatch[1].trim());
  }
  
  // Build analysis
  let analysis = `Thank you for sharing this information about your relationship. Based on what you've provided, here's my analysis:\n\n`;
  
  // Key Observations
  analysis += `## Key Observations\n\n`;
  if (durationMatch) {
    analysis += `You've been together for ${durationMatch[0]}, which shows you have a foundation to build upon.\n\n`;
  }
  
  if (challenges.length > 0) {
    analysis += `I notice you're dealing with ${challenges.length > 1 ? 'several areas' : 'an area'} that many couples face: ${challenges.slice(0, 3).map(c => c.replace('-', ' ')).join(', ')}.\n\n`;
  }
  
  // Patterns
  analysis += `## Patterns I Notice\n\n`;
  if (lowerData.includes('escalat') || lowerData.includes('worse') || lowerData.includes('getting bad')) {
    analysis += `There seems to be a pattern where conflicts or issues are escalating. This is common when communication breaks down or when underlying needs aren't being addressed.\n\n`;
  }
  
  if (tried.length > 0) {
    analysis += `You've already tried some approaches (${tried.join(', ')}), which shows you're actively working on your relationship. Sometimes, the challenge isn't the method but the timing or how it's implemented.\n\n`;
  }
  
  // Strengths
  analysis += `## Strengths to Build On\n\n`;
  if (strengths.length > 0) {
    analysis += `${strengths.join('. ')}.\n\n`;
  } else {
    analysis += `The fact that you're seeking help and reflecting on your relationship shows commitment and self-awareness—these are significant strengths.\n\n`;
  }
  
  if (lowerData.includes('date night') || lowerData.includes('time together')) {
    analysis += `Maintaining positive rituals like date nights is a great foundation. These moments of connection can help buffer against challenges.\n\n`;
  }
  
  // Areas for Growth
  analysis += `## Areas for Growth\n\n`;
  if (challenges.includes('communication')) {
    analysis += `**Communication**: Consider exploring how you both express needs and listen to each other. Sometimes, the issue isn't what's said but how it's heard.\n\n`;
  }
  
  if (challenges.includes('conflict')) {
    analysis += `**Conflict Resolution**: When arguments escalate, it often means emotions are running high. Learning to take breaks and return to discussions when calmer can be transformative.\n\n`;
  }
  
  if (challenges.includes('trust')) {
    analysis += `**Trust**: Rebuilding trust takes time and consistent actions. Focus on small, reliable behaviors that demonstrate reliability and honesty.\n\n`;
  }
  
  if (challenges.length === 0) {
    analysis += `Based on your description, I'd recommend focusing on maintaining open communication and ensuring both partners feel heard and valued.\n\n`;
  }
  
  // Actionable Recommendations
  analysis += `## Actionable Recommendations\n\n`;
  analysis += `1. **Create a Safe Space for Discussion**: Set aside dedicated time (not during conflicts) to discuss your relationship. Use "I feel" statements and avoid blame.\n\n`;
  
  if (challenges.includes('communication')) {
    analysis += `2. **Practice Active Listening**: When your partner speaks, focus on understanding their perspective before responding. Reflect back what you heard to ensure clarity.\n\n`;
  } else {
    analysis += `2. **Regular Check-ins**: Schedule weekly relationship check-ins where you both share what's working and what needs attention.\n\n`;
  }
  
  analysis += `3. **Focus on Small Wins**: Instead of trying to fix everything at once, pick one area to improve. Small, consistent changes often lead to bigger transformations.\n\n`;
  
  if (tried.length > 0) {
    analysis += `4. **Refine What You've Tried**: Since you've already tried ${tried[0]}, consider what worked and what didn't. Sometimes adjusting the approach or timing makes all the difference.\n\n`;
  } else {
    analysis += `4. **Seek Professional Support**: Consider couples counseling or relationship workshops. A neutral third party can help identify patterns you might not see.\n\n`;
  }
  
  analysis += `5. **Prioritize Connection**: Even during challenging times, find moments to connect—whether through shared activities, physical touch, or simply being present together.\n\n`;
  
  // Closing
  analysis += `---\n\n`;
  analysis += `Remember, every relationship goes through challenges. What matters is how you navigate them together. Be patient with yourself and your partner, and celebrate progress, no matter how small.\n\n`;
  analysis += `*Note: This analysis is based on the information you provided. For deeper, personalized guidance, consider working with a licensed relationship counselor.*`;
  
  return analysis;
}
