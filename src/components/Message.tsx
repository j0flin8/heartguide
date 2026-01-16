// src/components/Message.tsx
import React from 'react';
import { Message as MessageType } from '@/types';

interface MessageProps {
  message: MessageType;
}

export default function Message({ message }: MessageProps) {
  const isUser = message.role === 'user';
  
  return (
    <div 
      className="animate-fade-in"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isUser ? 'flex-end' : 'flex-start',
        marginBottom: 'var(--spacing-md)',
        maxWidth: '85%',
        alignSelf: isUser ? 'flex-end' : 'flex-start',
      }}
    >
      {/* Role Label */}
      <div 
        style={{
          fontSize: 'var(--font-size-xs)',
          color: 'var(--color-text-tertiary)',
          marginBottom: 'var(--spacing-xs)',
          fontWeight: '500',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        {isUser ? 'You' : 'HeartGuide'}
      </div>

      {/* Message Bubble */}
      <div 
        className="glass-card"
        style={{
          padding: 'var(--spacing-md)',
          background: isUser 
            ? 'linear-gradient(135deg, rgba(233, 30, 99, 0.18), rgba(233, 30, 99, 0.1))'
            : 'rgba(8, 10, 26, 0.85)',
          borderLeft: isUser 
            ? '3px solid var(--color-user)'
            : '3px solid var(--color-ai)',
          maxWidth: '100%',
          boxShadow: isUser 
            ? '0 4px 12px rgba(233, 30, 99, 0.15)'
            : '0 4px 12px rgba(124, 77, 255, 0.15)',
        }}
      >
        <div 
          style={{
            color: 'var(--color-text-primary)',
            lineHeight: '1.6',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {message.content}
        </div>

        {/* Timestamp */}
        <div 
          style={{
            fontSize: 'var(--font-size-xs)',
            color: 'var(--color-text-tertiary)',
            marginTop: 'var(--spacing-xs)',
            textAlign: isUser ? 'right' : 'left',
          }}
        >
          {new Date(message.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  );
}