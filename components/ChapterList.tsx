
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, MoreHorizontal } from 'lucide-react';
import { Chapter } from '@/types';
import { THEME } from '@/themes';

interface ChapterListProps {
  chapters: Chapter[];
}

const ChapterList: React.FC<ChapterListProps> = ({ chapters }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-[1200px] mx-auto w-full px-6 py-12 md:px-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-wrap justify-between gap-6 mb-16">
        <div className="flex min-w-72 flex-col gap-4 max-w-2xl">
          <p className={`${THEME.text.heading} text-5xl font-black leading-tight tracking-tight font-display italic`}>
            For Gabby, with love
          </p>
          <p className={`${THEME.text.muted} text-lg font-normal leading-relaxed`}>
            These chapters represent the milestones of a life shared, a legacy written just for you. Take your time wandering through the memories.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {chapters.map((chapter) => (
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
            </div>
            <div className="flex flex-col gap-2">
              <p className={`${THEME.text.heading} text-2xl font-semibold leading-normal font-display`}>
                {chapter.title}
              </p>
              <p className={`${THEME.text.muted} text-base font-normal leading-normal italic`}>
                {chapter.subtitle}
              </p>
              <div className="flex items-center gap-2 mt-2 text-primary font-medium group-hover:translate-x-1 transition-transform">
                <span>Read Chapter</span>
                <ArrowRight className="w-4 h-4" />
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
