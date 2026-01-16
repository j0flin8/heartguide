// src/app/layout.tsx
import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HeartGuide - AI Relationship Counseling',
  description: 'Empathetic, data-driven relationship advice powered by AI',
  keywords: ['relationship counseling', 'AI counselor', 'couples therapy', 'relationship advice'],
  authors: [{ name: 'HeartGuide Team' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💝</text></svg>" />
      </head>
      <body>{children}</body>
    </html>
  );
}