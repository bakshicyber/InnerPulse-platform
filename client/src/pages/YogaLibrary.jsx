import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Info, X, Sparkles, BookOpen, Activity, Filter } from 'lucide-react';
import PageTransition from '../components/common/PageTransition';
import { yogaApi } from '../services/api/api';

const ImageWithFallback = ({ src, alt, name }) => {
  const [error, setError] = useState(false);
  
  if (error || !src) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zen-slate to-zen-sage/20">
        <div className="text-zen-paper/60 font-display font-black text-3xl uppercase tracking-tighter text-center px-4 leading-none mix-blend-overlay">
          {name}
        </div>
      </div>
    );
  }
  
  return (
    <img 
      src={src} 
      alt={alt} 
      className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" 
      onError={() => setError(true)}
    />
  );
};

const YogaLibrary = () => {
  const [poses, setPoses] = useState([]);
  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedPose, setSelectedPose] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoses = async () => {
      try {
        const res = await yogaApi.getAsanas();
        setPoses(res.data.data);
      } catch (err) {
        console.error('Failed to fetch poses:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPoses();
  }, []);

  const categories = ['All', ...new Set(poses.map(p => p.category))];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredPoses = poses.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.sanskritName.toLowerCase().includes(search.toLowerCase());
    const matchesDiff = difficultyFilter === 'All' || p.difficulty === difficultyFilter;
    const matchesCat = categoryFilter === 'All' || p.category === categoryFilter;
    
    return matchesSearch && matchesDiff && matchesCat;
  });

  return (
    <PageTransition>
      <div className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center gap-2 text-zen-sage font-black uppercase tracking-[0.4em] text-[10px] mb-2">
                <Sparkles className="w-3 h-3" /> <Info className="w-3 h-3" /> Asana Repository
            </div>
            <h1 className="font-display text-5xl font-black text-zen-slate dark:text-zen-paper tracking-tight">The Library of Balance</h1>
            <p className="text-zen-slate/50 dark:text-zen-paper/50 font-medium text-lg max-w-2xl mx-auto italic">
              "Sthira-sukham asanam" — Mastery is finding the perfect union of steadiness and ease.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="max-w-4xl mx-auto space-y-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-zen-sage/5 blur-2xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity" />
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zen-sage" />
                <input 
                  type="text" 
                  placeholder="Search by English or Sanskrit name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="relative w-full glass-container bg-white/60 dark:bg-black/20 rounded-full px-16 py-5 text-zen-slate dark:text-zen-paper placeholder-zen-slate/30 focus:outline-none focus:border-zen-sage/40 transition-all font-medium shadow-xl"
                />
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-zen-slate/5 dark:bg-white/5 border border-zen-slate/10 dark:border-white/10">
                      <Filter className="w-4 h-4 text-zen-slate/50 dark:text-zen-paper/50" />
                      <select 
                        value={difficultyFilter} 
                        onChange={(e) => setDifficultyFilter(e.target.value)}
                        className="bg-transparent border-none text-xs font-black uppercase tracking-widest text-zen-slate dark:text-zen-paper focus:outline-none cursor-pointer"
                      >
                          {difficulties.map(d => <option key={d} value={d}>{d} Difficulty</option>)}
                      </select>
                  </div>
                  
                  <div className="flex gap-2 flex-wrap justify-center">
                      {categories.map(cat => (
                          <button
                            key={cat}
                            onClick={() => setCategoryFilter(cat)}
                            className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${
                                categoryFilter === cat 
                                ? 'bg-zen-sage text-zen-paper border-zen-sage shadow-academic' 
                                : 'bg-transparent text-zen-slate/50 dark:text-zen-paper/50 border-zen-slate/10 dark:border-white/10 hover:border-zen-sage/50'
                            }`}
                          >
                              {cat}
                          </button>
                      ))}
                  </div>
              </div>
          </div>

          {/* Pose Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1,2,3,4,5,6].map(i => <div key={i} className="h-80 glass-container animate-pulse" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPoses.map((pose) => (
                <motion.div 
                  key={pose._id}
                  layoutId={pose._id}
                  onClick={() => setSelectedPose(pose)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-container p-0 overflow-hidden cursor-pointer group hover:border-zen-sage/30 transition-all border-zen-slate/5 dark:border-white/5 flex flex-col h-full"
                >
                  <div className="h-56 w-full relative overflow-hidden bg-zen-slate dark:bg-black">
                    <ImageWithFallback src={pose.image} alt={pose.name} name={pose.name} />
                    
                    {/* Visual indicator of pose intensity */}
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 dark:bg-zen-slate/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-zen-sage shadow-soft flex items-center gap-1">
                        <Activity className="w-3 h-3" /> {pose.difficulty}
                    </div>
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-zen-blue/90 text-[10px] font-black uppercase tracking-widest text-zen-paper shadow-soft">
                        {pose.category}
                    </div>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zen-sage">{pose.sanskritName}</p>
                    <h3 className="font-display text-2xl font-black text-zen-slate dark:text-zen-paper tracking-tight mt-1 mb-4">{pose.name}</h3>
                    <p className="text-xs text-zen-slate/50 dark:text-zen-paper/50 line-clamp-3 leading-relaxed mt-auto">
                        {pose.benefits}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {filteredPoses.length === 0 && (
                  <div className="col-span-full py-20 text-center space-y-4">
                      <BookOpen className="w-12 h-12 text-zen-sage/20 mx-auto" />
                      <p className="text-zen-slate/50 dark:text-zen-paper/50 font-medium">No asanas found in the archives matching your criteria.</p>
                  </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedPose && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPose(null)}
              className="absolute inset-0 bg-zen-slate/40 backdrop-blur-md"
            />
            <motion.div 
              layoutId={selectedPose._id}
              className="relative w-full max-w-4xl glass-container p-0 overflow-hidden shadow-2xl border-zen-sage/20 max-h-[90vh] overflow-y-auto hide-scrollbar"
            >
              <button 
                onClick={() => setSelectedPose(null)}
                className="absolute top-6 right-6 p-3 rounded-full glass-card z-10 hover:bg-zen-sage/10 transition-all text-white hover:text-zen-sage bg-black/20 backdrop-blur-md"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col md:flex-row min-h-[600px]">
                <div className="md:w-1/2 relative bg-zen-slate dark:bg-black min-h-[300px]">
                    <ImageWithFallback src={selectedPose.image} alt={selectedPose.name} name={selectedPose.name} />
                </div>
                
                <div className="md:w-1/2 p-10 md:p-14 space-y-8 flex flex-col justify-center">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2 text-zen-sage font-black uppercase tracking-widest text-xs">
                        <span className="flex items-center gap-1"><Activity className="w-4 h-4" /> {selectedPose.difficulty}</span>
                        <span>•</span>
                        <span>{selectedPose.category}</span>
                    </div>
                    <h2 className="font-display text-5xl font-black text-zen-slate dark:text-zen-paper leading-tight">{selectedPose.name}</h2>
                    <p className="font-display text-xl text-zen-lavender italic font-medium">{selectedPose.sanskritName}</p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-zen-sage">The Practice</p>
                        <p className="text-zen-slate/70 dark:text-zen-paper/70 leading-relaxed font-medium">
                            {selectedPose.description}
                        </p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-zen-sage">Core Benefits</p>
                        <p className="text-zen-slate/70 dark:text-zen-paper/70 leading-relaxed font-medium">
                            {selectedPose.benefits}
                        </p>
                    </div>
                  </div>

                  <div className="pt-4 flex gap-4">
                    <div className="glass-card py-3 px-6 text-center border-zen-sage/20">
                        <p className="text-[10px] font-black uppercase tracking-widest text-zen-sage mb-1">Hold Time</p>
                        <p className="font-black text-xl text-zen-slate dark:text-zen-paper">{selectedPose.duration}s</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

export default YogaLibrary;
