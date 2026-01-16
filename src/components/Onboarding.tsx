import React, { useState } from 'react';
import { OnboardingData } from '@/types';

interface OnboardingProps {
  onComplete: (data: OnboardingData) => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Partial<OnboardingData>>({
    primaryChallenges: [],
  });

  const totalSteps = 3;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete({
        ...data,
        completedOnboarding: true,
      } as OnboardingData);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const toggleChallenge = (challenge: string) => {
    const current = data.primaryChallenges || [];
    const updated = current.includes(challenge)
      ? current.filter(c => c !== challenge)
      : [...current, challenge];
    setData({ ...data, primaryChallenges: updated });
  };

  const challenges = [
    { id: 'communication', label: 'Communication issues', emoji: '💬' },
    { id: 'trust', label: 'Trust & honesty', emoji: '🤝' },
    { id: 'intimacy', label: 'Physical or emotional intimacy', emoji: '❤️' },
    { id: 'conflict', label: 'Conflict resolution', emoji: '⚡' },
    { id: 'time', label: 'Quality time together', emoji: '⏰' },
    { id: 'boundaries', label: 'Setting boundaries', emoji: '🚧' },
    { id: 'expectations', label: 'Unmet expectations', emoji: '🎯' },
    { id: 'family', label: 'Family dynamics', emoji: '👨‍👩‍👧' },
    { id: 'life-changes', label: 'Life transitions', emoji: '🔄' },
    { id: 'other', label: 'Something else', emoji: '💭' },
  ];

  const relationshipStatuses = [
    { id: 'dating', label: 'Dating', emoji: '💕' },
    { id: 'engaged', label: 'Engaged', emoji: '💍' },
    { id: 'married', label: 'Married', emoji: '👰' },
    { id: 'complicated', label: 'It\'s complicated', emoji: '🤷' },
    { id: 'other', label: 'Other', emoji: '💫' },
  ];

