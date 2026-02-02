
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sparkles, LayoutGrid } from 'lucide-react';
import { Chapter } from '@/types';
import { THEME } from '@/themes';

interface StoryViewProps {
  chapters: Chapter[];
}

const StoryView: React.FC<StoryViewProps> = ({ chapters }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const chapterIndex = chapters.findIndex(c => c.id === id);
  const chapter = chapters[chapterIndex];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!chapter) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <p className="text-2xl mb-4">Chapter not found.</p>
        <Link to="/chapters" className="text-primary underline">Back to Chapters</Link>
      </div>
    );
  }

  const progress = Math.round(((chapterIndex + 1) / chapters.length) * 100);

  return (
    <main className="flex flex-col items-center px-6 py-12 md:py-20 animate-in fade-in duration-700">
      {/* Progress Indicator */}
      <div className="w-full max-w-[650px] mb-12">
        <div className="flex flex-col gap-3">
          <div className="flex gap-6 justify-between items-end">
            <p className={`${THEME.text.heading} text-base font-medium leading-normal font-display`}>
              Chapter {chapterIndex + 1} of {chapters.length}
            </p>
            <p className="text-primary text-sm font-bold leading-normal">{progress}%</p>
          </div>
          <div className={`rounded-full ${THEME.bg.sepia} overflow-hidden`}>
            <div
              className="h-1.5 rounded-full bg-primary transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className={`${THEME.text.muted} text-xs uppercase tracking-widest font-semibold`}>Archive Progress</p>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="w-full max-w-[650px] mb-8">
        <div className="flex flex-wrap gap-2 items-center">
          <Link to="/chapters" className={`${THEME.text.muted} text-sm font-medium leading-normal hover:text-primary transition-colors`}>
            Chapters
          </Link>
          <span className={`${THEME.text.muted} text-sm`}>/</span>
          <span className={`${THEME.text.heading} text-sm font-medium leading-normal`}>
            {chapter.subtitle}
          </span>
        </div>
      </div>

      {/* Headline Header */}
      <div className="w-full max-w-[650px] mb-12">
        <h1 className={`${THEME.text.heading} tracking-tight text-[32px] md:text-[44px] font-bold leading-tight text-left italic font-display border-l-4 border-primary/30 pl-6 py-2`}>
          {chapter.title}
        </h1>
        <p className={`mt-4 ${THEME.text.muted} font-sans text-sm uppercase tracking-widest`}>
          {chapter.yearRange} — {chapter.entries.length} memories within
        </p>
      </div>

      {/* Hero Image Inset */}
      <div className="w-full max-w-[650px] mb-12 py-6 flex flex-col items-center">
        <div className={`group relative p-2 ${THEME.bg.card} shadow-xl rounded-sm rotate-1 hover:rotate-0 transition-transform duration-500`}>
          <div className="w-full max-w-sm aspect-[4/5] overflow-hidden">
            <img
              src={chapter.image}
              alt={chapter.title}
              className="grayscale contrast-125 object-cover w-full h-full transition-all duration-700 group-hover:grayscale-0 group-hover:contrast-100"
            />
          </div>
          <p className={`mt-4 text-sm text-center font-sans ${THEME.text.muted} italic`}>
            {chapter.subtitle}
          </p>
        </div>
      </div>

      {/* Main Narrative Entries */}
      <article className={`w-full max-w-[650px] space-y-20 text-lg md:text-xl leading-relaxed ${THEME.text.body} font-display`}>
        {chapter.entries.map((entry, idx) => (
          <section key={idx} className="animate-in fade-in duration-1000" style={{ animationDelay: `${idx * 150}ms` }}>
            {entry.title && (
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary italic border-b border-primary/10 pb-2">
                {entry.title}
              </h2>
            )}
            <div className="space-y-6 whitespace-pre-wrap">
              {entry.content.split('\n\n').map((para, pIdx) => (
                <p key={pIdx}>{para}</p>
              ))}
            </div>
          </section>
        ))}
      </article>

      {/* Footer Navigation */}
      <footer className={`w-full max-w-[650px] mt-24 pt-12 border-t ${THEME.border.standard}`}>
        <div className="flex justify-between items-center mb-10">
          {chapterIndex > 0 ? (
            <Link
              to={`/chapter/${chapters[chapterIndex - 1].id}`}
              className={`flex items-center gap-2 ${THEME.text.muted} hover:text-primary transition-colors font-medium`}
            >
              <ArrowLeft className="w-4 h-4" />
              Previous Milestone
            </Link>
          ) : (
            <div />
          )}

          {chapterIndex < chapters.length - 1 ? (
            <Link
              to={`/chapter/${chapters[chapterIndex + 1].id}`}
              className={`flex items-center gap-2 ${THEME.text.heading} hover:text-primary transition-colors font-bold`}
            >
              Next Milestone
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link
              to="/random"
              className={`flex items-center gap-2 ${THEME.text.heading} hover:text-primary transition-colors font-bold`}
            >
              A Memory for Today
              <Sparkles className="w-4 h-4" />
            </Link>
          )}
        </div>

        <div className="flex flex-col items-center gap-6">
          <Link
            to="/chapters"
            className={`text-sm font-semibold uppercase tracking-widest ${THEME.text.muted} hover:underline flex items-center gap-2`}
          >
            <LayoutGrid className="w-4 h-4" />
            Back to Chapter List
          </Link>
          <div className="text-center">
            <p className={`text-xs ${THEME.text.muted}/60 italic font-sans`}>
              Archive entry from {chapter.date || 'October 2023'} <br />
              Private collection for Gabby
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default StoryView;
