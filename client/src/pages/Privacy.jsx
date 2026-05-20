import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, EyeOff, FileText } from 'lucide-react';
import PageTransition from '../components/common/PageTransition';
import NeuralBackground from '../components/common/NeuralBackground';

const Privacy = () => {
  return (
    <PageTransition>
      <div className="relative min-h-screen pt-32 pb-20 px-8">
        <NeuralBackground />
        
        <div className="max-w-4xl mx-auto space-y-20 relative z-10">
          <header className="text-center space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="academic-label text-zen-sage"
            >
              Data Protection
            </motion.div>
            <h1 className="font-display text-6xl font-black text-zen-blue dark:text-zen-paper tracking-tighter">
              Privacy Protocol.
            </h1>
            <p className="text-xl font-medium text-zen-blue/60 dark:text-zen-paper/60 max-w-2xl mx-auto">
              Your mental and physiological data is yours alone. We ensure absolute emotional and digital safety.
            </p>
          </header>

          <section className="glass-container p-12 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-zen-sage">
                        <Lock className="w-5 h-5" />
                        <h3 className="font-display text-2xl font-black">Neural Encryption</h3>
                    </div>
                    <p className="text-sm font-medium text-zen-blue/50 leading-relaxed">
                        All chat data with the AI Guru and personal mood logs are encrypted end-to-end. No human, including our development team, can access your private reflections.
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-zen-lavender">
                        <EyeOff className="w-5 h-5" />
                        <h3 className="font-display text-2xl font-black">Biometric Anonymity</h3>
                    </div>
                    <p className="text-sm font-medium text-zen-blue/50 leading-relaxed">
                        Your biometric data (stress scores, flexibility levels) is used exclusively to calibrate your yoga flows and is stored in an anonymized format.
                    </p>
                </div>
            </div>

            <div className="pt-12 border-t border-zen-blue/5 space-y-8">
                <h3 className="font-display text-3xl font-black">Security Standards</h3>
                <div className="space-y-6">
                    {[
                        { title: "No Third-Party Access", desc: "We never sell or share your data with academic partners or external marketers." },
                        { title: "Right to Forget", desc: "At any time, you can permanently delete your entire InnerPulse profile and data history." },
                        { title: "Academic Ethics", desc: "Our data handling policies are reviewed periodically by ethics committees." }
                    ].map((item, i) => (
                        <div key={i} className="flex gap-4 group">
                            <Shield className="w-5 h-5 text-zen-sage shrink-0" />
                            <div>
                                <h4 className="font-bold text-zen-blue">{item.title}</h4>
                                <p className="text-xs font-medium text-zen-blue/40">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </section>

          <div className="text-center space-y-4">
            <FileText className="w-6 h-6 text-zen-sage mx-auto opacity-20" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zen-blue/20">Last Updated: May 2026</p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Privacy;
