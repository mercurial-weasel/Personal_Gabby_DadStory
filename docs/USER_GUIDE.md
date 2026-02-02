
# Dad's Story Content Guide

This application loads its life stories (Chapters) and personal wisdom (Letters) directly from Markdown files. Follow this guide to add or update memories.

## Project Structure

- `/content/chapters/`: Contains main life story chapters.
- `/content/letters/`: Contains personal letters and reflections.
- `/content/manifest.json`: **Critical!** You must list the filename (without `.md`) here for the app to see it.

## How to Add a New Chapter

1. Create a new file in `/content/chapters/` (e.g., `my-new-memory.md`).
2. Add the **Frontmatter** (metadata) at the very top, followed by your story.
3. Open `/content/manifest.json` and add `"my-new-memory"` to the `chapters` array.

### Chapter Frontmatter Template
```markdown
---
id: my-id-string
title: The question you asked me
subtitle: Broad category (e.g. Early Career)
yearRange: 1990-1995
image: https://link-to-image.jpg
description: Short summary for the list view
date: October 14, 2023
---
The main body of the story goes here.
Use blank lines between paragraphs.
```

## How to Add a New Letter

1. Create a new file in `/content/letters/` (e.g., `on-bravery.md`).
2. Add the Frontmatter and content.
3. Add `"on-bravery"` to the `letters` array in `/content/manifest.json`.

### Letter Frontmatter Template
```markdown
---
id: on-bravery
title: On Bravery
chapterLabel: Chapter 15
date: Summer 2024
previewText: A short hook to show on the card view.
image: https://link-to-image.jpg
imageCaption: Location, Year
themeColor: earth-clay
---
Dear Gabby,

The body of the letter goes here.
```

### Theme Colors
For letters, you can use these `themeColor` options:
- `earth-clay` (Warm brown)
- `earth-sage` (Soft green)
- `earth-dust` (Muted tan)
- `earth-moss` (Deep olive)

## Images
You can use any public image URL. Unsplash is a great source for high-quality vintage or nature imagery. Use URLs like:
`https://images.unsplash.com/photo-NUMBER?auto=format&fit=crop&q=80&w=800`
