import React from 'react';
import { motion } from 'framer-motion';
import { Beaker, Brain, Microchip, Zap } from 'lucide-react';
import PageTransition from '../components/common/PageTransition';
import NeuralBackground from '../components/common/NeuralBackground';

const Research = () => {
  return (
    <PageTransition>
      <div className="relative min-h-screen pt-32 pb-20 px-8">
        <NeuralBackground />
        
        <div className="max-w-4xl mx-auto space-y-20 relative z-10">
          <header className="text-center space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="academic-label text-zen-lavender"
            >
              Laboratory Insights
            </motion.div>
            <h1 className="font-display text-6xl font-black text-zen-blue dark:text-zen-paper tracking-tighter">
              Yoga Research.
            </h1>
            <p className="text-xl font-medium text-zen-blue/60 dark:text-zen-paper/60 max-w-2xl mx-auto">
              Exploring the intersection of ancient somatic wisdom and modern neurological science.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <section className="glass-container p-10 space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-zen-sage/10 text-zen-sage flex items-center justify-center">
                    <Brain className="w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl font-black">Neurological Discovery</h3>
                <p className="text-sm font-medium text-zen-blue/50 leading-relaxed">
                    Recent studies in **Neuroplasticity** indicate that consistent yoga practice increases gray matter density in the hippocampus—the area of the brain responsible for memory and learning. This is particularly vital for students in high-pressure academic environments.
                </p>
            </section>

            <section className="glass-container p-10 space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-zen-lavender/10 text-zen-lavender flex items-center justify-center">
                    <Microchip className="w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl font-black">Biometric Sync</h3>
                <p className="text-sm font-medium text-zen-blue/50 leading-relaxed">
                    Our platform integrates research on **Heart Rate Variability (HRV)**. By synchronizing breathwork with specific yoga flows, we can actively down-regulate the sympathetic nervous system, shifting users from 'Fight or Flight' to 'Rest and Digest' in under 10 minutes.
                </p>
            </section>
          </div>

          <section className="glass-container p-12 bg-zen-blue/5 dark:bg-white/5 border-zen-blue/10">
            <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1 space-y-6">
                    <div className="academic-label text-zen-sage">The Flow State Study</div>
                    <h2 className="font-display text-4xl font-black tracking-tight">The 2026 Zen Discovery.</h2>
                    <p className="text-lg font-medium text-zen-blue/60 leading-relaxed">
                        In collaboration with academic partners, we have discovered that "Weightless Zen"—a state of deep physical relaxation and sharp mental alertness—can be achieved 40% faster when using AI-personalized sequencing compared to generic yoga flows.
                    </p>
                </div>
                <div className="w-48 h-48 rounded-full border-8 border-zen-sage/20 border-t-zen-sage animate-spin-slow flex items-center justify-center">
                    <Beaker className="w-12 h-12 text-zen-sage" />
                </div>
            </div>
          </section>

          <footer className="text-center py-10 opacity-30 flex flex-col items-center gap-4">
            <Zap className="w-4 h-4 text-zen-sage animate-pulse" />
            <p className="text-[10px] font-black uppercase tracking-[0.4em]">Ongoing Peer-Reviewed Research Portal</p>
          </footer>
        </div>
      </div>
    </PageTransition>
  );
};

export default Research;
