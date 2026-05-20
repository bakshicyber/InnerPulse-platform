import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind } from 'lucide-react';

const BreathworkWidget = () => {
  const [phase, setPhase] = useState('Inhale'); // Inhale, Hold, Exhale
  const [count, setCount] = useState(4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev === 1) {
          if (phase === 'Inhale') { setPhase('Hold'); return 7; }
          if (phase === 'Hold') { setPhase('Exhale'); return 8; }
          if (phase === 'Exhale') { setPhase('Inhale'); return 4; }
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [phase]);

  return (
    <div className="glass-container flex flex-col items-center justify-center space-y-8 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:rotate-45 transition-transform duration-1000">
        <Wind className="w-32 h-32" />
      </div>

      <div className="relative z-10 text-center space-y-2">
        <p className="academic-label">Neuro-Respiratory Cycle</p>
        <h4 className="text-2xl font-display font-black text-zen-blue dark:text-zen-paper uppercase tracking-tight">Focus Engine</h4>
      </div>

      {/* Breathing Circle */}
      <div className="relative flex items-center justify-center w-48 h-48">
        <motion.div
          className="absolute inset-0 rounded-full bg-zen-sage/10 border-2 border-zen-sage/20"
          animate={{
            scale: phase === 'Inhale' ? 1.5 : phase === 'Exhale' ? 1 : 1.5,
          }}
          transition={{
            duration: phase === 'Inhale' ? 4 : phase === 'Hold' ? 0 : 8,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute inset-4 rounded-full bg-zen-blue/5 border border-zen-blue/10 flex flex-col items-center justify-center"
          animate={{
             opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
            <AnimatePresence mode="wait">
                <motion.span
                    key={phase}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-zen-sage"
                >
                    {phase}
                </motion.span>
            </AnimatePresence>
            <span className="text-4xl font-display font-black text-zen-blue dark:text-zen-paper">{count}</span>
        </motion.div>
      </div>

      <p className="text-[10px] font-medium text-zen-blue/40 dark:text-zen-paper/40 italic text-center max-w-[200px]">
        Synchronize your awareness with the expanding pulse.
      </p>
    </div>
  );
};

export default BreathworkWidget;
