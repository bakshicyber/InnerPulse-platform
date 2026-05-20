import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, X, Wind, Activity, Zap } from 'lucide-react';
import PageTransition from '../components/common/PageTransition';
import { dashboardApi } from '../services/api/api';

const Breathing = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState('Inhale');
  const [timeLeft, setTimeLeft] = useState(4);
  const [isActive, setIsActive] = useState(false);
  const [cycles, setCycles] = useState(0);
  const [secondsActive, setSecondsActive] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSecondsActive(prev => prev + 1);
        setTimeLeft(prev => {
          if (prev <= 1) {
            if (phase === 'Inhale') { setPhase('Hold'); return 7; }
            if (phase === 'Hold') { setPhase('Exhale'); return 8; }
            if (phase === 'Exhale') { setCycles(c => c + 1); setPhase('Inhale'); return 4; }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, phase]);

  const handleComplete = async () => {
    try {
      await dashboardApi.logSession({
        type: 'breathing',
        name: '4-7-8 Calibration',
        duration: Math.ceil(secondsActive / 60),
        calmTime: secondsActive
      });
      navigate('/dashboard');
    } catch (err) { navigate('/dashboard'); }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center relative">
        
        <button 
            onClick={() => navigate('/dashboard')} 
            className="fixed top-10 right-10 p-4 rounded-2xl glass-card hover:bg-zen-blue/5 transition-all text-zen-blue/40 dark:text-zen-paper/40 z-50"
        >
            <X className="w-6 h-6" />
        </button>

        <div className="max-w-xl w-full space-y-16">
            
            <div className="space-y-4">
                <div className="academic-label tracking-[0.6em] text-zen-sage animate-subtle-pulse">
                    {isActive ? phase : 'Protocol Standby'}
                </div>
                <div className="flex items-center justify-center gap-4">
                    <div className="academic-label text-[8px] flex items-center gap-2">
                        <Activity className="w-3 h-3" /> Cycles: {cycles}
                    </div>
                    <div className="w-px h-3 bg-zen-blue/10" />
                    <div className="academic-label text-[8px] flex items-center gap-2">
                        <Wind className="w-3 h-3" /> 4-7-8 Technique
                    </div>
                </div>
            </div>

            <div className="relative flex items-center justify-center py-20">
                {/* Background Ring */}
                <div className="absolute w-96 h-96 border-2 border-zen-blue/5 rounded-full dark:border-white/5" />
                
                <motion.div 
                    animate={isActive ? { scale: phase === 'Inhale' ? 1.4 : phase === 'Exhale' ? 1 : 1.4 } : { scale: 1 }}
                    transition={{ duration: phase === 'Inhale' ? 4 : phase === 'Exhale' ? 8 : 7, ease: "easeInOut" }}
                    className="w-72 h-72 rounded-full glass-container flex items-center justify-center border-zen-sage/30 border-[12px] shadow-2xl bg-white/20 dark:bg-black/40"
                >
                    <div className="text-center">
                        <span className="text-9xl font-display font-black text-zen-blue dark:text-zen-paper tracking-tighter tabular-nums">{timeLeft}</span>
                        <p className="academic-label -mt-4 opacity-40">Seconds</p>
                    </div>
                </motion.div>

                {/* Animated Particle Focus */}
                <motion.div 
                    animate={isActive ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-[1px] border-dashed border-zen-sage/20 rounded-full"
                />
            </div>

            <div className="flex flex-col gap-6 pt-10">
                <button 
                    onClick={() => setIsActive(!isActive)}
                    className={`px-16 py-6 rounded-2xl font-display font-black text-2xl transition-all shadow-2xl flex items-center justify-center gap-4 mx-auto active:scale-95 ${isActive ? 'glass-card border-zen-sage/30 text-zen-sage hover:bg-zen-sage/5' : 'bg-zen-blue text-zen-paper hover:bg-zen-blue/90'}`}
                >
                    {isActive ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 fill-current" />}
                    {isActive ? 'Pause Protocol' : 'Begin Calibration'}
                </button>
                
                <AnimatePresence>
                    {cycles > 0 && (
                    <motion.button 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        onClick={handleComplete}
                        className="academic-label hover:text-zen-blue hover:underline transition-all py-2"
                    >
                        Verify & Store Session
                    </motion.button>
                    )}
                </AnimatePresence>
            </div>
            
            <div className="pt-20 opacity-20 flex justify-center gap-3">
                <Zap className="w-4 h-4 text-zen-sage" />
                <span className="academic-label text-[8px]">Neural Synchronization Active</span>
            </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Breathing;
