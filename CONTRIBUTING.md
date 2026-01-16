# Contributing to HeartGuide

Thank you for your interest in contributing to HeartGuide! We're excited to have you join our community. This document provides guidelines and instructions for contributing.

## 🤝 Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before contributing.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- A Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))
- Git

### Setting Up Your Development Environment

1. **Fork the repository** on GitHub

2. **Clone your fork:**
   ```bash
   git clone https://github.com/yourusername/heart-guide.git
   cd heart-guide
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Create a `.env.local` file:**
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## 📝 How to Contribute

### Reporting Bugs

- Use the [GitHub issue tracker](https://github.com/yourusername/heart-guide/issues)
- Include a clear title and description
- Provide steps to reproduce the bug
- Include screenshots if applicable
- Specify your environment (OS, Node version, browser)

### Suggesting Features

- Open an issue with the `enhancement` label
- Clearly describe the feature and its use case
- Explain why it would be valuable
- Consider implementation complexity

### Submitting Pull Requests

1. **Create a branch:**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes:**
   - Write clean, readable code
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation if needed

3. **Test your changes:**
   ```bash
   npm run build
   npm run lint
   npm run type-check
   ```

4. **Commit your changes:**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```
   
   Use conventional commit messages:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation
   - `style:` for formatting
   - `refactor:` for code refactoring
   - `test:` for tests
   - `chore:` for maintenance

5. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request:**
   - Use a clear title and description
   - Reference related issues
   - Include screenshots for UI changes
   - Wait for review and address feedback

## 🎨 Code Style Guidelines

### TypeScript/React

- Use TypeScript for all new code
- Use functional components with hooks
- Keep components small and focused
- Use meaningful variable and function names
- Add JSDoc comments for public functions

### File Structure

```
src/
├── app/              # Next.js app directory
│   ├── api/          # API routes
│   └── globals.css   # Global styles
├── components/        # React components
├── lib/              # Utility functions
└── types/            # TypeScript types
```

### CSS

- Use CSS variables from `globals.css`
- Follow the existing design system
- Ensure responsive design
- Test on multiple screen sizes

## 🧪 Testing

Before submitting a PR, ensure:

- [ ] Code compiles without errors (`npm run build`)
- [ ] No TypeScript errors (`npm run type-check`)
- [ ] No linting errors (`npm run lint`)
- [ ] Manual testing of your changes
- [ ] Responsive design works on mobile/tablet/desktop

## 📚 Areas for Contribution

We welcome contributions in these areas:

### 🎯 High Priority

- **UI/UX Improvements**: Better accessibility, animations, mobile experience
- **Error Handling**: Better error messages and recovery
- **Documentation**: Code comments, README improvements, tutorials
- **Testing**: Unit tests, integration tests, E2E tests

### 💡 Feature Ideas

- **Themes**: Light/dark mode toggle
- **Export**: Export conversations as PDF/text
- **History**: Conversation history and search
- **Multi-language**: Internationalization support
- **Analytics**: Privacy-respecting usage analytics

### 🐛 Bug Fixes

- Check the [issues page](https://github.com/yourusername/heart-guide/issues) for known bugs
- Fix typos and improve documentation
- Performance optimizations

## 🏗️ Project Structure

```
heart-guide/
├── src/
│   ├── app/              # Next.js app router
│   │   ├── api/          # API routes (chat, analyze)
│   │   ├── globals.css   # Global styles & design system
│   │   └── layout.tsx    # Root layout
│   ├── components/       # React components
│   │   ├── ChatInterface.tsx
│   │   ├── Onboarding.tsx
│   │   ├── Message.tsx
│   │   └── DataAnalysisPanel.tsx
│   ├── lib/             # Utilities
│   │   ├── gemini.ts    # AI integration
│   │   ├── fallbackAnalysis.ts
│   │   └── prompts.ts
│   └── types/           # TypeScript definitions
├── public/              # Static assets
├── CONTRIBUTING.md      # This file
├── CODE_OF_CONDUCT.md   # Community guidelines
└── README.md            # Project documentation
```

## 💬 Getting Help

- **Discussions**: Use GitHub Discussions for questions
- **Issues**: Open an issue for bugs or feature requests
- **Documentation**: Check the README and code comments

## 🙏 Recognition

Contributors will be:
- Listed in the README
- Credited in release notes
- Appreciated by the community! 🎉

Thank you for contributing to HeartGuide! Your efforts help make relationship support more accessible to everyone.
