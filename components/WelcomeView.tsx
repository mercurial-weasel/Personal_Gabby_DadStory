import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Heart } from 'lucide-react';
import { THEME } from '@/themes';

const WelcomeView: React.FC = () => {
    return (
        <div className={`min-h-screen flex flex-col ${THEME.bg.surface} transition-colors duration-500 animate-in fade-in`}>
            <header className="w-full max-w-5xl mx-auto px-6 py-8">
                <nav className={`flex items-center gap-2 text-sm font-sans ${THEME.text.muted}`}>
                    <Link className="hover:text-primary transition-colors" to="/">Home</Link>
                    <span className="opacity-30">/</span>
                    <span className={`${THEME.text.heading} font-medium`}>Welcome Message</span>
                </nav>
            </header>

            <main className="flex-grow w-full max-w-3xl mx-auto px-6 pb-24 flex flex-col items-center justify-center text-center">
                <div className="mb-12">
                    <div className="inline-flex p-4 rounded-3xl bg-primary/10 text-primary mb-8 animate-bounce">
                        <Sparkles className="w-8 h-8" />
                    </div>
                    <h1 className={`text-5xl md:text-6xl font-display ${THEME.text.heading} tracking-tight leading-tight italic mb-8`}>
                        A Message for You
                    </h1>

                    <div className={`space-y-8 text-xl md:text-2xl leading-[1.8] ${THEME.text.heading} font-display italic text-left bg-white/40 dark:bg-black/20 p-8 md:p-12 rounded-[2.5rem] border border-primary/5 shadow-inner`}>
                        <p>Dear Gabby,</p>

                        <p>
                            I want you to know how incredibly proud I am of you. Watching you grow into the person you are today has been the greatest privilege of my life.
                        </p>

                        <p>
                            This digital archive is more than just stories; it's a way for me to stay a part of your life, no matter where your journey takes you. I want to share the pieces of my past, the lessons I've learned, and the memories of your childhood that I hold so dear.
                        </p>

                        <p>
                            I'll be adding new entries every so often—stories from my own life and reflections on our time together. Think of this as a living conversation between us.
                        </p>

                        <p>
                            Take your time exploring. There is no rush. I am so glad you're here.
                        </p>

                        <div className="pt-8">
                            <p>With all my love,</p>
                            <p className="font-sans font-bold not-italic text-primary mt-2">Dad</p>
                        </div>
                    </div>
                </div>

                <Link
                    to="/"
                    className={`group flex items-center gap-2 ${THEME.text.muted} hover:text-primary transition-colors uppercase text-[11px] tracking-[0.3em] font-bold`}
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    <span>Return to Archive</span>
                </Link>
            </main>

            <footer className="py-12 flex justify-center opacity-20">
                <Heart className="w-6 h-6 text-primary" />
            </footer>
        </div>
    );
};

export default WelcomeView;
