# Project Architecture: Dad's Story

## Technical Stack

- **Frontend Core**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/) (using ESM-based development)
- **Styling**: 
  - [Tailwind CSS](https://tailwindcss.com/) (configured via CDN in `index.html` for rapid prototyping with a custom design system).
  - Custom Vanilla CSS in `index.css`.
- **Routing**: [React Router v7](https://reactrouter.com/) (using `HashRouter` for compatibility with static deployments).
- **Icons**: [Lucide React](https://lucide.dev/) (SVG-based icon library).
- **AI Services**: [Google Gemini Pro](https://ai.google.dev/) via the `@google/generative-ai` SDK.

## Core Components & Structure

### Data Model
The application follows a service-driven pattern where content is decoupled from the UI:
- **Letters**: Individual markdown files with YAML-like frontmatter.
- **Chapters**: Structured timelines and story arcs.
- **Memories**: Generated and static life events.

### Directory Structure
```text
/
├── components/         # Reusable UI components (Navbar, Footer, etc.)
├── services/           # Business logic and data fetching (Gemini, Content)
├── content/            # Narrative data (Markdown letters, assets)
├── types/              # TypeScript definitions
├── themes.ts           # Centralized design tokens (colors, gradients, fonts)
├── App.tsx             # Main entry point and routing configuration
├── index.html          # HTML Shell and global Tailwind configuration
└── .env                # Environment variables (VITE_GEMINI_API_KEY)
```

### Design Philosophy: "The Digital Library"
- **Aesthetics**: High-contrast typography (serifs), earthy tones, and interactive cards with depth.
- **Atmosphere**: Designed to feel like a premium, physical archive—using "paper-like" backgrounds and smooth transitions.
- **Interactive Experience**: Hover effects use 3D-like transformations to emphasize the "physicality" of the archive entries.

## Key Services
- **GeminiService**: Handles the "conversational memory" feature, allowing users to chat with an AI representation of the archive.
- **ContentService**: Parses localized markdown and JSON files to hydrate the UI.
