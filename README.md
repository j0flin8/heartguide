<div align="center">

# 💝 HeartGuide

**An empathetic AI-powered relationship counseling application**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16.1-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-blue)](https://react.dev/)

*Making relationship support accessible through AI-powered guidance*

[Features](#-features) • [Getting Started](#-getting-started) • [Contributing](#-contributing) • [Roadmap](#-roadmap)

</div>

## ✨ Features

- 🤖 **AI-Powered Counseling**: Get thoughtful, evidence-based relationship advice powered by Google's Gemini AI
- 💬 **Personalized Conversations**: Chat interface with context-aware responses based on your relationship profile
- 📊 **Relationship Analysis**: Analyze structured relationship data for personalized insights (with intelligent fallback)
- 🎯 **Smart Onboarding**: Personalized experience based on your relationship status and challenges
- 🎨 **Modern UI**: Beautiful glassmorphism design with dark theme and smooth animations
- 📱 **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- 🔒 **Privacy-First**: All data stays local, no tracking, no analytics

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Google Gemini API Key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd heart-guide
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
GEMINI_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
heart-guide/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── api/          # API routes
│   │   ├── globals.css   # Global styles
│   │   └── layout.tsx    # Root layout
│   ├── components/       # React components
│   │   ├── ChatInterface.tsx
│   │   ├── Onboarding.tsx
│   │   ├── Message.tsx
│   │   └── DataAnalysisPanel.tsx
│   ├── lib/              # Utility functions
│   │   ├── gemini.ts     # Gemini AI integration
│   │   ├── fallbackAnalysis.ts  # Fallback analysis
│   │   └── prompts.ts    # AI prompts
│   └── types/            # TypeScript types
└── public/               # Static assets
```

## Deployment on Vercel

### Quick Deploy

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [Vercel](https://vercel.com) and click "New Project"
3. Import your repository
4. Add environment variable:
   - `GEMINI_API_KEY`: Your Google Gemini API key
5. Click "Deploy"

### Environment Variables

Make sure to add the following environment variable in Vercel:

- **GEMINI_API_KEY**: Your Google Gemini API key (required)

You can add these in:
- Vercel Dashboard → Your Project → Settings → Environment Variables

### Build Settings

Vercel will automatically detect Next.js and use these settings:
- **Build Command**: `npm run build`
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install`

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Key Features Implementation

- **Fallback Analysis**: If the AI API fails, the app automatically provides helpful local analysis
- **Error Handling**: Graceful error handling with user-friendly messages
- **Responsive Design**: Mobile-first approach with glassmorphism UI

## Technologies Used

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Google Generative AI** - AI counseling responses
- **React 19** - UI library

## 🤝 Contributing

We welcome contributions! HeartGuide is an open-source project, and we're excited to have you join our community.

**Ways to contribute:**
- 🐛 Report bugs
- 💡 Suggest new features
- 📝 Improve documentation
- 🎨 Enhance UI/UX
- 🔧 Fix issues
- ✨ Add new features

See our [Contributing Guide](CONTRIBUTING.md) for details on:
- Setting up your development environment
- Code style guidelines
- How to submit pull requests
- Project structure

**First time contributing?** Check out our [good first issues](https://github.com/yourusername/heart-guide/labels/good%20first%20issue)!

## 🗺️ Roadmap

### Current Focus
- ✅ Core chat functionality
- ✅ Relationship analysis
- ✅ Onboarding flow
- ✅ Fallback analysis system

### Upcoming Features
- [ ] Light/dark theme toggle
- [ ] Conversation history and export
- [ ] Multi-language support
- [ ] Enhanced mobile experience
- [ ] Unit and integration tests
- [ ] Accessibility improvements (WCAG 2.1 AA)

### Ideas & Suggestions
Have an idea? [Open a discussion](https://github.com/yourusername/heart-guide/discussions) or [create an issue](https://github.com/yourusername/heart-guide/issues)!

## 📚 Documentation

- [Contributing Guide](CONTRIBUTING.md) - How to contribute
- [Code of Conduct](CODE_OF_CONDUCT.md) - Community guidelines
- [Deployment Guide](DEPLOYMENT.md) - Deploy to Vercel

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI**: [React 19](https://react.dev/)
- **AI**: [Google Gemini AI](https://ai.google.dev/)
- **Styling**: CSS with custom design system
- **Deployment**: [Vercel](https://vercel.com)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ by the open-source community
- Inspired by evidence-based relationship therapy methods (Gottman Method, EFT)
- Powered by Google's Gemini AI

## 📞 Support & Community

- 🐛 **Bug Reports**: [Open an issue](https://github.com/j0flin8/heart-guide/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/j0flin8/heart-guide/discussions)
- 📧 **Questions**: Open a discussion or issue

---

<div align="center">

**Made with 💝 for better relationships**

⭐ Star this repo if you find it helpful!

</div>
