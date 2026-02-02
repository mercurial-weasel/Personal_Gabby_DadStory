
export const APP_THEME = {
  colors: {
    primary: '#c9731d',
    accent: '#c9731d',
    background: {
      light: '#fbfaf8',
      dark: '#211911',
    },
    border: {
      light: '#f3ede8',
      dark: '#3a2e22',
    },
    text: {
      light: '#1b140e',
      dark: '#fbfaf8',
      muted: '#957350',
      mutedDark: '#b0967a',
    }
  }
};

/**
 * THEME provides a centralized mapping of semantic UI roles to Tailwind classes.
 * This avoids hardcoding hex values or raw Tailwind classes in components.
 */
export const THEME = {
  text: {
    heading: 'text-[#1b140e] dark:text-[#f3ede8]',
    body: 'text-[#1b140e]/90 dark:text-[#f3ede8]/90',
    muted: 'text-[#957350] dark:text-[#b0967a]',
    bronze: 'text-[#8c7355] dark:text-[#b4a390]',
    accent: 'text-primary',
  },
  bg: {
    canvas: 'bg-background-light dark:bg-background-dark',
    card: 'bg-white dark:bg-[#2d2319]',
    surface: 'bg-[#faf9f6] dark:bg-[#1c1917]',
    footer: 'bg-[#fdfbf9] dark:bg-[#1a140d]',
    bronze: 'bg-[#8c7355]',
    bronzeHover: 'hover:bg-[#6b5841]',
    sepia: 'bg-[#e6dbd1] dark:bg-[#3a2f24]',
  },
  border: {
    standard: 'border-border-light dark:border-border-dark',
    sepia: 'border-[#e6dbd1] dark:border-[#3d3126]',
    stone: 'border-stone-100 dark:border-stone-800',
  }
};

export interface LetterTheme {
  id: string;
  name: string;
  bgClass: string;
  hex: string;
  textClass: string;
}

export const LETTER_THEMES: Record<string, LetterTheme> = {
  'earth-clay': {
    id: 'earth-clay',
    name: 'Earth Clay',
    bgClass: 'bg-[#b4a390]',
    hex: '#b4a390',
    textClass: 'text-[#b4a390]'
  },
  'earth-sage': {
    id: 'earth-sage',
    name: 'Earth Sage',
    bgClass: 'bg-[#9a9b88]',
    hex: '#9a9b88',
    textClass: 'text-[#9a9b88]'
  },
  'earth-dust': {
    id: 'earth-dust',
    name: 'Earth Dust',
    bgClass: 'bg-[#c2b2a3]',
    hex: '#c2b2a3',
    textClass: 'text-[#c2b2a3]'
  },
  'earth-moss': {
    id: 'earth-moss',
    name: 'Earth Moss',
    bgClass: 'bg-[#8b8d7a]',
    hex: '#8b8d7a',
    textClass: 'text-[#8b8d7a]'
  }
};

export const getLetterTheme = (themeId?: string): LetterTheme => {
  return LETTER_THEMES[themeId || ''] || {
    id: 'default',
    name: 'Default',
    bgClass: 'bg-stone-200',
    hex: '#e7e5e4',
    textClass: 'text-stone-400'
  };
};