  const communicationStyles = [
    { id: 'direct', label: 'Direct & open', description: 'I say what I mean clearly' },
    { id: 'indirect', label: 'Indirect & subtle', description: 'I hint at what I need' },
    { id: 'conflict-avoidant', label: 'Conflict-avoidant', description: 'I avoid difficult topics' },
    { id: 'not-sure', label: 'Not sure', description: 'I\'m still figuring it out' },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--spacing-md)',
      }}
    >
      <div 
        className="glass-card"
        style={{
          maxWidth: '600px',
          width: '100%',
          padding: 'var(--spacing-xl)',
          background: 'rgba(8, 10, 26, 0.96)',
          animation: 'fadeIn 0.4s ease-out',
        }}
      >
        {/* Progress Bar */}
        <div style={{ marginBottom: 'var(--spacing-xl)' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 'var(--spacing-xs)',
          }}>
            <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)' }}>
              Step {step} of {totalSteps}
            </span>
            <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)' }}>
              {Math.round((step / totalSteps) * 100)}%
            </span>
          </div>
          <div style={{
            height: '4px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 'var(--radius-full)',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${(step / totalSteps) * 100}%`,
              background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))',
              transition: 'width 0.3s ease',
            }} />
          </div>
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="animate-fade-in">
            <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
              <div style={{ fontSize: '4rem', marginBottom: 'var(--spacing-md)' }}>💝</div>
              <h1 style={{ marginBottom: 'var(--spacing-sm)' }}>
                Welcome to HeartGuide
              </h1>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                Let's personalize your experience. This helps our AI provide better guidance.
              </p>
            </div>

            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <label style={{
                display: 'block',
                fontSize: 'var(--font-size-sm)',
                fontWeight: '600',
                marginBottom: 'var(--spacing-xs)',
                color: 'var(--color-text-secondary)',
              }}>
                Partner's name (optional)
              </label>
              <input
                className="input"
                placeholder="e.g., Alex"
                value={data.partnerName || ''}
                onChange={(e) => setData({ ...data, partnerName: e.target.value })}
              />
            </div>

            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <label style={{
                display: 'block',
                fontSize: 'var(--font-size-sm)',
                fontWeight: '600',
                marginBottom: 'var(--spacing-sm)',
                color: 'var(--color-text-secondary)',
              }}>
                Relationship status
              </label>
              <div style={{ display: 'grid', gap: 'var(--spacing-sm)' }}>
                {relationshipStatuses.map((status) => {
                  const isSelected = data.relationshipStatus === status.id;
                  return (
                    <button
                      key={status.id}
                      onClick={() => setData({ ...data, relationshipStatus: status.id as any })}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-sm)',
                        padding: 'var(--spacing-md)',
                      background: isSelected ? 'rgba(233, 30, 99, 0.2)' : 'rgba(8, 10, 26, 0.9)',
                      border: `2px solid ${isSelected ? 'var(--color-primary)' : 'rgba(148, 163, 184, 0.4)'}`,
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      textAlign: 'left',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.background = 'rgba(8, 10, 26, 1)';
                        e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.6)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.background = 'rgba(8, 10, 26, 0.9)';
                        e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.4)';
                      }
                    }}
                    >
                      <span style={{ fontSize: '1.5rem' }}>{status.emoji}</span>
                      <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>{status.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: 'var(--font-size-sm)',
                fontWeight: '600',
                marginBottom: 'var(--spacing-xs)',
                color: 'var(--color-text-secondary)',
              }}>
                How long have you been together?
              </label>
              <input
                className="input"
                placeholder="e.g., 2 years, 6 months, etc."
                value={data.relationshipDuration || ''}
                onChange={(e) => setData({ ...data, relationshipDuration: e.target.value })}
              />
            </div>
          </div>
        )}

        {/* Step 2: Challenges */}
        {step === 2 && (
          <div className="animate-fade-in">
            <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
              <span style={{ fontSize: '2.5rem' }}>🎯</span>
              <h2 style={{ marginTop: 'var(--spacing-sm)' }}>
                What are your main challenges?
              </h2>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                Select all that apply. This helps us give you more relevant advice.
              </p>
            </div>

            <div style={{ display: 'grid', gap: 'var(--spacing-sm)' }}>
              {challenges.map((challenge) => {
                const isSelected = data.primaryChallenges?.includes(challenge.id);
                return (
                    <button
                    key={challenge.id}
                    onClick={() => toggleChallenge(challenge.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: 'var(--spacing-md)',
                      background: isSelected ? 'rgba(233, 30, 99, 0.2)' : 'rgba(8, 10, 26, 0.9)',
                      border: `2px solid ${isSelected ? 'var(--color-primary)' : 'rgba(148, 163, 184, 0.4)'}`,
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      textAlign: 'left',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.background = 'rgba(8, 10, 26, 1)';
                        e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.6)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.background = 'rgba(8, 10, 26, 0.9)';
                        e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.4)';
                      }
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                      <span style={{ fontSize: '1.25rem' }}>{challenge.emoji}</span>
                      <span style={{ color: 'var(--color-text-primary)', fontWeight: isSelected ? 500 : 400 }}>{challenge.label}</span>
                    </div>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: 'var(--radius-sm)',
                      background: isSelected ? 'var(--color-primary)' : 'rgba(148, 163, 184, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      transition: 'all 0.2s ease',
                    }}>
                      {isSelected && '✓'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Communication Style */}
        {step === 3 && (
          <div className="animate-fade-in">
            <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
              <span style={{ fontSize: '2.5rem' }}>💬</span>
              <h2 style={{ marginTop: 'var(--spacing-sm)' }}>
                How would you describe your communication style?
              </h2>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                Understanding this helps us tailor our advice to you
              </p>
            </div>

            <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
              {communicationStyles.map((style) => {
                const isSelected = data.communicationStyle === style.id;
                return (
                  <button
                    key={style.id}
                    onClick={() => setData({ ...data, communicationStyle: style.id as any })}
                    style={{
                      padding: 'var(--spacing-lg)',
                      background: isSelected ? 'rgba(233, 30, 99, 0.16)' : 'rgba(8, 10, 26, 0.9)',
                      border: `2px solid ${isSelected ? 'var(--color-primary)' : 'rgba(148, 163, 184, 0.5)'}`,
                      borderRadius: 'var(--radius-lg)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      textAlign: 'left',
                    }}
                  >
                    <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 'var(--spacing-xs)' }}>
                      {style.label}
                    </div>
                    <div style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                      {style.description}
                    </div>
                  </button>
                );
              })}
            </div>

            <div style={{
              marginTop: 'var(--spacing-lg)',
              padding: 'var(--spacing-md)',
              background: 'rgba(124, 77, 255, 0.2)',
              border: '1px solid rgba(124, 77, 255, 0.3)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-primary)',
            }}>
              <strong style={{ color: 'var(--color-ai)' }}>💡 Privacy Note:</strong> All your data stays private and is only used to personalize your AI counseling experience.
            </div>
          </div>
        )}

        {/* Navigation */}
        <div style={{
          display: 'flex',
          gap: 'var(--spacing-sm)',
          marginTop: 'var(--spacing-xl)',
        }}>
          {step > 1 && (
            <button onClick={handleBack} className="btn" style={{ flex: 1 }}>
              ← Back
            </button>
          )}
          <button
            onClick={handleNext}
            className="btn btn-primary"
            style={{ flex: 1 }}
            disabled={step === 2 && (!data.primaryChallenges || data.primaryChallenges.length === 0)}
          >
            {step === totalSteps ? 'Start Using HeartGuide →' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
}