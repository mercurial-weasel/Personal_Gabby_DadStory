# Dad's Story — A Legacy for Gabby

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

> "Hi Gabby. This is a collection of stories from my life. Take your time."

This project is a personal archive and a digital legacy designed for Gabby. It serves as a beautiful, interactive space to explore life stories, letters, and memories.

## ✨ Features

- 📖 **Story Chapters**: Chronological narratives of life's essential moments.
- ✉️ **Letters to Gabby**: Personal messages and wisdom shared through a letter-writing format.
- 🗺️ **Life Map (Timeline)**: A visual exploration of significant milestones across time.
- 🪄 **AI Memories**: Powered by Google Gemini, generating random memories or insights from the archive.
- 🌓 **Dark Mode**: Support for light and dark themes for comfortable reading.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **AI Integration**: [Google Gemini API (@google/genai)](https://ai.google.dev/)
- **Styling**: Tailwind CSS
- **Deployment**: AI Studio App (Integrated)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS recommended)

### Local Development

1. **Clone the repository** (if applicable) or navigate to the project directory.
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment**:
   Create a `.env.local` file in the root (if it doesn't exist) and add your Gemini API key:
   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```
4. **Run the app**:
   ```bash
   npm run dev
   ```
5. **Open your browser**:
   Navigate to `http://localhost:5173`.

## 📂 Content Management

Story content and letters are managed via JSON manifest files and markdown/text content located in the `/content` directory.

---

*View this app in AI Studio: [Dad's Story - A Legacy for Gabby](https://ai.studio/apps/drive/1PN6Z4NtgkWU2ovxSk3imHbAYF6NIQIvT)*
