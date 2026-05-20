import React from 'react';
import { motion } from 'framer-motion';
import { Building2, GraduationCap, Heart, Users } from 'lucide-react';
import PageTransition from '../components/common/PageTransition';
import NeuralBackground from '../components/common/NeuralBackground';

const AboutUs = () => {
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
              Academic Sanctuary
            </motion.div>
            <h1 className="font-display text-6xl font-black text-zen-blue dark:text-zen-paper tracking-tighter">
              About InnerPulse.
            </h1>
            <p className="text-xl font-medium text-zen-blue/60 dark:text-zen-paper/60 max-w-2xl mx-auto">
              Bridging the gap between academic excellence and physiological equilibrium through the science of yoga.
            </p>
          </header>

          <section className="glass-container p-12 space-y-10">
            <div className="flex items-start gap-8">
                <div className="p-4 rounded-2xl bg-zen-blue/5 text-zen-blue">
                    <Building2 className="w-8 h-8" />
                </div>
                <div className="space-y-4">
                    <h3 className="font-display text-3xl font-black">Our VIPS Foundation</h3>
                    <p className="text-lg font-medium text-zen-blue/60 leading-relaxed">
                        InnerPulse was born out of a collaboration with the **Vivekananda Institute of Professional Studies (VIPS)**. We recognized that the intense focus required for professional education must be balanced with deep restorative practices.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 border-t border-zen-blue/5">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-zen-sage">
                        <GraduationCap className="w-5 h-5" />
                        <span className="academic-label">The Mission</span>
                    </div>
                    <p className="font-medium text-zen-blue/50">To provide every student and faculty member with the digital tools needed to manage stress, enhance focus, and maintain long-term physical health.</p>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-zen-lavender">
                        <Users className="w-5 h-5" />
                        <span className="academic-label flex items-center gap-2"><Heart className="w-3 h-3" /> The Community</span>
                    </div>
                    <p className="font-medium text-zen-blue/50">A collective of focus-driven individuals committed to mastering their internal gravity and achieving peak academic performance.</p>
                </div>
            </div>
          </section>

          <section className="text-center space-y-8">
            <h3 className="font-display text-4xl font-black">The VIPS Advantage</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { title: "Academic Rigor", desc: "Designed for high-intensity environments." },
                    { title: "Mindful Space", desc: "Creating sanctuaries within the campus." },
                    { title: "Neural Growth", desc: "Optimizing brain health for learning." }
                ].map((item, i) => (
                    <div key={i} className="glass-card p-8 space-y-3">
                        <h4 className="font-display font-black text-xl text-zen-sage">{item.title}</h4>
                        <p className="text-sm font-medium text-zen-blue/40">{item.desc}</p>
                    </div>
                ))}
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
};

export default AboutUs;
