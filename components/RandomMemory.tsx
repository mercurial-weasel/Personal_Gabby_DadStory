
import React, { useState } from 'react';
import { RefreshCw, Sparkles, BookOpen, MessageSquare } from 'lucide-react';
import { generateRandomMemory, chatWithDad } from '@/services/geminiService';
import { Memory } from '@/types';
import { THEME } from '@/themes';

const RandomMemory: React.FC = () => {
  const [memory, setMemory] = useState<Memory | null>(null);
  const [loading, setLoading] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const newMemory = await generateRandomMemory();
      setMemory(newMemory);
      setChatResponse(''); // Clear previous chat if a new memory starts
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
      <div className="text-center mb-12">
        <h1 className={`text-4xl md:text-5xl font-bold font-display italic ${THEME.text.heading} mb-4`}>
          A Memory for Gabby
        </h1>
        <p className={`${THEME.text.muted} text-lg max-w-2xl mx-auto`}>
          Sometimes, a memory is just waiting for a reason to be told. Click below to uncover a new moment from our life.
        </p>
      </div>

      <div className="flex justify-center mb-16">
        <button
          onClick={handleGenerate}
          disabled={loading}
          className={`flex items-center gap-3 px-10 py-5 bg-primary text-white rounded-full text-xl font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {loading ? (
            <RefreshCw className="w-6 h-6 animate-spin" />
          ) : (
            <Sparkles className="w-6 h-6" />
          )}
          {loading ? 'Reaching into the past...' : 'Tell me a story, Dad'}
        </button>
      </div>

      {memory && (
        <div className={`${THEME.bg.card} rounded-3xl p-8 md:p-12 shadow-2xl border border-primary/10 mb-12 animate-in zoom-in-95 duration-500`}>
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-3 text-primary">
                <BookOpen className="w-5 h-5" />
                <span className="font-semibold tracking-widest uppercase text-sm">Theme: {memory.theme}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-display italic text-primary">{memory.title}</h2>
              <div className="prose prose-lg dark:prose-invert italic">
                {memory.story.split('\n\n').map((p, i) => (
                  <p key={i} className={`mb-4 text-xl leading-relaxed ${THEME.text.heading} opacity-90`}>{p}</p>
                ))}
              </div>
            </div>

            <div className="w-full md:w-80 space-y-6">
              <div className="p-6 bg-primary/5 rounded-2xl border border-primary/20">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  Ask me more...
                </h3>
                <p className={`text-sm ${THEME.text.muted} mb-4`}>Want to know more about this memory or anything else? Just ask.</p>

                <form onSubmit={handleChat} className="space-y-3">
                  <textarea
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Tell me more about the summer of..."
                    className={`w-full p-3 rounded-xl border border-primary/30 bg-background-light dark:bg-background-dark focus:ring-2 focus:ring-primary outline-none transition-all resize-none text-sm h-24`}
                  />
                  <button
                    disabled={chatLoading || !chatMessage.trim()}
                    className="w-full py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all disabled:opacity-50"
                  >
                    {chatLoading ? 'Thinking...' : 'Send Message'}
                  </button>
                </form>

                {chatResponse && (
                  <div className={`mt-6 p-4 ${THEME.bg.card} dark:bg-[#3a2e22] rounded-xl border border-primary/20 animate-in fade-in slide-in-from-top-2`}>
                    <p className={`text-sm font-display italic leading-relaxed ${THEME.text.heading}`}>
                      {chatResponse}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RandomMemory;
