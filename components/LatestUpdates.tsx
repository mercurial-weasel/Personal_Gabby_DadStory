import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, MessageSquare, ArrowRight, Clock } from 'lucide-react';
import { chatWithDad } from '@/services/geminiService';
import { Chapter } from '@/types';
import { THEME } from '@/themes';

interface LatestUpdatesProps {
  chapters: Chapter[];
}

const LatestUpdates: React.FC<LatestUpdatesProps> = ({ chapters }) => {
  const navigate = useNavigate();
  const [chatMessage, setChatMessage] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  // Sort all chapters by lastModified descending
  const sortedChapters = [...chapters].sort((a, b) => {
    const dateA = a.lastModified ? new Date(a.lastModified).getTime() : (a.date ? new Date(a.date).getTime() : 0);
    const dateB = b.lastModified ? new Date(b.lastModified).getTime() : (b.date ? new Date(b.date).getTime() : 0);
    return dateB - dateA;
  });

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    setChatLoading(true);
    try {
      const response = await chatWithDad([], chatMessage);
      setChatResponse(response);
    } catch (err) {
      console.error(err);
    } finally {
      setChatLoading(false);
      setChatMessage('');
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center mb-16">
        <h1 className={`text-4xl md:text-5xl font-bold font-display italic ${THEME.text.heading} mb-4`}>
          Latest Memories
        </h1>
        <p className={`${THEME.text.muted} text-lg max-w-2xl mx-auto`}>
          The archive is a living story. Here are the most recent additions and updates to our shared journey.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Updates Feed */}
        <div className="lg:col-span-2 space-y-8">
          {sortedChapters.length === 0 ? (
            <div className="text-center py-20 bg-primary/5 rounded-3xl border border-dashed border-primary/20">
              <Sparkles className="w-12 h-12 text-primary/20 mx-auto mb-4" />
              <p className={`${THEME.text.muted} text-lg`}>The archive is quiet... for now.</p>
            </div>
          ) : (
            sortedChapters.map((chapter) => (
              <div
                key={chapter.id}
                onClick={() => navigate(`/chapter/${chapter.id}`)}
                className={`${THEME.bg.card} rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-primary/10 group cursor-pointer flex flex-col md:flex-row gap-8 items-center md:items-start`}
              >
                <div className="w-full md:w-48 aspect-[4/3] rounded-2xl overflow-hidden shadow-inner flex-shrink-0">
                  <img
                    src={chapter.image}
                    alt={chapter.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest bg-primary/10 text-primary`}>
                      {chapter.era === 'BG' ? 'Before Gabby' : 'After Gabby'}
                    </div>
                    {(chapter.lastModified || chapter.date) && (
                      <div className="flex items-center gap-1.5 text-[10px] opacity-40 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        Last modified on {new Date(chapter.lastModified || chapter.date || '').toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                      </div>
                    )}
                  </div>

                  <h2 className="text-2xl font-bold font-display italic text-primary group-hover:translate-x-1 transition-transform">
                    {chapter.title}
                  </h2>
                  <p className={`${THEME.text.muted} text-sm leading-relaxed line-clamp-2`}>
                    {chapter.description}
                  </p>

                  <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest pt-2">
                    <span>Read Chapter</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Sidebar Chat */}
        <div className="lg:col-span-1">
          <div className="sticky top-32 p-8 bg-primary/5 rounded-[2.5rem] border border-primary/20 shadow-inner">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 font-display italic text-primary">
              <MessageSquare className="w-6 h-6" />
              Ask me anything...
            </h3>
            <p className={`text-sm ${THEME.text.muted} mb-6 leading-relaxed`}>
              The archive is deep, and some stories are best shared in conversation. What would you like to know?
            </p>

            <form onSubmit={handleChat} className="space-y-4">
              <textarea
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Tell me more about..."
                className={`w-full p-4 rounded-2xl border border-primary/30 bg-background-light dark:bg-background-dark focus:ring-2 focus:ring-primary outline-none transition-all resize-none text-sm h-32 shadow-sm`}
              />
              <button
                disabled={chatLoading || !chatMessage.trim()}
                className="w-full py-3 bg-primary text-white rounded-xl text-sm font-bold uppercase tracking-[0.2em] shadow-lg hover:shadow-xl hover:translate-y-[-2px] active:translate-y-0 transition-all disabled:opacity-50"
              >
                {chatLoading ? 'Thinking...' : 'Send Message'}
              </button>
            </form>

            {chatResponse && (
              <div className={`mt-6 p-6 ${THEME.bg.card} rounded-2xl border border-primary/20 animate-in fade-in slide-in-from-top-4 shadow-md`}>
                <p className={`text-sm font-display italic leading-relaxed ${THEME.text.heading} opacity-90`}>
                  {chatResponse}
                </p>
              </div>
            )}

            <div className="mt-8 pt-8 border-t border-primary/10 flex justify-center">
              <Sparkles className="w-8 h-8 text-primary/20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestUpdates;
