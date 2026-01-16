// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import ChatInterface from '@/components/ChatInterface';
import Onboarding from '@/components/Onboarding';
import { OnboardingData } from '@/types';

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [userData, setUserData] = useState<OnboardingData | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const saved = localStorage.getItem('heartguide_user_data');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.completedOnboarding) {
          setUserData(data);
          setShowOnboarding(false);
        }
      } catch (e) {
        console.error('Failed to load user data:', e);
      }
    }
  }, [mounted]);

  const handleOnboardingComplete = (data: OnboardingData) => {
    setUserData(data);
    localStorage.setItem('heartguide_user_data', JSON.stringify(data));
    setShowOnboarding(false);
  };

  if (!mounted) {
    return null;
  }

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return <ChatInterface userData={userData} />;
}