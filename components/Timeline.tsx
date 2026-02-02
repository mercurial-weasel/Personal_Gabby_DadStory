
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowUp, Sparkles } from 'lucide-react';
import { Chapter } from '@/types';
import { THEME } from '@/themes';

interface TimelineProps {
  chapters: Chapter[];
}

const Timeline: React.FC<TimelineProps> = ({ chapters }) => {
  const [activeEra, setActiveEra] = React.useState<'all' | 'BG' | 'AG'>('all');

  // Inject Gabby's birth into the timeline data
  const birthEvent = {
    id: 'gabby-born',
    title: 'The day the world changed',
    subtitle: 'Gabby is Born',
    yearRange: 'June 12, 2008',
    description: "A winter morning in Melbourne when everything I thought I knew about love changed forever.",
    image: 'https://images.unsplash.com/photo-1544126592-807daf21565c?q=80&w=1000&auto=format&fit=crop',
    isBirth: true
  };

  // Filter and Sort
  const filteredChapters = chapters.filter(c => activeEra === 'all' || c.era === activeEra);

  const bgChapters = filteredChapters.filter(c => c.era === 'BG').sort((a, b) => (a.yearRange || '').localeCompare(b.yearRange || ''));
  const agChapters = filteredChapters.filter(c => c.era === 'AG').sort((a, b) => (a.yearRange || '').localeCompare(b.yearRange || ''));

  let timelineData: any[] = [];
  if (activeEra === 'all') {
    timelineData = [...bgChapters, birthEvent, ...agChapters];
  } else if (activeEra === 'BG') {
    timelineData = bgChapters;
  } else {
    timelineData = [birthEvent, ...agChapters];
  }

  return (
    <main className="flex-1 py-12 px-6 lg:px-40 animate-in fade-in duration-700">
      <div className="max-w-[960px] mx-auto">
        {/* Page Heading */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 font-display italic">Our Shared Life Map</h2>
          <p className={`${THEME.text.muted} text-xl italic font-light mb-12`}>The world before you, and the world we've shared since.</p>

          {/* Era Filter */}
          <div className="flex justify-center gap-3">
            {[
              { id: 'all', label: 'Complete Story' },
              { id: 'BG', label: 'Before Gabby' },
              { id: 'AG', label: 'After Gabby' }
            ].map((era) => (
              <button
                key={era.id}
                onClick={() => setActiveEra(era.id as any)}
                className={`px-6 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-300 border
                  ${activeEra === era.id
                    ? 'bg-primary text-white border-primary shadow-lg scale-105'
                    : `${THEME.bg.card} ${THEME.text.muted} border-primary/10 hover:border-primary/30`
                  }
                `}
              >
                {era.label}
              </button>
            ))}
          </div>
        </div>

        {/* Central Timeline Section */}
        <div className="relative flex flex-col items-center">
          {/* Central Line */}
          <div className={`absolute left-1/2 -translate-x-1/2 w-px h-full ${THEME.border.sepia} bg-[#e6dbd1] dark:bg-[#3d3126] z-0`}></div>

          {timelineData.map((item, index) => {
            const isEven = index % 2 === 0;
            const isBirth = 'isBirth' in item && item.isBirth;

            return (
              <div
                key={item.id}
                className={`relative w-full flex flex-col md:flex-row items-center mb-24 last:mb-12 group ${isBirth ? 'scale-110 z-20 my-16' : ''}`}
              >
                {/* Left Side Content (Desktop) */}
                <div className={`flex-1 pr-12 hidden md:block ${isEven ? 'text-right' : 'opacity-0 pointer-events-none'}`}>
                  {isEven && (
                    <>
                      <span className={`${isBirth ? 'text-primary' : 'text-primary/60'} text-lg italic mb-1 block font-bold`}>{item.yearRange}</span>
                      <h3 className={`${isBirth ? 'text-3xl' : 'text-2xl'} font-bold mb-2 font-display`}>{item.subtitle}</h3>
                      <p className={`text-sm ${THEME.text.muted} max-w-xs ml-auto`}>{item.description}</p>
                    </>
                  )}
                </div>

                {/* Timeline Node */}
                <div className={`z-10 ${isBirth ? 'bg-primary p-3' : `${THEME.bg.canvas} p-2`} rounded-full border ${isBirth ? 'border-primary shadow-[0_0_20px_rgba(201,115,29,0.5)]' : 'border-primary/30'} transition-transform duration-500 group-hover:scale-110`}>
                  {isBirth ? (
                    <Sparkles className="w-6 h-6 text-white animate-pulse" />
                  ) : (
                    <div className={`w-4 h-4 rounded-full bg-primary transition-all duration-500 group-hover:scale-125 ${isEven ? 'shadow-[0_0_10px_rgba(201,115,29,0.3)]' : 'bg-primary/70'}`}></div>
                  )}
                </div>

                {/* Right Side Content (Desktop) / Main Content (Mobile) */}
                <div className={`flex-1 pl-12 mt-4 md:mt-0 ${!isEven && 'md:order-last'}`}>
                  {/* Content for Odd items on Desktop or all items on Mobile */}
                  <div className={`${isEven ? 'md:hidden' : ''} mb-2`}>
                    <span className={`${isBirth ? 'text-primary font-bold' : 'text-primary/60'} text-base italic`}>{item.yearRange}</span>
                    <h3 className={`${isBirth ? 'text-2xl font-black' : 'text-xl font-bold'} font-display`}>{item.subtitle}</h3>
                    {!isEven && <p className={`text-sm ${THEME.text.muted} max-w-xs md:hidden`}>{item.description}</p>}
                  </div>

                  <div className={`flex flex-col gap-3 ${isEven ? '' : 'md:items-start'}`}>
                    {isBirth ? (
                      <div className="text-xl italic font-display font-medium text-primary">
                        Welcome to the world, Gabby!
                      </div>
                    ) : (
                      <Link
                        to={`/chapter/${item.id}`}
                        className="text-lg underline decoration-primary/30 underline-offset-4 hover:text-primary transition-all font-display italic"
                      >
                        {item.title.split('?')[0]}?
                      </Link>
                    )}

                    <div className={`mt-4 p-1 ${isBirth ? 'bg-primary p-2' : THEME.bg.card} rounded shadow-md w-40 transition-transform duration-500 group-hover:scale-105 ${index % 3 === 0 ? 'rotate-2' : index % 3 === 1 ? '-rotate-3' : 'rotate-1'}`}>
                      <img
                        className={`w-full ${isBirth ? 'h-32' : 'h-28'} object-cover rounded-sm grayscale-[30%] group-hover:grayscale-0 transition-all duration-700`}
                        src={item.image}
                        alt={item.subtitle}
                      />
                    </div>
                  </div>
                </div>

                {/* Odd item description for desktop (Left side) */}
                {!isEven && (
                  <div className="absolute left-0 w-[calc(50%-2rem)] text-right pr-12 hidden md:block">
                    <span className={`${isBirth ? 'text-primary font-bold' : 'text-primary/60'} text-lg italic mb-1 block`}>{item.yearRange}</span>
                    <h3 className={`${isBirth ? 'text-3xl' : 'text-2xl'} font-bold mb-2 font-display`}>{item.subtitle}</h3>
                    <p className={`text-sm ${THEME.text.muted} max-w-xs ml-auto`}>{item.description}</p>
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
