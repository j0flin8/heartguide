# HeartGuide Architecture

This document provides an overview of the HeartGuide application architecture to help contributors understand the codebase.

## 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Client (Browser)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │  Onboarding │  │     Chat     │  │   Analysis   │ │
│  │  Component  │  │  Interface   │  │    Panel     │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│              Next.js App Router (Server)                 │
│  ┌──────────────┐              ┌──────────────┐        │
│  │  /api/chat   │              │ /api/analyze │        │
│  └──────────────┘              └──────────────┘        │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                    Gemini AI Service                     │
│  ┌──────────────┐              ┌──────────────┐        │
│  │   Gemini    │              │   Fallback  │        │
│  │  Integration│              │   Analysis   │        │
│  └──────────────┘              └──────────────┘        │
└─────────────────────────────────────────────────────────┘
```

## 📁 Project Structure

```
heart-guide/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/                # API Routes (Server-side)
│   │   │   ├── chat/           # Chat endpoint
│   │   │   └── analyze/        # Analysis endpoint
│   │   ├── globals.css         # Global styles & design system
│   │   ├── layout.tsx          # Root layout component
│   │   └── page.tsx            # Home page (client component)
│   │
│   ├── components/             # React Components (Client-side)
│   │   ├── ChatInterface.tsx   # Main chat UI
│   │   ├── Onboarding.tsx       # Onboarding flow
│   │   ├── Message.tsx         # Message bubble component
│   │   └── DataAnalysisPanel.tsx # Analysis modal
│   │
│   ├── lib/                    # Utility Functions
│   │   ├── gemini.ts           # Gemini AI integration
│   │   ├── fallbackAnalysis.ts # Fallback analysis logic
│   │   └── prompts.ts          # AI prompt templates
│   │
│   └── types/                  # TypeScript Definitions
│       └── index.ts            # Shared type definitions
│
├── public/                     # Static Assets
└── .github/                    # GitHub Templates
```

## 🔄 Data Flow

### Chat Flow

1. **User Input** → `ChatInterface.tsx`
2. **Message Creation** → User message added to state
3. **API Call** → `POST /api/chat` with messages + context
4. **AI Processing** → `gemini.ts` → Google Gemini API
5. **Response** → Assistant message added to state
6. **UI Update** → Message displayed in chat

### Analysis Flow

1. **User Opens Panel** → `DataAnalysisPanel.tsx`
2. **User Enters Data** → Text input
3. **Submit** → `POST /api/analyze` with data
4. **Primary**: Gemini AI analysis
5. **Fallback**: `fallbackAnalysis.ts` if API fails
6. **Response** → Analysis displayed in chat

## 🎨 Component Architecture

### Component Hierarchy

```
page.tsx (Home)
├── Onboarding (if not completed)
│   └── Step 1, 2, 3 (relationship info)
│
└── ChatInterface (if onboarding complete)
    ├── Header (title, reset button)
    ├── Messages Container
    │   └── Message (user/assistant)
    └── Input Area
        ├── Analysis Button
        ├── Textarea
        └── Send Button
```

### State Management

- **Local State**: React `useState` hooks
- **Persistence**: `localStorage` for user data
- **No Global State**: Simple component-level state management

## 🔌 API Architecture

### `/api/chat`

**Purpose**: Get AI counselor responses

**Flow**:
```
Request → Validate → Build Context → Call Gemini → Return Response
```

**Input**:
```typescript
{
  messages: Message[],
  context?: RelationshipContext
}
```

**Output**:
```typescript
{
  success: boolean,
  message?: string,
  error?: string
}
```

### `/api/analyze`

**Purpose**: Analyze relationship data

**Flow**:
```
Request → Validate → Try Gemini → Fallback if fails → Return Analysis
```

**Input**:
```typescript
{
  data: string
}
```

**Output**:
```typescript
{
  success: boolean,
  analysis?: string,
  fallback?: boolean,
  error?: string
}
```

## 🎯 Key Design Decisions

### 1. Fallback Analysis System

**Why**: Ensures users always get helpful responses even if API fails

**How**: Local parsing and pattern detection in `fallbackAnalysis.ts`

### 2. Client-Side State

**Why**: Simple, no need for complex state management

**How**: React hooks + localStorage for persistence

### 3. Glassmorphism UI

**Why**: Modern, calming aesthetic appropriate for counseling app

**How**: CSS variables + backdrop-filter

### 4. TypeScript Throughout

**Why**: Type safety, better developer experience

**How**: Strict TypeScript configuration

## 🔐 Security Considerations

- **API Keys**: Server-side only, never exposed to client
- **User Data**: Stored locally, never sent to external services
- **Input Validation**: Server-side validation on all API routes
- **Error Handling**: No sensitive information in error messages

## 🚀 Performance Optimizations

- **Static Generation**: Home page is statically generated
- **Code Splitting**: Automatic with Next.js
- **API Routes**: Serverless functions scale automatically
- **CSS**: Minimal, no heavy frameworks

## 🧪 Testing Strategy

Currently manual testing. Future improvements:
- Unit tests for utility functions
- Integration tests for API routes
- E2E tests for user flows

## 📦 Dependencies

### Core
- `next`: Framework
- `react`: UI library
- `typescript`: Type safety

### AI
- `@google/generative-ai`: Gemini AI SDK

### Development
- `eslint`: Code linting
- `@types/*`: TypeScript definitions

## 🔄 Future Architecture Considerations

- **Database**: For conversation history (optional)
- **Authentication**: For user accounts (optional)
- **Real-time**: WebSocket for live updates (optional)
- **Caching**: Redis for API responses (optional)

## 📚 Related Documentation

- [Contributing Guide](CONTRIBUTING.md)
- [Deployment Guide](DEPLOYMENT.md)
- [README](README.md)
