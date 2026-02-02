
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Heart, Clock } from 'lucide-react';
import { Letter } from '@/types';
import { getLetterTheme, THEME } from '@/themes';

interface LetterListProps {
  letters: Letter[];
}

const LetterList: React.FC<LetterListProps> = ({ letters }) => {
  const [sortBy, setSortBy] = React.useState<'chrono' | 'recent'>('chrono');

  const sortedLetters = [...letters].sort((a, b) => {
    if (sortBy === 'recent') {
      const dateA = a.lastModified ? new Date(a.lastModified).getTime() : (a.date ? new Date(a.date).getTime() : 0);
      const dateB = b.lastModified ? new Date(b.lastModified).getTime() : (b.date ? new Date(b.date).getTime() : 0);
      return dateB - dateA;
    }
    return 0; // Default order
  });

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 animate-in fade-in duration-700">
      <div className="mb-20 text-center relative">
        <h1 className={`text-4xl md:text-5xl font-light italic tracking-tight ${THEME.text.bronze} mb-4 font-display`}>
          Letters to Gabby
        </h1>
        <p className="text-sm uppercase tracking-[0.3em] opacity-40 font-medium">A collection of reflections & wisdom</p>

        {/* Sort Control */}
        <div className="flex justify-center gap-6 mt-8">
          <button
            onClick={() => setSortBy('chrono')}
            className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${sortBy === 'chrono' ? 'text-primary underline decoration-2 underline-offset-8' : `${THEME.text.muted} hover:text-primary`}`}
          >
            Chronological
          </button>
          <button
            onClick={() => setSortBy('recent')}
            className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${sortBy === 'recent' ? 'text-primary underline decoration-2 underline-offset-8' : `${THEME.text.muted} hover:text-primary`}`}
          >
            Recent Changes
          </button>
        </div>

        <div className="w-16 h-[1px] bg-[#8c7355]/20 mx-auto mt-8"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-24">
        {sortedLetters.map((letter) => {
          const theme = getLetterTheme(letter.themeColor);
          return (
            <Link
              key={letter.id}
              to={`/letter/${letter.id}`}
              className={`group ${THEME.bg.card} border ${THEME.border.stone} rounded-xl overflow-hidden flex flex-col h-full transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl shadow-sm`}
            >
              <div className={`aspect-[4/3] ${theme.bgClass}/20 overflow-hidden relative`}>
                <div className={`absolute inset-0 ${theme.bgClass} opacity-40 mix-blend-multiply group-hover:opacity-30 transition-opacity`}></div>
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="w-full h-full border border-white/40 rounded-sm"></div>
                </div>
                <div
                  className="absolute inset-0 bg-cover bg-center mix-blend-overlay grayscale opacity-60 transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${letter.image}')` }}
                ></div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <span className="text-[10px] uppercase tracking-[0.2em] opacity-40 font-bold mb-3">{letter.chapterLabel}</span>
                <h3 className="text-2xl font-light mb-4 group-hover:text-accent transition-colors font-display italic">
                  {letter.title}
                </h3>
                <p className={`${THEME.text.muted} text-sm leading-relaxed line-clamp-2 mb-6`}>
                  {letter.previewText}
                </p>
                <div className={`mt-auto pt-6 border-t ${THEME.border.standard} flex justify-between items-center`}>
                  <div className="flex items-center gap-1.5 opacity-40">
                    <Clock className="w-3 h-3" />
                    <span className="text-[10px] uppercase tracking-widest">{letter.date}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-primary/40 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <footer className={`mt-auto border-t ${THEME.border.standard} py-12 flex flex-col md:flex-row items-center justify-between gap-8`}>
        <Link to="/" className="flex items-center gap-2 text-[#8c7355]/70 hover:text-accent transition-colors duration-300 group">
          <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Return to Overview</span>
        </Link>
        <p className="text-[10px] uppercase tracking-[0.2em] opacity-30 font-medium italic">For my daughter, with all my love.</p>
        <div className="flex gap-6">
          <Heart className="w-4 h-4 text-primary/20" />
        </div>
      </footer>
    </main>
  );
};

export default LetterList;
