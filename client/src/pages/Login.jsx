import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, ArrowRight, ShieldCheck, Sparkles, Eye, EyeOff } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../redux/slices/authSlice';
import { authApi } from '../services/api/api';
import PageTransition from '../components/common/PageTransition';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await authApi.login({ email, password });
      const { data } = res.data;
      dispatch(loginSuccess({ user: data, token: data.token }));
      navigate('/dashboard', { replace: true });
    } catch (err) { dispatch(loginFailure(err.response?.data?.message || 'Authorization failed.')); }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center p-6 relative">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-zen-blue/5 rounded-full blur-[100px] pointer-events-none" />
        
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-lg space-y-10">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-zen-blue dark:bg-zen-sage rounded-2xl flex items-center justify-center mx-auto shadow-2xl">
                <Leaf className="w-8 h-8 text-zen-paper" />
            </div>
            <div className="space-y-1">
                <h1 className="font-display text-4xl font-black text-zen-blue dark:text-zen-paper tracking-tight">Portal Access</h1>
                <p className="text-zen-blue/40 dark:text-zen-paper/40 font-medium">Verify your identity to enter the sanctuary.</p>
            </div>
          </div>

          <div className="glass-container border-zen-blue/5 shadow-2xl">
            <form onSubmit={handleLogin} className="space-y-8">
              {error && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="p-4 rounded-xl bg-red-500/5 border border-red-500/10 text-red-500 text-xs font-bold text-center">
                    {error}
                </motion.div>
              )}
              
              <div className="space-y-6">
                <div className="space-y-2">
                    <label className="academic-label ml-1">Academic Email</label>
                    <input 
                        type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                        placeholder="yourname@vips.edu" required
                        className="w-full glass-card bg-transparent border-zen-blue/10 dark:border-white/10 px-8 py-5 text-sm font-bold text-zen-blue dark:text-zen-paper focus:outline-none focus:border-zen-blue/30 focus:ring-4 focus:ring-zen-blue/5 transition-all"
                    />
                </div>
                <div className="space-y-2">
                    <label className="academic-label ml-1">Access Key</label>
                    <div className="relative">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            value={password} onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••" required
                            className="w-full glass-card bg-transparent border-zen-blue/10 dark:border-white/10 px-8 py-5 pr-16 text-sm font-bold text-zen-blue dark:text-zen-paper focus:outline-none focus:border-zen-blue/30 focus:ring-4 focus:ring-zen-blue/5 transition-all"
                        />
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-6 top-1/2 -translate-y-1/2 p-2 text-zen-blue/40 hover:text-zen-blue dark:text-zen-paper/40 dark:hover:text-zen-paper transition-colors"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-bold text-zen-blue/40 dark:text-zen-paper/40 px-2">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-zen-blue/20 accent-zen-blue" />
                    Maintain Persistence
                </label>
                <span className="hover:text-zen-blue cursor-pointer transition-colors">Request Access Reset</span>
              </div>

              <button type="submit" disabled={loading} className="w-full btn-primary h-16 flex items-center justify-center gap-3 text-lg group">
                {loading ? (
                    <div className="w-6 h-6 border-2 border-zen-paper/20 border-t-zen-paper rounded-full animate-spin" />
                ) : (
                    <>Initialize Session <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>
            </form>

            <div className="mt-12 pt-8 border-t border-zen-blue/5 dark:border-white/5 flex flex-col items-center gap-6">
                <div className="flex items-center gap-2 academic-label text-[8px]">
                    <ShieldCheck className="w-3 h-3 text-zen-sage" /> End-to-End Encryption Active
                </div>
                <p className="text-center text-xs font-medium text-zen-blue/40 dark:text-zen-paper/40">
                    New Researcher? <Link to="/register" className="text-zen-blue dark:text-zen-sage font-black hover:underline ml-1">Request Enrollment</Link>
                </p>
            </div>
          </div>
          
          <div className="flex justify-center gap-2 text-zen-blue/10 dark:text-white/10">
                <Sparkles className="w-4 h-4" />
                <span className="academic-label text-[8px]">InnerPulse Academic Network v2.0</span>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Login;
