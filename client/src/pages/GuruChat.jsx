import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Brain, ShieldCheck, Info, MessageSquare, Wind, Zap, Sun, Moon, Cloud, ArrowRight, Shield, Paperclip } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import PageTransition from '../components/common/PageTransition';
import NeuralBackground from '../components/common/NeuralBackground';
import { aiApi } from '../services/api/api';

const GuruChat = () => {
  const [messages, setMessages] = useState([
    { role: 'guru', text: 'Welcome back. I am here to support your journey. **What do you need today?**' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (userMsg) => {
    const msgToProcess = typeof userMsg === 'string' ? userMsg : input;
    if (!msgToProcess.trim() || loading) return;

    if (typeof userMsg !== 'string') setInput('');

    setMessages(prev => [...prev, { role: 'user', text: msgToProcess }]);
    setLoading(true);

    try {
      const res = await aiApi.chat({ message: msgToProcess });
      setMessages(prev => [...prev, { role: 'guru', text: res.data.data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'guru', text: 'I am sensing a slight interruption. Let us breathe and try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  const suggestedPrompts = [
    { text: 'Reduce Stress', icon: <Wind className="w-3 h-3 text-zen-sage" /> },
    { text: 'Sleep Better', icon: <Moon className="w-3 h-3 text-zen-lavender" /> },
    { text: 'Quick Stretch', icon: <Zap className="w-3 h-3 text-zen-sage" /> },
    { text: 'Morning Energy', icon: <Sun className="w-3 h-3 text-zen-sage" /> },
    { text: 'Anxiety Relief', icon: <Cloud className="w-3 h-3 text-zen-blue" /> },
    { text: 'Focus & Clarity', icon: <Brain className="w-3 h-3 text-zen-lavender" /> },
    { text: 'Breathing Exercise', icon: <Wind className="w-3 h-3 text-zen-sage" /> },
  ];

  const MarkdownComponents = {
    p: ({ children }) => <p className="mb-6 last:mb-0 leading-relaxed text-lg">{children}</p>,
    ul: ({ children }) => <ul className="space-y-3 mb-6 list-none">{children}</ul>,
    li: ({ children }) => (
      <li className="flex items-start gap-3 p-4 rounded-2xl bg-zen-blue/5 dark:bg-white/5 border border-zen-blue/5 group hover:border-zen-sage/30 transition-all">
        <div className="w-1.5 h-1.5 rounded-full bg-zen-sage mt-2.5 shrink-0" />
        <span className="text-sm font-medium">{children}</span>
      </li>
    ),
    h1: ({ children }) => <h1 className="text-3xl font-black mb-6 tracking-tight text-zen-blue dark:text-zen-paper uppercase">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-black mb-4 tracking-tight text-zen-blue dark:text-zen-paper uppercase">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-black mb-3 tracking-tight text-zen-sage uppercase">{children}</h3>,
    strong: ({ children }) => <span className="font-black text-zen-blue dark:text-zen-paper">{children}</span>,
  };

  return (
    <PageTransition>
      <div className="relative min-h-screen pt-32 pb-12 px-6 overflow-hidden flex flex-col items-center">
        <NeuralBackground />

        <div className="max-w-4xl w-full space-y-10 relative z-10 flex flex-col h-full">

          {/* Centered Header */}
          <header className="text-center space-y-6 pt-6">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-display font-black text-zen-blue dark:text-zen-paper tracking-tighter flex items-center justify-center gap-4"
            >
              <Brain className="w-10 h-10 text-zen-sage" /> Yoga Guru
            </motion.h1>

            <div className="flex flex-col items-center space-y-4">
              <div className="neural-orb w-24 h-24 md:w-32 md:h-32 shadow-2xl" />
              <p className="text-sm font-black text-zen-sage uppercase tracking-[0.3em] opacity-80">
                Trusted Wellness Mentor
              </p>
            </div>
          </header>

          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto space-y-12 px-4 custom-scrollbar min-h-[400px] max-h-[50vh] pb-10">
            <AnimatePresence mode="popLayout">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'guru' ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[90%] p-8 md:p-10 rounded-[2.5rem] border border-zen-blue/5 shadow-soft ${msg.role === 'guru' ? 'glass-card bg-white dark:bg-zen-slate/90 rounded-tl-none' : 'bg-zen-blue text-zen-paper rounded-tr-none'}`}>
                    <div className="flex items-center gap-2 mb-6 opacity-40">
                      {msg.role === 'guru' ? <Sparkles className="w-3 h-3" /> : <MessageSquare className="w-3 h-3" />}
                      <span className="academic-label text-[8px] tracking-[0.2em]">{msg.role === 'guru' ? 'Guru Guidance' : 'Your Reflection'}</span>
                    </div>
                    <div className="markdown-container">
                      <ReactMarkdown components={MarkdownComponents}>
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {loading && (
              <div className="flex justify-start">
                <div className="glass-card py-6 px-10 rounded-[2rem] rounded-tl-none flex items-center gap-4">
                  <div className="flex gap-1.5">
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-zen-sage rounded-full" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-zen-sage rounded-full" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-zen-sage rounded-full" />
                  </div>
                  <span className="academic-label text-[8px] text-zen-sage">Gathering Wisdom...</span>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          {/* Input Section */}
          <div className="space-y-6 pt-4 bg-white/20 dark:bg-black/10 backdrop-blur-xl p-8 rounded-[3rem] border border-white/10">
            <div className="px-4">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-zen-blue/60 dark:text-zen-paper/60 mb-6">
                What do you need today?
              </p>
              {/* Prompt Chips */}
              <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar snap-x">
                {suggestedPrompts.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(p.text)}
                    className="px-6 py-3.5 rounded-2xl glass-card bg-white/60 dark:bg-black/40 border-zen-blue/5 dark:border-white/5 text-[10px] font-black uppercase tracking-widest text-zen-blue/80 dark:text-zen-paper/80 hover:border-zen-sage/60 hover:bg-zen-sage/10 transition-all whitespace-nowrap shadow-sm snap-start active:scale-95 flex items-center gap-2"
                  >
                    {p.icon} {p.text}
                  </button>
                ))}
              </div>
            </div>

            {/* Large Input Console */}
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="relative px-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your current state or goal..."
                className="w-full glass-card bg-white dark:bg-zen-slate/80 border-zen-blue/10 dark:border-white/10 rounded-[2.5rem] p-10 pr-24 text-zen-blue dark:text-zen-paper placeholder-zen-blue/20 focus:outline-none focus:border-zen-sage/40 transition-all font-medium text-lg shadow-2xl h-40 resize-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              <div className="absolute left-10 bottom-10">
                <button type="button" className="p-3 rounded-full hover:bg-zen-blue/5 text-zen-blue/40 transition-all">
                  <Paperclip className="w-5 h-5" />
                </button>
              </div>
              <button type="submit" className="absolute right-10 bottom-10 p-5 bg-zen-blue text-zen-paper rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-academic group">
                <Send className="w-6 h-6" />
              </button>
            </form>

            <div className="flex justify-between items-center px-10 text-zen-blue/20 dark:text-zen-paper/20">
              <p className="text-[8px] font-black uppercase tracking-[0.4em] flex items-center gap-2">
                <ShieldCheck className="w-3 h-3" /> <Shield className="w-3 h-3" /> InnerPulse AI Sanctuary
              </p>
              <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zen-lavender hover:opacity-100 transition-opacity">
                <Info className="w-3 h-3" /> <ArrowRight className="w-4 h-4" /> Get Protocol Embed
              </button>
            </div>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            .markdown-container p:last-child { margin-bottom: 0; }
        `}} />
    </PageTransition>
  );
};

export default GuruChat;
