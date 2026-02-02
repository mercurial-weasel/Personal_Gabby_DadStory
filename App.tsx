
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Mail, History, BookOpen, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChapterList from '@/components/ChapterList';
import StoryView from '@/components/StoryView';
import RandomMemory from '@/components/RandomMemory';
import Timeline from '@/components/Timeline';
import LetterList from '@/components/LetterList';
import LetterView from '@/components/LetterView';
import FamilyTreePage from '@/components/FamilyTree';
import WelcomeView from '@/components/WelcomeView';
import { ContentService } from '@/services/contentService';
import { Chapter, Letter } from '@/types';
import { THEME } from '@/themes';
import { Users } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Welcome Message',
      description: "A personal message from me to you :)",
      icon: <Sparkles className="w-8 h-8" />,
      path: '/welcome',
      color: 'bg-[#8c7355]',
      hoverColor: 'hover:bg-[#6b5841]'
    },
    {
      title: 'Letters to Gabby',
      description: 'Personal messages, wisdom, and thoughts shared just for you.',
      icon: <Mail className="w-8 h-8" />,
      path: '/letters',
      color: 'bg-[#c9731d]',
      hoverColor: 'hover:bg-[#b06318]'
    },
    {
      title: 'Explore Life Map',
      description: 'A visual journey through the milestones and memories of my life.',
      icon: <History className="w-8 h-8" />,
      path: '/timeline',
      color: 'bg-primary',
      hoverColor: 'hover:bg-[#b06318]'
    },
    {
      title: 'Story Chapters',
      description: 'The narrative of my life, chapter by chapter, moment by moment.',
      icon: <BookOpen className="w-8 h-8" />,
      path: '/chapters',
      color: THEME.bg.sepia,
      textColor: THEME.text.heading,
      hoverShadow: 'hover:shadow-md'
    },
    {
      title: 'Random Memory',
      description: 'Let chance guide you to a story or insight from the archive.',
      icon: <Sparkles className="w-8 h-8" />,
      path: '/random',
      variant: 'outline',
      color: 'bg-transparent',
      textColor: 'text-primary',
      hoverBg: 'hover:bg-primary/5'
    },
    {
      title: 'Family Tree',
      description: 'Explore the roots and connections that built our home.',
      icon: <Users className="w-8 h-8" />,
      path: '/family',
      variant: 'outline',
      color: 'bg-transparent',
      textColor: 'text-earth-clay',
      hoverBg: 'hover:bg-earth-clay/5'
    }
  ];

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-16 animate-in fade-in duration-1000">
      <div className="max-w-[1000px] w-full flex flex-col items-center text-center space-y-16">
        <div className="space-y-6">
          <h1 className={`${THEME.text.heading} text-4xl md:text-5xl lg:text-7xl font-medium leading-[1.1] tracking-tight px-4 font-display italic max-w-4xl`}>
            Hi Gabby. This is our shared story—the world before you, and the beautiful one since.
          </h1>
          <div className="flex justify-center">
            <div className="h-1 w-16 bg-primary/20 rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {features.map((feature, idx) => (
            <button
              key={idx}
              onClick={() => navigate(feature.path)}
              className={`group relative flex flex-col items-start p-8 rounded-[2rem] text-left transition-all duration-500 overflow-hidden
                ${feature.variant === 'outline'
                  ? `${feature.color} border-2 border-primary/20 ${feature.textColor} ${feature.hoverBg}`
                  : `${feature.color} ${feature.hoverColor || ''} text-white shadow-sm hover:shadow-xl hover:-translate-y-1`
                }
                ${feature.textColor && (idx === 3 || idx === 4) ? `${feature.textColor} hover:bg-primary/5` : ''}
                ${feature.title === 'Family Tree' ? 'md:col-span-2 lg:col-span-1' : ''}
              `}
            >
              <div className={`mb-6 p-3 rounded-2xl ${feature.variant === 'outline' ? 'bg-primary/10' : 'bg-white/20'} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                {feature.icon}
              </div>
              <h3 className={`text-2xl font-bold mb-2 font-display ${feature.textColor || 'text-white'}`}>
                {feature.title}
              </h3>
              <p className={`text-sm opacity-80 leading-relaxed max-w-[240px] ${feature.textColor || 'text-white'}`}>
                {feature.description}
              </p>
              <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-4 group-hover:translate-x-0">
                <ArrowRight className="w-6 h-6" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
};

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [letters, setLetters] = useState<Letter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const [c, l] = await Promise.all([
          ContentService.getAllChapters(),
          ContentService.getAllLetters()
        ]);
        setChapters(c);
        setLetters(l);
      } catch (err) {
        console.error("Failed to load content", err);
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, []);

  if (loading) {
    return (
      <div className={`flex h-screen items-center justify-center ${THEME.bg.canvas}`}>
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="font-display italic text-lg opacity-60">Opening the archive...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className={`relative flex min-h-screen flex-col overflow-x-hidden font-display ${THEME.bg.canvas} transition-colors duration-500`}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chapters" element={<ChapterList chapters={chapters} />} />
            <Route path="/timeline" element={<Timeline chapters={chapters} />} />
            <Route path="/letters" element={<LetterList letters={letters} />} />
            <Route path="/letter/:id" element={<LetterView letters={letters} />} />
            <Route path="/chapter/:id" element={<StoryView chapters={chapters} />} />
            <Route path="/random" element={<RandomMemory />} />
            <Route path="/family" element={<FamilyTreePage />} />
            <Route path="/welcome" element={<WelcomeView />} />
          </Routes>
        </div>

        <Footer />

        <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none"></div>
      </div>
    </Router>
  );
};

export default App;
