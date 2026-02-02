
export interface ChapterEntry {
  title: string;
  content: string;
}

export interface Chapter {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  date?: string;
  yearRange?: string;
  entries: ChapterEntry[];
}

export interface Letter {
  id: string;
  title: string;
  chapterLabel: string;
  date: string;
  previewText: string;
  fullContent: string;
  image: string;
  imageCaption: string;
  themeColor?: string;
}

export interface Memory {
  title: string;
  story: string;
  date?: string;
  theme?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}
