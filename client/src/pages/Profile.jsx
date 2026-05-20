import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User as UserIcon, Settings, Award, History, LogOut, Flame, Sparkles, Brain } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';
import PageTransition from '../components/common/PageTransition';
import { userApi } from '../services/api/api';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchProfile = async () => {
          try {
              const res = await userApi.getProfileData();
              setProfileData(res.data.data);
          } catch (err) {
              console.error('Failed to fetch profile:', err);
          } finally {
              setLoading(false);
          }
      };
      if (user) fetchProfile();
  }, [user]);

  if (!user || loading) return <div className="min-h-screen flex items-center justify-center academic-label">Retrieving Profile Matrix...</div>;

  const stats = [
    { label: 'Consistency', value: `${profileData?.consistency || 0}%`, icon: <Flame className="w-5 h-5 text-zen-sage" /> },
    { label: 'Focus Time', value: `${profileData?.totalMinutes || 0} Min`, icon: <History className="w-5 h-5 text-zen-lavender" /> },
    { label: 'Zen Score', value: `${profileData?.zenScore || 0}%`, icon: <Brain className="w-5 h-5 text-zen-sage" /> }
  ];

  return (
    <PageTransition>
      <div className="pt-32 pb-12 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Profile Header */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-container p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 text-center md:text-left"
          >
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-zen-slate/5 dark:bg-white/5 border-4 border-zen-sage/20 flex items-center justify-center">
                <UserIcon className="w-16 h-16 text-zen-sage" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-zen-sage p-2.5 rounded-2xl shadow-soft border-4 border-zen-paper dark:border-zen-slate">
                <Sparkles className="w-5 h-5 text-zen-paper" />
              </div>
            </div>
            
            <div className="flex-1 space-y-3">
              <h1 className="font-display text-5xl font-black text-zen-slate dark:text-zen-paper tracking-tight">{user.name}</h1>
              <p className="text-zen-slate/40 dark:text-zen-paper/40 font-medium text-lg">{user.email}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-6">
                <span className="px-4 py-2 rounded-full glass-card border-zen-sage/20 text-zen-sage text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <Award className="w-3 h-3" /> {user.profile?.flexibilityLevel} Flexibility
                </span>
                <span className="px-4 py-2 rounded-full glass-card border-zen-lavender/20 text-zen-lavender text-[10px] font-black uppercase tracking-widest">
                  {user.profile?.wellnessGoal}
                </span>
              </div>
            </div>

            <Link to="/settings" className="p-5 glass-card rounded-2xl hover:bg-zen-sage/10 transition-all text-zen-slate/40 dark:text-zen-paper/40 hover:text-zen-sage flex items-center justify-center">
              <Settings className="w-7 h-7" />
            </Link>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-container p-8 flex flex-col items-center text-center gap-4"
              >
                <div className="p-4 rounded-2xl bg-zen-slate/5 dark:bg-white/5 border border-zen-slate/5 dark:border-white/5">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-[10px] text-zen-slate/40 dark:text-zen-paper/40 uppercase font-black tracking-[0.2em]">{stat.label}</p>
                  <p className="text-3xl font-display font-black text-zen-slate dark:text-zen-paper mt-1">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Logout Button */}
          <button 
            onClick={() => {
              dispatch(logout());
              navigate('/');
            }}
            className="w-full py-6 glass-container border-zen-slate/10 dark:border-white/10 text-zen-slate/40 dark:text-zen-paper/40 font-display font-black text-xl hover:bg-red-500/5 hover:text-red-500 hover:border-red-500/20 transition-all flex items-center justify-center gap-3"
          >
            <LogOut className="w-6 h-6" /> Terminate Session
          </button>

        </div>
      </div>
    </PageTransition>
  );
};

export default Profile;
