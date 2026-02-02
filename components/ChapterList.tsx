
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, MoreHorizontal, Clock } from 'lucide-react';
import { Chapter } from '@/types';
import { THEME } from '@/themes';

interface ChapterListProps {
  chapters: Chapter[];
}

const ChapterList: React.FC<ChapterListProps> = ({ chapters }) => {
  const navigate = useNavigate();
  const [activeEra, setActiveEra] = React.useState<'all' | 'BG' | 'AG'>('all');
  const [sortBy, setSortBy] = React.useState<'chrono' | 'recent'>('chrono');

  const filteredChapters = chapters
    .filter(c => activeEra === 'all' || c.era === activeEra)
    .sort((a, b) => {
      if (sortBy === 'recent') {
        const dateA = a.lastModified ? new Date(a.lastModified).getTime() : (a.date ? new Date(a.date).getTime() : 0);
        const dateB = b.lastModified ? new Date(b.lastModified).getTime() : (b.date ? new Date(b.date).getTime() : 0);
        return dateB - dateA;
      }
      return 0; // Default order (from glob)
    });

  return (
    <div className="max-w-[1200px] mx-auto w-full px-6 py-12 md:px-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-16">
        <div className="flex min-w-72 flex-col gap-4 max-w-2xl">
          <p className={`${THEME.text.heading} text-5xl font-black leading-tight tracking-tight font-display italic`}>
            For Gabby, with love
          </p>
          <p className={`${THEME.text.muted} text-lg font-normal leading-relaxed`}>
            These chapters represent the milestones of a life shared, a legacy written just for you. Take your time wandering through the memories.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {/* Era Filter */}
          <div className="flex gap-2 bg-primary/5 p-1.5 rounded-2xl border border-primary/10 self-end">
            {[
              { id: 'all', label: 'All' },
              { id: 'BG', label: 'BG' },
              { id: 'AG', label: 'AG' }
            ].map((era) => (
              <button
                key={era.id}
                onClick={() => setActiveEra(era.id as any)}
                className={`px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300
                  ${activeEra === era.id
                    ? 'bg-primary text-white shadow-md scale-105'
                    : `hover:bg-primary/10 ${THEME.text.muted}`
                  }
                `}
              >
                {era.label}
              </button>
            ))}
          </div>

          {/* Sort Control */}
          <div className="flex gap-4 self-end">
            <button
              onClick={() => setSortBy('chrono')}
              className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${sortBy === 'chrono' ? 'text-primary underline decoration-2 underline-offset-8' : `${THEME.text.muted} hover:text-primary`}`}
            >
              Story Order
            </button>
            <button
              onClick={() => setSortBy('recent')}
              className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${sortBy === 'recent' ? 'text-primary underline decoration-2 underline-offset-8' : `${THEME.text.muted} hover:text-primary`}`}
            >
              Recent Changes
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {filteredChapters.map((chapter) => (
          <div
            key={chapter.id}
            onClick={() => navigate(`/chapter/${chapter.id}`)}
            className={`flex flex-col gap-5 p-6 ${THEME.bg.card} rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer border ${THEME.border.standard}`}
          >
            <div className="w-full bg-center bg-no-repeat aspect-[4/3] bg-cover rounded-lg overflow-hidden relative shadow-inner">
              <img
                src={chapter.image}
                alt={chapter.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors"></div>
              {chapter.era && (
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-sm backdrop-blur-md border border-white/20
                  ${chapter.era === 'BG' ? 'bg-earth-clay/80 text-white' : 'bg-primary/80 text-white'}
                `}>
                  Era: {chapter.era}
                </div>
              )}
              {chapter.date && (
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-2 py-1 bg-black/40 backdrop-blur-sm rounded text-[9px] text-white/90 font-medium tracking-tight">
                  <Clock className="w-3 h-3" />
                  Updated {new Date(chapter.date).toLocaleDateString()}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <p className={`${THEME.text.heading} text-2xl font-semibold leading-normal font-display`}>
                {chapter.title}
              </p>
              <p className={`${THEME.text.muted} text-base font-normal leading-normal italic`}>
                {chapter.subtitle}
              </p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2 text-primary font-medium group-hover:translate-x-1 transition-transform">
                  <span>Read Chapter</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
                {chapter.era === 'BG' && (
                  <span className="text-[10px] uppercase tracking-tighter opacity-40 font-bold">Before Gabby</span>
                )}
                {chapter.era === 'AG' && (
                  <span className="text-[10px] uppercase tracking-tighter opacity-40 font-bold">After Gabby</span>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Placeholder/New Card */}
        <div className="flex flex-col gap-5 p-6 bg-primary/5 dark:bg-primary/10 rounded-xl border-2 border-dashed border-primary/20 items-center justify-center min-h-[300px]">
          <MoreHorizontal className="w-8 h-8 text-primary/40" />
          <p className={`${THEME.text.muted} text-base font-normal italic text-center`}>
            Future chapters yet to be written...
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 py-8">
        <div className="h-px w-16 bg-primary/30 mb-2"></div>
        <p className={`${THEME.text.muted} text-lg font-display italic leading-normal text-center`}>
          Written with love by Dad
        </p>
      </div>
    </div>
  );
};

export default ChapterList;
