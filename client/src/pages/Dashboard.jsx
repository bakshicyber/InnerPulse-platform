import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
    Play, Wind, MessageSquare, Flame, TrendingUp, Sparkles,
    BarChart3, Activity, ArrowRight, Clock, Calendar,
    ShieldCheck, Brain, Layers, Zap, Star, Shield,
    Sun, Moon, Cloud, Heart
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStart, fetchSuccess, fetchFailure } from '../redux/slices/dashboardSlice';
import { updateUserProfile } from '../redux/slices/authSlice';
import { dashboardApi, yogaApi } from '../services/api/api';
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import PageTransition from '../components/common/PageTransition';
import NeuralBackground from '../components/common/NeuralBackground';
import BreathworkWidget from '../components/dashboard/BreathworkWidget';

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { data: dashboardData } = useSelector((state) => state.dashboard);
    const [flows, setFlows] = useState([]);
    const [timeConfig] = useState(() => {
        const hours = new Date().getHours();
        if (hours < 12) return {
            text: 'The morning light is with you',
            icon: <Sun className="w-5 h-5 text-zen-sage" />,
            accent: 'zen-sage'
        };
        if (hours < 18) return {
            text: 'The day flows with purpose',
            icon: <Cloud className="w-5 h-5 text-zen-lavender" />,
            accent: 'zen-lavender'
        };
        return {
            text: 'Evening tranquility descends',
            icon: <Moon className="w-5 h-5 text-zen-blue" />,
            accent: 'zen-blue'
        };
    });

    useEffect(() => {

        const fetchDashboard = async () => {
            dispatch(fetchStart());
            try {
                const [dashRes, flowsRes] = await Promise.all([
                    dashboardApi.getData(),
                    yogaApi.getFlows()
                ]);

                const dashData = dashRes.data.data;
                dispatch(fetchSuccess(dashData));
                setFlows(flowsRes.data.data);

                if (dashData.user) {
                    dispatch(updateUserProfile(dashData.user));
                }
            } catch (err) {
                dispatch(fetchFailure(err.message));
            }
        };

        if (user?._id) {
            fetchDashboard();
        }
    }, [user?._id, dispatch]);

    const trendData = dashboardData?.weeklyTrend || [
        { day: 'Mon', val: 0 }, { day: 'Tue', val: 0 }, { day: 'Wed', val: 0 },
        { day: 'Thu', val: 0 }, { day: 'Fri', val: 0 }, { day: 'Sat', val: 0 }, { day: 'Sun', val: 0 }
    ];

    const suggestedPrompts = [
        { text: 'Reduce my stress', icon: <Wind className="w-3 h-3" /> },
        { text: 'Morning mindfulness', icon: <Sun className="w-3 h-3" /> },
        { text: 'Improve sleep quality', icon: <Moon className="w-3 h-3" /> },
        { text: 'Create yoga routine', icon: <Flame className="w-3 h-3" /> },
        { text: 'Discuss my progress', icon: <MessageSquare className="w-3 h-3" /> },
    ];

    if (!user) return null;

    return (
        <PageTransition>
            <div className="relative min-h-screen pt-32 pb-20 px-8 overflow-hidden">
                <NeuralBackground />

                <div className="max-w-7xl mx-auto space-y-16 relative z-10">

                    {/* Hero Section: AI Wellness Intelligence */}
                    <section className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-10">
                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-3 text-zen-sage font-black uppercase tracking-[0.4em] text-[10px]"
                            >
                                <div className="w-2 h-2 rounded-full bg-zen-sage animate-pulse" />
                                Neural Wellness Lab Active
                            </motion.div>

                            <div className="space-y-4">
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-zen-blue/40 dark:text-zen-paper/40 font-display font-black text-xl uppercase tracking-widest flex items-center gap-3"
                                >
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={timeConfig.text}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 1.2 }}
                                        >
                                            {timeConfig.icon}
                                        </motion.div>
                                    </AnimatePresence>
                                    <span className={`text-${timeConfig.accent}`}>{timeConfig.text}</span>, {user.name.split(' ')[0]}
                                </motion.h2>
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="font-display text-7xl font-black text-zen-blue dark:text-zen-paper tracking-tighter leading-[0.9]"
                                >
                                    Your Inner Wellness <br />
                                    <span className="text-zen-sage italic shimmer-text">Intelligence.</span>
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-zen-blue/60 dark:text-zen-paper/60 font-medium text-xl max-w-xl leading-relaxed"
                                >
                                    An AI guide trained to support mindfulness, emotional balance, yoga flow, and deep inner clarity.
                                </motion.p>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex flex-wrap gap-4"
                            >
                                <Link to="/yoga" className="btn-primary flex items-center gap-3">
                                    Begin Session <Play className="w-4 h-4" />
                                </Link>
                                <Link to="/mood" className="btn-secondary flex items-center gap-3">
                                    Mood Check-In <Activity className="w-4 h-4" />
                                </Link>
                                <Link to="/chat" className="px-8 py-5 rounded-[2rem] bg-white/40 dark:bg-black/20 backdrop-blur-md border border-zen-blue/10 hover:border-zen-sage/40 transition-all font-display font-black uppercase tracking-widest text-[10px] text-zen-blue dark:text-zen-paper flex items-center gap-3 group">
                                    Ask AI Guru <Brain className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                </Link>
                            </motion.div>
                        </div>

                        <div className="flex justify-center lg:justify-end relative">
                            {/* AI Orb Avatar */}
                            <div className="relative">
                                <div className="neural-orb" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Brain className="w-16 h-16 text-white/40 animate-pulse" />
                                </div>
                                {/* Floating Stats Orbs */}
                                <motion.div
                                    animate={{ y: [0, -20, 0] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="absolute -top-10 -right-10 glass-container p-6 border-zen-sage/20 bg-white/80 dark:bg-black/40 flex items-center gap-3"
                                >
                                    <div>
                                        <p className="academic-label">Zen Score</p>
                                        <p className="text-3xl font-black text-zen-sage">{dashboardData?.user?.stats?.zenScore || 85}</p>
                                    </div>
                                    <Star className="w-8 h-8 text-zen-sage/20" />
                                </motion.div>
                                <motion.div
                                    animate={{ y: [0, 20, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                                    className="absolute -bottom-10 -left-10 glass-container p-6 border-zen-lavender/20 bg-white/80 dark:bg-black/40 flex items-center gap-3"
                                >
                                    <Heart className="w-8 h-8 text-zen-lavender/20" />
                                    <div>
                                        <p className="academic-label">Resonance</p>
                                        <p className="text-3xl font-black text-zen-lavender">Optimal</p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    {/* Suggested Prompts Section */}
                    <section className="space-y-6">
                        <p className="academic-label text-center">Guided Wellness Navigation</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {suggestedPrompts.map((prompt, i) => (
                                <motion.button
                                    key={i}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    className="px-6 py-4 rounded-2xl glass-card border-zen-blue/5 dark:border-white/5 text-sm font-bold text-zen-blue/60 dark:text-zen-paper/60 flex items-center gap-3 hover:text-zen-sage hover:border-zen-sage/30 transition-all shadow-soft"
                                >
                                    {prompt.icon} {prompt.text}
                                </motion.button>
                            ))}
                        </div>
                    </section>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                        {/* Primary Analysis Column */}
                        <div className="lg:col-span-8 space-y-10">

                            {/* AI Insight Card: Sanctuary Protocol */}
                            <motion.div
                                className="glass-container bg-gradient-to-br from-white/40 to-zen-sage/5 dark:from-black/20 dark:to-white/5 p-12 relative overflow-hidden group border-zen-sage/10"
                            >
                                <div className="absolute top-0 right-0 p-12 opacity-[0.05] group-hover:scale-110 transition-transform duration-1000">
                                    <Sparkles className="w-64 h-64 text-zen-sage" />
                                </div>
                                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
                                    <div className="space-y-6 flex-1">
                                        <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-zen-sage/10 text-zen-sage text-[10px] font-black uppercase tracking-widest border border-zen-sage/20">
                                            <Brain className="w-3 h-3" /> Personalized Intelligence
                                        </div>
                                        <h2 className="font-display text-4xl font-black text-zen-blue dark:text-zen-paper tracking-tight">
                                            {dashboardData?.recommendation?.flow || 'Sanctuary Protocol'}
                                        </h2>
                                        <p className="text-zen-blue/60 dark:text-zen-paper/60 font-medium text-lg italic leading-relaxed max-w-xl">
                                            "{dashboardData?.recommendation?.reason || 'Analyzing physiological patterns to restore cognitive equilibrium.'}"
                                        </p>
                                        <Link to="/yoga" className="btn-primary inline-flex items-center gap-4 group">
                                            Initialize Flow <Zap className="w-4 h-4 fill-current" />
                                        </Link>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-1 gap-8 text-center md:text-left border-l border-zen-blue/10 dark:border-white/10 pl-12">
                                        <div className="space-y-1">
                                            <p className="academic-label flex items-center gap-2 justify-center md:justify-start">
                                                <Clock className="w-3 h-3" /> Interval
                                            </p>
                                            <p className="font-display font-black text-3xl text-zen-blue dark:text-zen-paper">{dashboardData?.recommendation?.duration || 15}m</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="academic-label flex items-center gap-2 justify-center md:justify-start">
                                                <ShieldCheck className="w-3 h-3" /> Status
                                            </p>
                                            <p className="font-display font-black text-3xl text-zen-sage">Grounded</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Biometric Temporal Analysis */}
                            <div className="glass-container p-12">
                                <div className="flex items-center justify-between mb-12">
                                    <h3 className="font-display text-2xl font-black flex items-center gap-3 text-zen-blue dark:text-zen-paper tracking-tight">
                                        <Calendar className="w-7 h-7 text-zen-sage" /> Biometric Temporal Analysis
                                    </h3>
                                    <div className="flex items-center gap-4">
                                        <BarChart3 className="w-4 h-4 text-zen-blue/20" />
                                        <div className="hidden md:flex gap-2">
                                            {[...Array(3)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-zen-sage/20" />)}
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-zen-blue/30">Cycle: 7 Days</span>
                                    </div>
                                </div>
                                <div className="h-72 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={trendData}>
                                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#84A98C', letterSpacing: '0.1em' }} />
                                            <Tooltip contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 50px rgba(30,58,95,0.1)', fontWeight: 900 }} />
                                            <Area type="monotone" dataKey="val" stroke="#1E3A5F" strokeWidth={6} fill="#1E3A5F" fillOpacity={0.03} dot={{ r: 6, fill: '#84A98C', strokeWidth: 3, stroke: '#F8FAF9' }} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Available Flows Library */}
                            <div className="space-y-8">
                                <div className="flex justify-between items-end px-2">
                                    <h3 className="font-display text-2xl font-black flex items-center gap-3 text-zen-blue dark:text-zen-paper tracking-tight">
                                        <Layers className="w-7 h-7 text-zen-sage" /> Protocol Archive
                                    </h3>
                                    {/* <Link to="/yoga" className="academic-label hover:text-zen-sage transition-colors">Expand Library</Link> */}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {flows.slice(0, 4).map((flow) => (
                                        <div key={flow._id} className="glass-container p-8 flex flex-col justify-between border-zen-blue/5 hover:border-zen-sage/30 transition-all group relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                                <Activity className="w-20 h-20" />
                                            </div>
                                            <div className="space-y-4 relative z-10">
                                                <div className="flex justify-between items-start">
                                                    <div className="px-3 py-1 rounded-full bg-zen-blue/5 dark:bg-white/5 text-[10px] font-black uppercase tracking-widest text-zen-sage">
                                                        {flow.category}
                                                    </div>
                                                    <div className="text-[10px] font-black uppercase text-zen-blue/40">{flow.duration}m</div>
                                                </div>
                                                <div>
                                                    <h4 className="font-display text-xl font-black text-zen-blue dark:text-zen-paper leading-tight mb-2">{flow.flowName}</h4>
                                                    <p className="text-sm font-medium text-zen-blue/60 dark:text-zen-paper/60 line-clamp-1">{flow.goal}</p>
                                                </div>
                                            </div>
                                            <Link to="/yoga" state={{ flowId: flow._id }} className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zen-blue dark:text-zen-paper group/link">
                                                Initialize <ArrowRight className="w-3 h-3 group-hover/link:translate-x-2 transition-transform" />
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Controls */}
                        <div className="lg:col-span-4 space-y-10">

                            {/* Breathwork Engine Widget */}
                            <BreathworkWidget />

                            {/* Sanctuary Status Analysis */}
                            <div className="glass-container p-10 space-y-8 border-zen-blue/5 bg-gradient-to-br from-white/40 to-zen-sage/5 dark:from-black/20 dark:to-white/5 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:rotate-12 transition-transform duration-700">
                                    <TrendingUp className="w-32 h-32 text-zen-lavender" />
                                </div>

                                <div className="flex justify-between items-start relative z-10">
                                    <h3 className="font-display font-black flex items-center gap-3 text-zen-blue dark:text-zen-paper uppercase tracking-tight">
                                        <ShieldCheck className="w-6 h-6 text-zen-lavender" /> Safety Status
                                    </h3>
                                    {dashboardData?.moodLogs?.[0] && (
                                        <span className="text-[2rem] leading-none animate-pulse">
                                            {dashboardData.moodLogs[0].mood === 'Happy' ? '😄' :
                                                dashboardData.moodLogs[0].mood === 'Neutral' ? '😐' :
                                                    dashboardData.moodLogs[0].mood === 'Stressed' ? '😔' : '😫'}
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-4 relative z-10">
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-zen-blue/40">
                                        <span>Emotional Density</span>
                                        <span className="text-zen-sage">
                                            {dashboardData?.moodLogs?.[0]?.stressScore || 5}.0 Magnitude
                                        </span>
                                    </div>
                                    <div className="h-1.5 w-full bg-zen-blue/5 dark:bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(dashboardData?.moodLogs?.[0]?.stressScore || 5) * 10}%` }}
                                            className="h-full bg-gradient-to-r from-zen-sage to-zen-lavender"
                                        />
                                    </div>
                                </div>

                                <div className="p-6 rounded-2xl bg-white/40 dark:bg-black/20 border border-zen-blue/5 space-y-2 relative z-10 shadow-inner">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-zen-sage">Resonance Archive</p>
                                    <p className="text-sm font-medium text-zen-blue/70 dark:text-zen-paper/70 italic">
                                        {dashboardData?.moodLogs?.[0]?.note
                                            ? `"${dashboardData.moodLogs[0].note.substring(0, 80)}${dashboardData.moodLogs[0].note.length > 80 ? '...' : ''}"`
                                            : "No cognitive reflections archived for this cycle."}
                                    </p>
                                </div>

                                <button
                                    onClick={() => navigate('/mood')}
                                    className="w-full py-5 rounded-2xl bg-zen-blue text-zen-paper font-black uppercase tracking-widest text-[10px] hover:scale-[1.02] active:scale-95 transition-all shadow-academic flex items-center justify-center gap-3"
                                >
                                    <Sparkles className="w-4 h-4 opacity-50" /> Calibrate Metrics
                                </button>
                            </div>

                            {/* Intelligence Insights */}
                            <div className="glass-container p-10 space-y-6">
                                <h3 className="font-display font-black text-zen-blue dark:text-zen-paper uppercase tracking-tight flex items-center gap-3">
                                    <MessageSquare className="w-5 h-5 text-zen-sage" /> AI Insights
                                </h3>
                                <div className="space-y-4">
                                    <div className="p-4 rounded-xl bg-zen-blue/5 dark:bg-white/5 border border-zen-blue/10">
                                        <p className="text-[10px] font-black text-zen-sage uppercase mb-1">Pattern Detected</p>
                                        <p className="text-xs font-medium text-zen-blue/60 dark:text-zen-paper/60 leading-relaxed">
                                            Your focus peaks 2 hours after morning yoga protocols.
                                        </p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-zen-blue/5 dark:bg-white/5 border border-zen-blue/10">
                                        <p className="text-[10px] font-black text-zen-lavender uppercase mb-1">Recovery Tip</p>
                                        <p className="text-xs font-medium text-zen-blue/60 dark:text-zen-paper/60 leading-relaxed">
                                            Deep breathing intervals are most effective for your current resonance.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Trust & Privacy Footnote */}
                            <div className="text-center space-y-2 opacity-30 px-6">
                                <p className="text-[8px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2">
                                    <Shield className="w-2 h-2" /> Mindfully Encrypted
                                </p>
                                <p className="text-[8px] font-medium leading-relaxed italic">
                                    <ShieldCheck className="w-3 h-3 inline mr-1 opacity-50" /> Your conversations are designed to support wellness guidance, not medical diagnosis.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Custom scrollbar styles for this page */}
                <style dangerouslySetInnerHTML={{
                    __html: `
            .hide-scrollbar::-webkit-scrollbar {
                display: none;
            }
            .hide-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
            }
        `}} />
            </div>
        </PageTransition>
    );
};

export default Dashboard;
