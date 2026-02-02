
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Letter } from '@/types';
import { getLetterTheme, THEME } from '@/themes';

interface LetterViewProps {
  letters: Letter[];
}

const LetterView: React.FC<LetterViewProps> = ({ letters }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const letterIndex = letters.findIndex(l => l.id === id);
  const letter = letters[letterIndex];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!letter) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <p className="text-2xl mb-4">Letter not found.</p>
        <Link to="/letters" className="text-primary underline">Back to Letters</Link>
      </div>
    );
  }

  const theme = getLetterTheme(letter.themeColor);

  return (
    <div className={`min-h-screen flex flex-col ${THEME.bg.surface} transition-colors duration-500 animate-in fade-in`}>
      <header className="w-full max-w-5xl mx-auto px-6 py-8">
        <nav className={`flex items-center gap-2 text-sm font-sans ${THEME.text.muted}`}>
          <Link className="hover:text-primary transition-colors" to="/">Home</Link>
          <span className="opacity-30">/</span>
          <Link className="hover:text-primary transition-colors" to="/letters">Letters</Link>
          <span className="opacity-30">/</span>
          <span className={`${THEME.text.heading} font-medium truncate`}>{letter.title}</span>
        </nav>
      </header>

      <main className="flex-grow w-full max-w-5xl mx-auto px-6 pb-24">
        <div className="mb-16">
          <h1 className={`text-5xl md:text-6xl font-display ${THEME.text.heading} tracking-tight leading-tight italic`}>
            {letter.title}
          </h1>
          {/* Fixed: Added missing className attribute name to prevent JSX parsing errors */}
          <p className={`mt-4 ${THEME.text.muted} font-sans italic`}>{letter.date}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <article className="max-w-[650px] w-full">
            <div className={`space-y-8 text-xl md:text-[22px] leading-[2] ${THEME.text.heading} font-display`}>
              <p className={`font-medium italic text-2xl ${theme.textClass}`}>Dear Gabby,</p>

              {letter.fullContent.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}

              <div className="pt-12">
                <p className="italic">With all my love,</p>
                <p className={`font-sans font-medium ${THEME.text.heading} mt-2`}>Dad</p>
              </div>
            </div>
          </article>

          <aside className="w-full lg:w-64 shrink-0 lg:sticky lg:top-24">
            <div className={`p-2 ${THEME.bg.card} shadow-xl border ${THEME.border.standard} rotate-2 transition-transform hover:rotate-0 duration-500`}>
              <img
                src={letter.image}
                alt={letter.imageCaption}
                className="w-full h-auto grayscale-[20%] hover:grayscale-0 transition-all duration-700 object-cover aspect-[4/5]"
              />
              <div className="mt-3 text-center">
                <p className={`font-sans text-[11px] uppercase tracking-widest ${THEME.text.muted}`}>{letter.imageCaption}</p>
              </div>
            </div>
          </aside>
        </div>

        <footer className={`mt-24 pt-12 border-t ${THEME.border.standard}`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 font-sans">
            {letterIndex > 0 ? (
              <Link
                to={`/letter/${letters[letterIndex - 1].id}`}
                className={`group flex items-center gap-3 ${THEME.text.muted} hover:text-primary transition-colors`}
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Previous Letter</span>
              </Link>
            ) : <div />}

            <Link
              className={`${THEME.text.muted} hover:text-stone-900 dark:hover:text-stone-100 transition-colors uppercase text-[11px] tracking-[0.2em] font-medium`}
              to="/letters"
            >
              Back to Letters
            </Link>

            {letterIndex < letters.length - 1 ? (
              <Link
                to={`/letter/${letters[letterIndex + 1].id}`}
                className={`group flex items-center gap-3 ${THEME.text.muted} hover:text-primary transition-colors`}
              >
                <span>Next Letter</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : <div />}
          </div>
        </footer>
      </main>
    </div>
  );
};

export default LetterView;
