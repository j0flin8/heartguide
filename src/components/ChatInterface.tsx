// src/components/ChatInterface.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Message as MessageType, OnboardingData } from '@/types';
import Message from './Message';
import DataAnalysisPanel from './DataAnalysisPanel';

interface ChatInterfaceProps {
  userData: OnboardingData | null;
}

export default function ChatInterface({ userData }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAnalysisPanel, setShowAnalysisPanel] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const buildContext = () => {
    if (!userData) return undefined;

    const contextParts: string[] = [];
    
    if (userData.partnerName) {
      contextParts.push(`Partner's name: ${userData.partnerName}`);
    }
    
    if (userData.relationshipStatus) {
      contextParts.push(`Relationship status: ${userData.relationshipStatus}`);
    }
    
    if (userData.relationshipDuration) {
      contextParts.push(`Together for: ${userData.relationshipDuration}`);
    }
    
    if (userData.primaryChallenges && userData.primaryChallenges.length > 0) {
      contextParts.push(`Main challenges: ${userData.primaryChallenges.join(', ')}`);
    }
    
    if (userData.communicationStyle) {
      contextParts.push(`Communication style: ${userData.communicationStyle}`);
    }

    return contextParts.length > 0 ? {
      additionalNotes: contextParts.join('\n')
    } : undefined;
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: MessageType = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const context = buildContext();
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          context,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to get response');
      }

      const assistantMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again or refresh the page if the issue persists.',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleAnalyze = async (data: string) => {
    const analysisMessage: MessageType = {
      id: Date.now().toString(),
      role: 'user',
      content: `Please analyze this relationship data:\n\n${data}`,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, analysisMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { error: `HTTP ${response.status}: ${response.statusText}` };
        }
        throw new Error(errorData.error || 'Analysis failed');
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Analysis request failed');
      }

      if (!result.analysis || result.analysis.trim().length === 0) {
        throw new Error('Empty response received');
      }

      const assistantMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: result.analysis,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Analysis error:', error);
      
      // Even if the API fails completely, provide a helpful response
      // by analyzing the user's data locally
      try {
        if (data && data.trim().length > 0) {
          // Import fallback analysis dynamically
          const { generateFallbackAnalysis } = await import('@/lib/fallbackAnalysis');
          const fallbackAnalysis = generateFallbackAnalysis(data);
          
          const fallbackMessage: MessageType = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: fallbackAnalysis,
            timestamp: new Date(),
          };
          
          setMessages(prev => [...prev, fallbackMessage]);
          return;
        }
      } catch (fallbackError) {
        console.error('Fallback analysis also failed:', fallbackError);
      }
      
      // Last resort: generic helpful message
      const errorMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I understand you're looking for insights about your relationship. While I'm having technical difficulties right now, I'd be happy to help you explore your situation through our regular chat. Feel free to share what's on your mind, and we can work through it together.`,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleResetOnboarding = () => {
    if (confirm('Are you sure you want to reset your profile? This will clear all your personalization data.')) {
      localStorage.removeItem('heartguide_user_data');
      window.location.reload();
    }
  };

  return (
    <div
      className="container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        paddingTop: 'var(--spacing-xl)',
        paddingBottom: 'var(--spacing-xl)',
        gap: 'var(--spacing-md)',
        animation: 'fadeIn 0.35s ease-out',
      }}
    >
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--spacing-md)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
          <div
            className="glass-card"
            style={{
              width: 40,
              height: 40,
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
            }}
          >
            💝
          </div>
          <div>
            <h1 style={{ marginBottom: '2px' }}>HeartGuide</h1>
            <p
              style={{
                color: 'var(--color-text-secondary)',
                fontSize: 'var(--font-size-xs)',
              }}
            >
              {userData?.partnerName
                ? `Personalized support for you and ${userData.partnerName}`
                : 'A calm, private space for honest relationship conversations'}
            </p>
          </div>
        </div>
        <button
          onClick={handleResetOnboarding}
          className="btn btn-icon"
          style={{ fontSize: 'var(--font-size-sm)' }}
          title="Reset profile"
        >
          ⚙️
        </button>
      </header>

      <div
        className="glass-card"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: 'var(--spacing-md)',
          display: 'flex',
          flexDirection: 'column',
          background: 'rgba(6, 8, 20, 0.75)',
          borderRadius: 'var(--radius-xl)',
        }}
      >
        {messages.length === 0 ? (
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              color: 'var(--color-text-tertiary)',
              textAlign: 'center',
              padding: 'var(--spacing-xl)',
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>
              💬
            </div>
            <h3
              style={{
                marginBottom: 'var(--spacing-sm)',
                color: 'var(--color-text-secondary)',
              }}
            >
              Start Your Conversation
            </h3>
            <p
              style={{
                maxWidth: '420px',
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-text-tertiary)',
              }}
            >
              Share what is on your mind about your relationship. I am here to listen, 
              understand, and provide guidance based on what you have shared with me.
            </p>
            {userData && userData.primaryChallenges && userData.primaryChallenges.length > 0 && (
              <div
                style={{
                  marginTop: 'var(--spacing-lg)',
                  padding: 'var(--spacing-md)',
                  background: 'rgba(233, 30, 99, 0.12)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--font-size-sm)',
                }}
              >
                <div
                  style={{
                    fontWeight: 600,
                    marginBottom: 'var(--spacing-xs)',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  I can help you with:
                </div>
                <div style={{ color: 'var(--color-text-primary)' }}>
                  {userData.primaryChallenges.map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(', ')}
                </div>
              </div>
            )}
          </div>
        ) : (
          messages.map(msg => <Message key={msg.id} message={msg} />)
        )}
        
        {isLoading && (
          <div
            className="glass-card animate-fade-in"
            style={{
              padding: 'var(--spacing-sm) var(--spacing-md)',
              maxWidth: '70%',
              alignSelf: 'flex-start',
              background: 'rgba(15, 23, 42, 0.9)',
              borderLeft: '3px solid var(--color-ai)',
            }}
          >
            <div style={{ display: 'flex', gap: 'var(--spacing-xs)', alignItems: 'center' }}>
              <span className="animate-pulse">●</span>
              <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>●</span>
              <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>●</span>
              <span
                style={{
                  marginLeft: 'var(--spacing-sm)',
                  color: 'var(--color-text-secondary)',
                  fontSize: 'var(--font-size-xs)',
                }}
              >
                HeartGuide is thinking...
              </span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div
        className="glass-card"
        style={{
          padding: 'var(--spacing-md)',
          borderRadius: 'var(--radius-xl)',
          background: 'rgba(8, 10, 26, 0.9)',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 'var(--spacing-sm)',
            alignItems: 'flex-end',
          }}
        >
          <button
            className="btn btn-icon"
            onClick={() => setShowAnalysisPanel(true)}
            disabled={isLoading}
            title="Analyze relationship data"
            style={{ flexShrink: 0 }}
          >
            📊
          </button>
          
          <textarea
            ref={inputRef}
            className="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Share what's on your mind... (Shift+Enter for new line)"
            disabled={isLoading}
            style={{
              minHeight: '56px',
              maxHeight: '200px',
              resize: 'none',
            }}
          />
          
          <button
            className="btn btn-primary"
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isLoading}
            style={{ flexShrink: 0 }}
          >
            Send
          </button>
        </div>
        
        <div
          style={{
            marginTop: 'var(--spacing-xs)',
            fontSize: 'var(--font-size-xs)',
            color: 'var(--color-text-tertiary)',
            textAlign: 'center',
          }}
        >
          Remember: HeartGuide complements, but does not replace, professional therapy
        </div>
      </div>

      <DataAnalysisPanel
        isOpen={showAnalysisPanel}
        onClose={() => setShowAnalysisPanel(false)}
        onAnalyze={handleAnalyze}
      />
    </div>
  );
}