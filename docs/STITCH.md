# Google Stitch Reproduction Guide: Our Shared Story

This document provides high-fidelity descriptions and technical requirements for reproducing the "Our Shared Story" application—a digital legacy designed for Gabby.

## 1. Executive Context & Philosophy

**The Purpose:** 
This application is not a social network or a simple photo album. It is a curated archive and a living dialogue. It bridges two distinct eras: the formative years of a life lived before, and the shared journey since Gabby's birth on June 12, 2008.

**The Aesthetic:** 
The design system must be **Classy, not Cheesy**. This is achieved through:
- **Restraint:** Generous white space (or dark space in dark mode) and simple, high-integrity layouts.
- **Editorial Typography:** Using serifs like *DM Serif Display* to create a sense of history and importance.
- **Subtle Motion:** Micro-animations that feel like the gentle turning of a page or a soft breath, rather than jarring digital effects.

---

## 2. Global Design System

### Color Palette
- **Primary:** `#c9731d` (Deep Orange/Classic Archive) - Used sparingly for accents and key calls to action.
- **Background:** 
  - Light: `#fbfaf8` (Canvas/Parchment) - Warm, paper-like.
  - Dark: `#211911` (Deep Espresso) - Intimate and focused.
- **Surface/Cards:** 
  - Light: `White`
  - Dark: `#2d2319` (Dark Sepia)
- **Text:**
  - Heading: `#1b140e` (Ink) - High contrast, authoritative yet soft.
  - Muted: `#957350` (Dusty Bronze) - For secondary information and metadata.

### Typography
- **Display (Serif):** Elegant, Italian-inspired serif. Used for story titles and hero messages. Always feels like high-end Swiss or Italian editorial design.
- **Body (Sans):** Clean, geometric sans-serif (e.g., *Inter*) for readability.
- **Labels:** Uppercase, high-tracking (0.3em) for a premium, institutional feel.

---

## 3. Screen-by-Screen Breakdown

### Home Page (`/`)
- **The Portal:** A minimal landing experience.
- **Hero:** A large, centered statement: "Hi Gabby. This is our shared story—the world before you, and the beautiful one since." (Italic Serif).
- **Navigation:** A grid of sophisticated cards. Each card uses a distinct earth-tone or outline style to represent a different "wing" of the archive.
- **Motion:** Subtle hover lifts (`-translate-y-1`) and shadow blooms.

### Chapter Archive View (`/chapters`)
- **The Library:** A filtered index of every milestone.
- **Visuals:** A grid of cards with a common aspect ratio.
- **Logic:** Users can filter by "Era" (BG vs. AG). BG (Before Gabby) uses slightly more muted, vintage-feeling tones, while AG (After Gabby) uses the more vibrant Primary accent.
- **Tone:** Information-dense yet clean.

### Detailed Story View (`/chapter/:id`)
- **The Immersive Narrative:** This is the heart of the app.
- **Layout:** A single-column, centered reading experience.
- **Progress:** A thin, elegant progress bar tracks the user's journey through the milestone.
- **Visuals:** Each section of the story is separated by generous vertical space, allowing the imagery (rotated slightly like physical polaroids) to breathe.
- **Tone:** Quiet, reflective, and deeply personal.

### Timeline (Life Map) (`/timeline`)
- **The Visual Journey:** A vertical connecting line that spans decades.
- **Highlight:** June 12, 2008 is marked with a distinct glowing node—the pivot point of the entire archive.
- **Aesthetic:** Alternating events create a rhythmic, branching structure.

### Letter List & Detail View (`/letters`, `/letter/:id`)
- **Personal Reflections:** These differ from chapters in their intimacy.
- **Cards:** Use themed overlays (Moss, Sage, Dust, Clay) to color-code different emotional tones.
- **Layout:** The detail view often features a sticky image card that follows the reader, keeping the visual context present during the long-form read.

### Latest Updates & AI Dialogue (`/updates`)
- **The Living Archive:** A feed of the most recently surfaced memories.
- **Sidebar Chat:** A conversational interface where Gabby can "Ask me anything." The tone of the AI response must match the classy, fatherly tone of the site—measured, warm, and wise.

---

## 4. Technical Requirements
- **Theme:** Smooth 500ms transitions between Light and Dark modes.
- **Data Binding:** All views are driven by a centralized `Chapter[]` and `Letter[]` model, identified by IDs.
- **Interaction:** Every button and link must have a distinct hover state (color shift or subtle underline).
