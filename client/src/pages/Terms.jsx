import React from 'react';
import { motion } from 'framer-motion';
import { FileCheck, AlertCircle, Scale, ScrollText } from 'lucide-react';
import PageTransition from '../components/common/PageTransition';
import NeuralBackground from '../components/common/NeuralBackground';

const Terms = () => {
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
              Usage Protocol
            </motion.div>
            <h1 className="font-display text-6xl font-black text-zen-blue dark:text-zen-paper tracking-tighter">
              Terms of Conduct.
            </h1>
            <p className="text-xl font-medium text-zen-blue/60 dark:text-zen-paper/60 max-w-2xl mx-auto">
              Guidelines for maintaining a respectful, safe, and academically honest wellness sanctuary.
            </p>
          </header>

          <section className="glass-container p-12 space-y-12">
            <div className="space-y-8">
                <div className="flex items-center gap-4 text-zen-sage">
                    <AlertCircle className="w-6 h-6" />
                    <h3 className="font-display text-3xl font-black">Medical Disclaimer</h3>
                </div>
                <p className="text-lg font-medium text-zen-blue/60 leading-relaxed italic border-l-4 border-zen-sage pl-6">
                    InnerPulse is a wellness optimization platform. It is NOT a medical diagnosis tool. The AI Guru provides guidance based on established yoga principles, not clinical medical advice. Always consult a physician before beginning any new physical regimen.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-zen-blue/5">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-zen-blue">
                        <Scale className="w-5 h-5" />
                        <h4 className="font-display text-xl font-black text-zen-blue">User Responsibility</h4>
                    </div>
                    <p className="text-sm font-medium text-zen-blue/40 leading-relaxed">
                        You are responsible for listening to your body. If any movement causes pain or discomfort, terminate the session immediately.
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-zen-blue">
                        <FileCheck className="w-5 h-5" />
                        <h4 className="font-display text-xl font-black text-zen-blue">Ethical Conduct</h4>
                    </div>
                    <p className="text-sm font-medium text-zen-blue/40 leading-relaxed">
                        Users must treat the AI Guru and the community resources with respect. Any misuse of the platform for non-wellness purposes may result in account termination.
                    </p>
                </div>
            </div>

            <div className="bg-zen-blue/5 p-8 rounded-3xl space-y-4">
                <div className="flex items-center gap-3">
                    <ScrollText className="w-5 h-5 text-zen-lavender" />
                    <h4 className="font-bold text-zen-blue">Intellectual Property</h4>
                </div>
                <p className="text-xs font-medium text-zen-blue/40">
                    The InnerPulse logo, AI logic, and custom yoga protocols are intellectual property of InnerPulse Digital. They are provided for personal academic wellness use only.
                </p>
            </div>
          </section>

          <footer className="text-center opacity-20">
            <p className="text-[10px] font-black uppercase tracking-[0.2em]">© 2026 InnerPulse Digital Sanctuary • VIPS Academic Edition</p>
          </footer>
        </div>
      </div>
    </PageTransition>
  );
};

export default Terms;
