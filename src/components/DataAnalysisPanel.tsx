// src/components/DataAnalysisPanel.tsx
import React, { useState } from 'react';

interface DataAnalysisPanelProps {
  onAnalyze: (data: string) => Promise<void>;
  isOpen: boolean;
  onClose: () => void;
}

export default function DataAnalysisPanel({ onAnalyze, isOpen, onClose }: DataAnalysisPanelProps) {
  const [data, setData] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = async () => {
    if (!data.trim()) return;

    setIsAnalyzing(true);
    try {
      await onAnalyze(data);
      setData('');
      onClose();
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--spacing-md)',
        zIndex: 'var(--z-modal)',
        animation: 'fadeIn 0.2s ease-out',
      }}
      onClick={onClose}
    >
      <div 
        className="glass-card"
        style={{
          maxWidth: '600px',
          width: '100%',
          padding: 'var(--spacing-xl)',
          maxHeight: '80vh',
          overflow: 'auto',
          background: 'rgba(8, 10, 26, 0.98)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
          <h2 style={{ marginBottom: 'var(--spacing-xs)' }}>
            Relationship Data Analysis
          </h2>
          <p style={{ 
            color: 'var(--color-text-secondary)',
            fontSize: 'var(--font-size-sm)',
          }}>
            Share structured information about your relationship for personalized insights
          </p>
        </div>

        {/* Input Area */}
        <div style={{ marginBottom: 'var(--spacing-md)' }}>
          <label 
            htmlFor="analysis-data"
            style={{
              display: 'block',
              fontSize: 'var(--font-size-sm)',
              fontWeight: '500',
              marginBottom: 'var(--spacing-xs)',
              color: 'var(--color-text-secondary)',
            }}
          >
            Relationship Information
          </label>
          <textarea
            id="analysis-data"
            className="input"
            value={data}
            onChange={(e) => setData(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.ctrlKey) {
                handleSubmit();
              }
            }}
            placeholder="Example:
• Together for: 3 years
• Main challenge: Communication during conflicts
• What we've tried: Taking breaks, writing letters
• Current situation: Arguments escalating faster
• What's working: Still make time for date nights"
            style={{ minHeight: '200px' }}
            disabled={isAnalyzing}
          />
        </div>

        {/* Example Prompt */}
        <div 
          className="glass-card"
          style={{
            padding: 'var(--spacing-md)',
            marginBottom: 'var(--spacing-md)',
            background: 'rgba(124, 77, 255, 0.15)',
            border: '1px solid rgba(124, 77, 255, 0.3)',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <div style={{ 
            fontSize: 'var(--font-size-xs)',
            fontWeight: '600',
            marginBottom: 'var(--spacing-xs)',
            color: 'var(--color-ai)',
          }}>
            💡 TIP
          </div>
          <div style={{ 
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-text-secondary)',
          }}>
            Include details like relationship duration, specific challenges, 
            what you've already tried, and any patterns you've noticed. Press Ctrl+Enter to analyze.
          </div>
        </div>

        {/* Actions */}
        <div style={{ 
          display: 'flex', 
          gap: 'var(--spacing-sm)',
          justifyContent: 'flex-end',
        }}>
          <button
            className="btn"
            onClick={onClose}
            disabled={isAnalyzing}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={!data.trim() || isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <span className="animate-pulse">●</span>
                Analyzing...
              </>
            ) : (
              'Analyze'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}