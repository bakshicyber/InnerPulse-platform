import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Play, Pause, ChevronRight, ChevronLeft, X, Clock, Target, CheckCircle2 } from 'lucide-react';
import PageTransition from '../components/common/PageTransition';
import { yogaApi } from '../services/api/api';

const YogaSession = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [flow, setFlow] = useState(null);
  const [currentPoseIdx, setCurrentPoseIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchFlow = async () => {
      try {
        const flowId = location.state?.flowId;
        let selectedFlow;
        
        if (flowId) {
            const res = await yogaApi.getFlow(flowId);
            selectedFlow = res.data.data;
        } else {
            const res = await yogaApi.getFlows();
            selectedFlow = res.data.data[0];
        }

        if (selectedFlow && selectedFlow.poses && selectedFlow.poses.length > 0) {
          setFlow(selectedFlow);
          setTimeLeft(selectedFlow.poses[0].duration);
        } else {
          setFlow(null); // Flow data invalid
        }
      } catch (err) {
        console.error('Failed to fetch flow:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFlow();
  }, [location.state]);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && isActive) {
      handleNextPose();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, currentPoseIdx, flow]);

  // Reset image error state when pose changes
  useEffect(() => {
    setImageError(false);
  }, [currentPoseIdx]);

  const handleNextPose = () => {
      if (currentPoseIdx < flow.poses.length - 1) {
        setCurrentPoseIdx(prev => prev + 1);
        setTimeLeft(flow.poses[currentPoseIdx + 1].duration);
      } else {
        setIsActive(false);
        handleComplete();
      }
  };

  const handlePrevPose = () => {
      if (currentPoseIdx > 0) {
          setCurrentPoseIdx(prev => prev - 1);
          setTimeLeft(flow.poses[currentPoseIdx - 1].duration);
      }
  };

  const handleComplete = async () => {
    setIsCompleted(true);
    const totalDuration = flow.poses.reduce((acc, p) => acc + p.duration, 0);
    try {
        await yogaApi.logSession({ 
            flowId: flow._id || 'default', 
            completed: true, 
            totalDuration 
        });
        setTimeout(() => navigate('/dashboard'), 2000);
    } catch (e) {
        console.error(e);
        setTimeout(() => navigate('/dashboard'), 2000);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center academic-label">Initializing Protocol...</div>;
  if (!flow) return <div className="min-h-screen flex items-center justify-center academic-label">Flow not found. Please select a valid flow.</div>;

  const currentPose = flow.poses[currentPoseIdx];

  if (isCompleted) {
      return (
          <PageTransition>
              <div className="min-h-screen flex items-center justify-center flex-col space-y-6">
                  <CheckCircle2 className="w-24 h-24 text-zen-sage" />
                  <h1 className="font-display text-4xl font-black text-zen-blue dark:text-zen-paper">Protocol Complete</h1>
                  <p className="text-zen-blue/60 dark:text-zen-paper/60 font-medium">Session recorded. Returning to dashboard...</p>
              </div>
          </PageTransition>
      )
  }

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col pt-28 pb-12 px-8">
        <div className="max-w-5xl mx-auto w-full space-y-12">
          
          {/* Top Bar */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
                <div className="academic-label">Current Protocol</div>
                <h1 className="font-display text-3xl font-black text-zen-blue dark:text-zen-paper tracking-tight">{flow.flowName}</h1>
            </div>
            <button 
                onClick={() => navigate('/dashboard')} 
                className="p-4 rounded-2xl glass-card hover:bg-zen-blue/5 transition-all text-zen-blue/40 dark:text-zen-paper/40"
            >
                <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Interface */}
            <div className="lg:col-span-7 space-y-8">
                <div className="relative aspect-[4/3] glass-container p-0 overflow-hidden bg-zen-blue/5 border-zen-blue/10 flex items-center justify-center bg-gradient-to-br from-zen-blue/10 to-transparent">
                    <AnimatePresence mode="wait">
                        <motion.div 
                            key={currentPoseIdx}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 flex flex-col items-center justify-center"
                        >
                            {!imageError ? (
                                <img 
                                    src={currentPose.image} 
                                    alt={currentPose.name} 
                                    className="object-cover w-full h-full opacity-80"
                                    onError={() => setImageError(true)}
                                />
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-zen-blue/5">
                                    <Target className="w-32 h-32 text-zen-sage opacity-20 mb-12" />
                                </div>
                            )}
                            {/* Dark gradient overlay for text readability if needed */}
                            <div className="absolute inset-0 bg-gradient-to-t from-zen-blue/90 via-zen-blue/40 to-transparent" />
                            
                            <div className="absolute bottom-12 left-10 right-10 text-left space-y-2">
                                <h2 className="font-display text-4xl font-black text-zen-paper tracking-tighter">{currentPose.name}</h2>
                                <p className="text-zen-paper/80 font-medium italic text-lg line-clamp-2">"{currentPose.instruction}"</p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                    
                    {/* Progress Ring Overlay */}
                    <div className="absolute bottom-6 left-10 right-10">
                        <div className="h-1.5 w-full bg-zen-paper/20 rounded-full overflow-hidden">
                            <motion.div 
                                className="h-full bg-zen-sage"
                                initial={{ width: "0%" }}
                                animate={{ width: `${((currentPoseIdx + 1) / flow.poses.length) * 100}%` }}
                            />
                        </div>
                        <div className="flex justify-between mt-2 text-zen-paper/80 text-[10px] font-black uppercase tracking-widest">
                            <span>Pose {currentPoseIdx + 1} of {flow.poses.length}</span>
                            <span>{Math.round(((currentPoseIdx + 1) / flow.poses.length) * 100)}% Protocol Complete</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Analysis & Controls */}
            <div className="lg:col-span-5 space-y-10">
                <div className="glass-container space-y-8 border-zen-blue/5 shadow-xl">
                    <div className="space-y-2">
                        <p className="academic-label flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> Interval Remaining</p>
                        <div className="font-display text-8xl font-black text-zen-blue dark:text-zen-paper tabular-nums tracking-tighter">
                            {timeLeft}<span className="text-3xl text-zen-sage ml-2">s</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <p className="academic-label flex items-center gap-2"><Target className="w-3.5 h-3.5" /> Next Focal Point</p>
                        <p className="text-zen-blue/60 dark:text-zen-paper/60 font-medium leading-relaxed italic text-lg">
                            {currentPoseIdx < flow.poses.length - 1 ? flow.poses[currentPoseIdx + 1].name : 'Savasana (Rest)'}
                        </p>
                    </div>

                    <div className="flex items-center justify-between gap-4 pt-6">
                        <button onClick={handlePrevPose} disabled={currentPoseIdx === 0} className="p-5 rounded-2xl glass-card hover:bg-zen-blue/5 transition-all text-zen-blue/40 disabled:opacity-50">
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button 
                            onClick={() => setIsActive(!isActive)}
                            className={`flex-1 h-20 rounded-2xl flex items-center justify-center gap-4 font-display font-black text-2xl transition-all shadow-xl active:scale-95 ${isActive ? 'glass-card border-zen-sage/30 text-zen-sage hover:bg-zen-sage/5' : 'bg-zen-blue text-zen-paper hover:bg-zen-blue/90'}`}
                        >
                            {isActive ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 fill-current" />}
                            {isActive ? 'Pause' : 'Initialize'}
                        </button>
                        <button onClick={handleNextPose} className="p-5 rounded-2xl glass-card hover:bg-zen-blue/5 transition-all text-zen-blue/40">
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <div className="glass-container bg-zen-sage/5 border-zen-sage/10 p-8 flex items-center justify-between gap-6 group">
                    <div>
                        <h4 className="font-display font-black text-zen-blue dark:text-zen-paper">{flow.goal}</h4>
                        <p className="text-[10px] academic-label">{flow.difficulty} • {flow.duration} min</p>
                    </div>
                </div>
            </div>

          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default YogaSession;
