
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowUp, Sparkles } from 'lucide-react';
import { Chapter } from '@/types';
import { THEME } from '@/themes';

interface TimelineProps {
  chapters: Chapter[];
}

const Timeline: React.FC<TimelineProps> = ({ chapters }) => {
  return (
    <main className="flex-1 py-12 px-6 lg:px-40 animate-in fade-in duration-700">
      <div className="max-w-[960px] mx-auto">
        {/* Page Heading */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 font-display">Dad's Life Map</h2>
          <p className={`${THEME.text.muted} text-xl italic font-light`}>A journey through time, for Gabby.</p>
        </div>

        {/* Central Timeline Section */}
        <div className="relative flex flex-col items-center">
          {/* Central Line */}
          <div className={`absolute left-1/2 -translate-x-1/2 w-px h-full ${THEME.border.sepia} bg-[#e6dbd1] dark:bg-[#3d3126] z-0`}></div>

          {chapters.map((chapter, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={chapter.id}
                className="relative w-full flex flex-col md:flex-row items-center mb-24 last:mb-12 group"
              >
                {/* Left Side Content (Desktop) */}
                <div className={`flex-1 pr-12 hidden md:block ${isEven ? 'text-right' : 'opacity-0 pointer-events-none'}`}>
                  {isEven && (
                    <>
                      <span className="text-primary/60 text-lg italic mb-1 block">{chapter.yearRange}</span>
                      <h3 className="text-2xl font-bold mb-2 font-display">{chapter.subtitle}</h3>
                      <p className={`text-sm ${THEME.text.muted} max-w-xs ml-auto`}>{chapter.description}</p>
                    </>
                  )}
                </div>

                {/* Timeline Node */}
                <div className={`z-10 ${THEME.bg.canvas} p-2 rounded-full border border-primary/30`}>
                  <div className={`w-4 h-4 rounded-full bg-primary transition-all duration-500 group-hover:scale-125 ${isEven ? 'shadow-[0_0_10px_rgba(201,115,29,0.3)]' : 'bg-primary/70'}`}></div>
                </div>

                {/* Right Side Content (Desktop) / Main Content (Mobile) */}
                <div className={`flex-1 pl-12 mt-4 md:mt-0 ${!isEven && 'md:order-last'}`}>
                  {/* Content for Odd items on Desktop or all items on Mobile */}
                  <div className={`${isEven ? 'md:hidden' : ''} mb-2`}>
                    <span className="text-primary/60 text-base italic">{chapter.yearRange}</span>
                    <h3 className="text-xl font-bold font-display">{chapter.subtitle}</h3>
                    {!isEven && <p className={`text-sm ${THEME.text.muted} max-w-xs md:hidden`}>{chapter.description}</p>}
                  </div>

                  <div className={`flex flex-col gap-3 ${isEven ? '' : 'md:items-start'}`}>
                    <Link
                      to={`/chapter/${chapter.id}`}
                      className="text-lg underline decoration-primary/30 underline-offset-4 hover:text-primary transition-all font-display italic"
                    >
                      {chapter.title.split('?')[0]}?
                    </Link>

                    <div className={`mt-4 p-1 ${THEME.bg.card} rounded shadow-md w-40 transition-transform duration-500 group-hover:scale-105 ${index % 3 === 0 ? 'rotate-2' : index % 3 === 1 ? '-rotate-3' : 'rotate-1'}`}>
                      <img
                        className="w-full h-28 object-cover rounded-sm grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
                        src={chapter.image}
                        alt={chapter.subtitle}
                      />
                    </div>
                  </div>
                </div>

                {/* Odd item description for desktop (Left side) */}
                {!isEven && (
                  <div className="absolute left-0 w-[calc(50%-2rem)] text-right pr-12 hidden md:block">
                    <span className="text-primary/60 text-lg italic mb-1 block">{chapter.yearRange}</span>
                    <h3 className="text-2xl font-bold mb-2 font-display">{chapter.subtitle}</h3>
                    <p className={`text-sm ${THEME.text.muted} max-w-xs ml-auto`}>{chapter.description}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Message */}
        <div className="mt-32 pt-12 border-t border-primary/10 text-center max-w-xl mx-auto pb-20">
          <Heart className="w-10 h-10 text-primary/40 mx-auto mb-6" />
          <p className={`text-xl ${THEME.text.muted} italic leading-relaxed mb-8`}>
            "Every step, every year, every memory leads back to you, Gabby. This is only part of the story."
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-primary/10 hover:bg-primary/20 text-primary px-6 py-3 rounded-lg font-bold transition-all flex items-center gap-2"
            >
              <ArrowUp className="w-4 h-4" />
              Back to Top
            </button>
            <Link
              to="/random"
              className="bg-primary text-white px-8 py-3 rounded-lg font-bold shadow-md hover:scale-[1.02] transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              New Memory
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Timeline;
