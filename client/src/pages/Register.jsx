import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../redux/slices/authSlice';
import { authApi } from '../services/api/api';
import PageTransition from '../components/common/PageTransition';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await authApi.register({ name, email, password });
      const { data } = res.data;
      dispatch(loginSuccess({ user: data, token: data.token }));
      navigate('/onboarding', { replace: true });
    } catch (err) { dispatch(loginFailure(err.response?.data?.message || 'Failed.')); }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm space-y-8">
          <div className="text-center space-y-2">
            <Leaf className="w-10 h-10 text-zen-sage mx-auto mb-4" />
            <h1 className="font-display text-3xl font-black text-zen-slate dark:text-zen-paper">Join Us</h1>
            <p className="text-zen-slate/40 dark:text-zen-paper/40 font-medium">Start your wellness journey.</p>
          </div>

          <div className="glass-container">
            <form onSubmit={handleRegister} className="space-y-6">
              {error && <p className="text-xs text-red-400 text-center font-bold">{error}</p>}
              <div className="space-y-4">
                <input 
                    type="text" value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name" required
                    className="w-full glass-card bg-transparent border-zen-slate/10 dark:border-white/10 px-6 py-4 text-sm font-medium focus:outline-none focus:border-zen-sage/40 transition-all"
                />
                <input 
                    type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email" required
                    className="w-full glass-card bg-transparent border-zen-slate/10 dark:border-white/10 px-6 py-4 text-sm font-medium focus:outline-none focus:border-zen-sage/40 transition-all"
                />
                <div className="relative">
                    <input 
                        type={showPassword ? "text" : "password"} 
                        value={password} onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password" required
                        className="w-full glass-card bg-transparent border-zen-slate/10 dark:border-white/10 px-6 py-4 pr-14 text-sm font-medium focus:outline-none focus:border-zen-sage/40 transition-all"
                    />
                    <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-zen-slate/40 hover:text-zen-sage transition-colors"
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full btn-primary flex items-center justify-center gap-2">
                {loading ? 'Initializing...' : 'Register'} <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            <p className="text-center text-xs font-medium text-zen-slate/40 dark:text-zen-paper/40 mt-8">
                Already joined? <Link to="/login" className="text-zen-sage font-black hover:underline">Log in</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Register;
