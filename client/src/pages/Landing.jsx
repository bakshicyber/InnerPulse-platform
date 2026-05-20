import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Sparkles, Brain, Activity, ShieldCheck, Play, CheckCircle2, Wind, Heart, Zap, Sun } from 'lucide-react';
import PageTransition from '../components/common/PageTransition';

const Landing = () => {
  const yogaCollections = [
    { title: "Deep Restorative", label: "Recovery", img: "/images/poses/childs_pose.png", desc: "Release physical tension and down-regulate your nervous system with long-hold floor poses." },
    { title: "Solar Power Flow", label: "Energy", img: "/images/poses/warrior_2.png", desc: "Build heat, strength, and internal focus through dynamic sequences and breath-to-movement." },
    { title: "Celestial Balance", label: "Focus", img: "/images/poses/tree_pose.png", desc: "Find your center and sharpen mental clarity with advanced balance and grounding techniques." }
  ];

  const benefits = [
    { icon: Wind, title: "Breath Synchronization", desc: "Connect every movement to a conscious breath, optimizing oxygen flow and mental presence." },
    { icon: Heart, title: "Emotional Equilibrium", desc: "Practice mindful movement to release stored stress and achieve long-term emotional stability." },
    { icon: Zap, title: "Nervous System Tuning", desc: "Use specific sequences designed to switch your body from fight-or-flight to rest-and-digest." },
    { icon: Sun, title: "Radiant Vitality", desc: "Build a consistent practice that enhances your natural energy levels and physical resilience." }
  ];

  return (
    <PageTransition>
      <div className="relative overflow-hidden bg-white dark:bg-zen-slate text-zen-blue dark:text-zen-paper">
        
        {/* Immersive Yoga Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-20 px-8">
            <div className="absolute inset-0 z-0 overflow-hidden">
                <motion.img 
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, ease: "linear" }}
                    src="/images/vips_campus_bg.jpg" 
                    className="w-full h-full object-cover opacity-20 dark:opacity-10 grayscale" 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white dark:via-zen-slate/50 dark:to-zen-slate" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto text-center space-y-10">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-zen-blue/5 dark:bg-white/5 border border-zen-blue/10 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.4em]">
                        <Sparkles className="w-4 h-4 text-zen-sage animate-pulse" /> 
                        The Art of Mindful Movement
                    </div>
                    <h1 className="font-display text-7xl md:text-[9rem] font-black tracking-tighter leading-[0.85] text-zen-blue dark:text-zen-paper">
                        Master Your <br/>
                        <span className="shimmer-text">Internal Gravity.</span>
                    </h1>
                    <p className="text-xl md:text-2xl font-medium text-zen-blue/60 dark:text-zen-paper/60 max-w-3xl mx-auto leading-relaxed">
                        A premium yoga experience designed for the modern mind. 
                        Ground your energy through deep science and ancient flow.
                    </p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col md:flex-row items-center justify-center gap-6 pt-10"
                >
                    <Link to="/register" className="px-12 py-6 bg-zen-blue text-white rounded-full font-display font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-academic flex items-center gap-4 group">
                        Begin Your Practice <Play className="w-5 h-5 fill-current" />
                    </Link>
                    <Link to="/login" className="px-12 py-6 border-2 border-zen-blue/10 rounded-full font-display font-black text-xl hover:bg-zen-blue/5 transition-all flex items-center gap-4 group">
                        Enter Sanctuary <ShieldCheck className="w-6 h-6 text-zen-sage opacity-40 group-hover:opacity-100 transition-opacity" />
                    </Link>
                </motion.div>
            </div>
        </section>

        {/* Curated Yoga Collections */}
        <section className="py-32 px-8 max-w-7xl mx-auto space-y-20">
            <div className="flex flex-col md:flex-row justify-between items-end gap-10">
                <div className="space-y-4 max-w-2xl">
                    <p className="academic-label text-zen-sage">Practice Collections</p>
                    <h2 className="font-display text-5xl font-black tracking-tight leading-none">
                        Engineered for <br/>Your Current State.
                    </h2>
                </div>
                <p className="text-lg font-medium text-zen-blue/40 max-w-sm">
                    From deep restoration to explosive power, find the practice that matches your physiological needs today.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {yogaCollections.map((col, i) => (
                    <motion.div 
                        key={i}
                        whileHover={{ y: -20 }}
                        className="group relative h-[600px] rounded-[3rem] overflow-hidden glass-container p-0 shadow-soft border-zen-blue/5"
                    >
                        <img src={col.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-80" />
                        <div className="absolute inset-0 bg-gradient-to-t from-zen-blue via-zen-blue/20 to-transparent flex flex-col justify-end p-12 text-white">
                            <p className="academic-label text-white/60 mb-3">{col.label}</p>
                            <h3 className="font-display text-4xl font-black mb-4">{col.title}</h3>
                            <p className="text-lg font-medium text-white/80 leading-relaxed mb-8 translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                {col.desc}
                            </p>
                            <div className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-zen-sage">
                                Start Protocol <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>

        {/* The Methodology Section */}
        <section className="py-32 bg-zen-blue/5 dark:bg-white/5 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div className="relative">
                    <div className="aspect-[4/5] glass-container rounded-[4rem] p-0 overflow-hidden shadow-academic group">
                        <img src="/images/poses/dancer_pose.png" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                        <div className="absolute inset-0 bg-zen-blue/20 flex items-center justify-center">
                             <div className="glass-card p-12 rounded-[3rem] text-center space-y-4">
                                <Activity className="w-12 h-12 text-zen-sage mx-auto animate-pulse" />
                                <p className="font-display font-black text-2xl text-zen-blue">The Science <br/>of Flow</p>
                             </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-12">
                    <div className="space-y-6">
                        <p className="academic-label">Our Methodology</p>
                        <h2 className="font-display text-6xl font-black leading-[0.9] tracking-tighter">
                            Movement rooted <br/>in intelligence.
                        </h2>
                        <p className="text-xl font-medium text-zen-blue/60 leading-relaxed">
                            We don't just teach poses; we teach physiological optimization. Every sequence is engineered to synchronize your breath with your autonomic nervous system.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {benefits.map((b, i) => (
                            <div key={i} className="space-y-4 group">
                                <div className="w-12 h-12 rounded-2xl bg-zen-blue/5 flex items-center justify-center text-zen-blue group-hover:bg-zen-blue group-hover:text-white transition-all">
                                    <b.icon className="w-6 h-6" />
                                </div>
                                <h4 className="font-display font-black text-xl">{b.title}</h4>
                                <p className="text-sm font-medium text-zen-blue/50 leading-relaxed">{b.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        {/* Global Community Section */}
        <section className="py-32 px-8 max-w-7xl mx-auto text-center space-y-20">
             <div className="space-y-6">
                 <p className="academic-label">InnerPulse Community</p>
                 <h2 className="font-display text-5xl font-black tracking-tight leading-tight">
                    Join thousands mastering <br/>their internal gravity.
                 </h2>
                 <div className="flex flex-col items-center gap-6">
                    <div className="flex gap-8 justify-center opacity-40">
                        <div className="flex items-center gap-2 academic-label text-xs"><CheckCircle2 className="w-4 h-4 text-zen-sage" /> Scientifically Verified</div>
                        <div className="flex items-center gap-2 academic-label text-xs"><Brain className="w-4 h-4 text-zen-lavender" /> Focus Optimized</div>
                    </div>
                    <Link to="/register" className="btn-primary inline-flex">
                        Create Your Account
                    </Link>
                 </div>
             </div>
             
             <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center opacity-40 grayscale hover:grayscale-0 transition-all">
                 <div className="text-3xl font-display font-black tracking-tighter">VINYASA</div>
                 <div className="text-3xl font-display font-black tracking-tighter">HATHA</div>
                 <div className="text-3xl font-display font-black tracking-tighter">ASHTANGA</div>
                 <div className="text-3xl font-display font-black tracking-tighter">YIN</div>
             </div>
        </section>

        {/* Footer */}
        <footer className="py-20 px-8 border-t border-zen-blue/10 dark:border-white/10 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
                <div className="col-span-2 space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-zen-blue rounded-2xl flex items-center justify-center text-white">
                            <Leaf className="w-6 h-6" />
                        </div>
                        <span className="font-display font-black text-3xl">InnerPulse</span>
                    </div>
                    <p className="text-lg font-medium text-zen-blue/50 max-w-md leading-relaxed">
                        A premium yoga experience designed for the modern mind. Master your flow, ground your energy.
                    </p>
                </div>
                
                <div className="space-y-8">
                    <h4 className="academic-label">Practice</h4>
                    <ul className="space-y-4 font-bold text-zen-blue/60">
                        <Link to="/library" className="block hover:text-zen-sage transition-colors">Yoga Library</Link>
                        <Link to="/chat" className="block hover:text-zen-sage transition-colors">AI Guru</Link>
                        <Link to="/breathing" className="block hover:text-zen-sage transition-colors">Breathwork</Link>
                    </ul>
                </div>

                <div className="space-y-8">
                    <h4 className="academic-label">Sanctuary</h4>
                    <ul className="space-y-4 font-bold text-zen-blue/60">
                        <Link to="/about" className="block hover:text-zen-sage transition-colors">About Us</Link>
                        <Link to="/research" className="block hover:text-zen-sage transition-colors">Research</Link>
                        <Link to="/privacy" className="block hover:text-zen-sage transition-colors">Privacy</Link>
                        <Link to="/terms" className="block hover:text-zen-sage transition-colors">Terms</Link>
                    </ul>
                </div>
            </div>
            
            <div className="mt-24 pt-10 border-t border-zen-blue/5 flex flex-col md:flex-row justify-between items-center gap-8">
                <p className="academic-label text-[10px]">© 2026 InnerPulse Digital Sanctuary. All Rights Reserved.</p>
                <div className="flex gap-10 academic-label text-[10px]">
                    <span className="hover:text-zen-sage cursor-pointer transition-colors">Twitter</span>
                    <span className="hover:text-zen-sage cursor-pointer transition-colors">Instagram</span>
                    <span className="hover:text-zen-sage cursor-pointer transition-colors">LinkedIn</span>
                </div>
            </div>
        </footer>

      </div>
    </PageTransition>
  );
};

export default Landing;
