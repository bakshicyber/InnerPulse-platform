import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, MessageSquare, Save, Sparkles, Wind, Zap, Cloud, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/common/PageTransition';
import { dashboardApi } from '../services/api/api';

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [stressLevel, setStressLevel] = useState(5);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const moods = [
    { emoji: '😄', label: 'Happy', color: '#84A98C', icon: <Sun className="w-4 h-4" />, desc: 'Optimal energy & clarity' },
    { emoji: '😐', label: 'Neutral', color: '#CDB4DB', icon: <Wind className="w-4 h-4" />, desc: 'Steady state equilibrium' },
    { emoji: '😔', label: 'Stressed', color: '#1E3A5F', icon: <Cloud className="w-4 h-4" />, desc: 'High cognitive pressure' },
    { emoji: '😫', label: 'Very Stressed', color: '#0F172A', icon: <Zap className="w-4 h-4" />, desc: 'System overload detected' }
  ];

  const handleSave = async () => {
    if (!selectedMood) return;
    setLoading(true);
    try {
      await dashboardApi.logMood({
        mood: selectedMood,
        stressScore: stressLevel,
        note
      });
      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to log mood:', err);
    } finally {
      setLoading(false);
    }
  };

  const activeMood = moods.find(m => m.label === selectedMood);

  return (
    <PageTransition>
      <div className="relative min-h-screen pt-32 pb-12 px-6 overflow-hidden">
        
        {/* Dynamic Background Glow */}
        <AnimatePresence mode="wait">
            {selectedMood && (
                <motion.div 
                    key={selectedMood}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.15, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.2 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="fixed inset-0 pointer-events-none z-0"
                    style={{ 
                        background: `radial-gradient(circle at 50% 50%, ${activeMood.color}, transparent 70%)`,
                        filter: 'blur(120px)'
                    }}
                />
            )}
        </AnimatePresence>

        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-container p-8 md:p-14 space-y-12 shadow-2xl border-zen-sage/10 bg-white/40 dark:bg-black/20 backdrop-blur-3xl"
          >
            <div className="text-center space-y-4">
              <div className="flex justify-center gap-2 text-zen-sage font-black uppercase tracking-[0.4em] text-[10px] mb-2">
                  <Sparkles className="w-3 h-3" /> InnerPulse Metrics
              </div>
              <h1 className="font-display text-5xl font-black text-zen-slate dark:text-zen-paper tracking-tight leading-tight">
                Emotional Calibration
              </h1>
              <p className="text-zen-slate/50 dark:text-zen-paper/50 font-medium text-lg max-w-xl mx-auto italic">
                "Acknowledging the current frequency is the first step toward recalibration."
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {moods.map((m) => (
                <button 
                  key={m.label}
                  onClick={() => setSelectedMood(m.label)}
                  className={`flex flex-col items-center p-8 rounded-[2.5rem] border-2 transition-all duration-500 group relative overflow-hidden ${
                    selectedMood === m.label 
                    ? 'bg-white/80 dark:bg-black/40 border-zen-sage shadow-academic scale-105' 
                    : 'bg-transparent border-zen-slate/5 dark:border-white/5 hover:border-zen-sage/20 opacity-60 hover:opacity-100'
                  }`}
                >
                  <motion.span 
                    animate={selectedMood === m.label ? { scale: [1, 1.2, 1] } : {}}
                    className="text-5xl mb-4"
                  >
                    {m.emoji}
                  </motion.span>
                  <span className="text-[10px] uppercase font-black tracking-[0.2em] mb-1">{m.label}</span>
                  {selectedMood === m.label && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[8px] font-bold text-zen-sage uppercase opacity-80"
                      >
                          {m.desc}
                      </motion.div>
                  )}
                </button>
              ))}
            </div>

            <div className="space-y-10 py-6">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zen-sage flex items-center gap-2">
                        <TrendingUp className="w-3 h-3" /> Gravity Magnitude
                    </p>
                    <p className="text-3xl font-display font-black text-zen-slate dark:text-zen-paper">{stressLevel}.0</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zen-lavender mb-1">Status</p>
                    <span className="px-4 py-1 rounded-full bg-zen-lavender/10 text-zen-lavender text-[10px] font-black uppercase tracking-widest border border-zen-lavender/20">
                        {stressLevel < 4 ? 'Weightless' : stressLevel < 8 ? 'Balanced' : 'Hyper-Pressurized'}
                    </span>
                </div>
              </div>
              <div className="relative h-12 flex items-center">
                  <div className="absolute inset-0 h-1.5 bg-zen-slate/5 dark:bg-white/5 rounded-full" />
                  <div 
                    className="absolute left-0 h-1.5 bg-gradient-to-r from-zen-sage to-zen-lavender rounded-full transition-all duration-300"
                    style={{ width: `${(stressLevel / 10) * 100}%` }}
                  />
                  <input 
                    type="range" min="1" max="10" value={stressLevel} 
                    onChange={(e) => setStressLevel(parseInt(e.target.value))}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
                  />
                  <motion.div 
                    className="absolute h-6 w-6 rounded-full bg-white dark:bg-zen-slate border-4 border-zen-sage shadow-xl pointer-events-none"
                    style={{ left: `calc(${(stressLevel / 10) * 100}% - 12px)` }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zen-sage">
                <MessageSquare className="w-4 h-4" /> Personal Reflection Archives
              </label>
              <textarea 
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Log your cognitive state for AI analysis..."
                className="w-full glass-card bg-transparent border-zen-slate/10 dark:border-white/10 rounded-[2rem] p-8 text-zen-slate dark:text-zen-paper placeholder-zen-slate/20 focus:outline-none focus:border-zen-sage/40 transition-all font-medium h-48 resize-none shadow-inner"
              />
            </div>

            <button 
              onClick={handleSave}
              disabled={!selectedMood || loading}
              className={`w-full py-8 rounded-[2rem] font-display font-black text-lg uppercase tracking-[0.3em] transition-all relative overflow-hidden group ${
                !selectedMood || loading 
                ? 'bg-zen-slate/5 text-zen-slate/20 cursor-not-allowed' 
                : 'bg-zen-blue text-zen-paper shadow-academic hover:scale-[1.02] active:scale-95'
              }`}
            >
              <span className="relative z-10 flex items-center justify-center gap-4">
                {loading ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                        <Sparkles className="w-6 h-6" />
                    </motion.div>
                ) : (
                    <>Commit Reflection <Save className="w-5 h-5 opacity-40" /></>
                )}
              </span>
              {!loading && selectedMood && (
                  <motion.div 
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                  />
              )}
            </button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default MoodTracker;
