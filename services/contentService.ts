import { Chapter, Letter, ChapterEntry } from '@/types';

interface Manifest {
  chapters: string[];
  letters: string[];
}

export class ContentService {
  private static manifest: Manifest | null = null;

export class ContentService {
  private static parseFrontmatter(content: string): { data: Record<string, string>, body: string } {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);

    const data: Record<string, string> = {};
    if (!match) return { data, body: content };

    const yamlBlock = match[1];
    const body = match[2];

    yamlBlock.split('\n').forEach(line => {
      const splitIndex = line.indexOf(':');
      if (splitIndex !== -1) {
        const key = line.substring(0, splitIndex).trim();
        const value = line.substring(splitIndex + 1).trim();
        if (key) data[key] = value;
      }
    });

    return { data, body };
  }

  private static parseEntries(body: string): ChapterEntry[] {
    const entryDelimiter = '---entry---';
    const sections = body.split(entryDelimiter);

    return sections.map(section => {
      const lines = section.trim().split('\n');
      const titleLine = lines[0] || '';
      const content = lines.slice(1).join('\n').trim();

      if (titleLine.startsWith('Q:') || titleLine.startsWith('Section:') || titleLine.toUpperCase().includes('DAD,')) {
        return { title: titleLine, content };
      }

      return { title: '', content: section.trim() };
    }).filter(e => e.content.length > 0);
  }

  static async getAllChapters(): Promise<Chapter[]> {
    const chapterModules = import.meta.glob('/content/chapters/*.md', { query: '?raw', import: 'default' });
    const chapters = await Promise.all(
      Object.entries(chapterModules).map(async ([path, loader]) => {
        const id = path.split('/').pop()?.replace('.md', '') || '';
        const text = await loader() as string;
        const { data, body } = this.parseFrontmatter(text);
        const entries = this.parseEntries(body);

        return {
          id,
          title: data['title'] || '',
          subtitle: data['subtitle'] || '',
          yearRange: data['yearRange'] || '',
          image: data['image'] || '',
          description: data['description'] || '',
          date: data['date'] || '',
          entries: entries
        } as Chapter;
      })
    );
    return chapters;
  }

  static async getAllLetters(): Promise<Letter[]> {
    const letterModules = import.meta.glob('/content/letters/*.md', { query: '?raw', import: 'default' });
    const letters = await Promise.all(
      Object.entries(letterModules).map(async ([path, loader]) => {
        const id = path.split('/').pop()?.replace('.md', '') || '';
        const text = await loader() as string;
        const { data, body } = this.parseFrontmatter(text);
        return {
          id,
          title: data['title'] || '',
          chapterLabel: data['chapterLabel'] || '',
          date: data['date'] || '',
          previewText: data['previewText'] || '',
          fullContent: body.trim(),
          image: data['image'] || '',
          imageCaption: data['imageCaption'] || '',
          themeColor: data['themeColor'] || 'earth-clay'
        } as Letter;
      })
    );
    return letters;
  }

  static async getFamilyTree(): Promise<any[]> {
    const res = await fetch('/content/family/tree.json');
    return await res.json();
  }
}
}