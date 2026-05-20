import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, User as UserIcon, LayoutDashboard, Brain, Sun, Moon, BookOpen, Menu, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { token } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/onboarding';

  if (isAuthPage) return null;

  const NavLink = ({ to, icon: Icon, children, onClick }) => {
    const isActive = location.pathname === to;
    return (
      <Link 
        to={to} 
        onClick={onClick}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 ${
          isActive 
          ? 'bg-zen-blue/10 text-zen-blue font-bold shadow-academic dark:bg-white/5 dark:text-zen-paper' 
          : 'text-zen-blue/60 dark:text-zen-paper/60 hover:text-zen-blue dark:hover:text-zen-paper'
        }`}
      >
        <Icon className="w-4 h-4" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{children}</span>
      </Link>
    );
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 px-6 py-4">
      <nav className="max-w-7xl mx-auto glass-container py-3 px-8 flex justify-between items-center shadow-soft border-white/10 relative">
        <Link to="/" className="flex items-center gap-3 group z-50">
          <div className="w-8 h-8 bg-zen-blue rounded-lg flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
            <Leaf className="w-4 h-4 text-zen-paper" />
          </div>
          <span className="font-display font-black text-xl tracking-tighter text-zen-blue dark:text-zen-paper">InnerPulse</span>
        </Link>
        
        <div className="flex items-center gap-6">
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-2">
            {token ? (
              <>
                <NavLink to="/dashboard" icon={LayoutDashboard}>Dashboard</NavLink>
                <NavLink to="/library" icon={BookOpen}>Asanas</NavLink>
                <NavLink to="/chat" icon={Brain}>Guru</NavLink>
                <NavLink to="/profile" icon={UserIcon}>Profile</NavLink>
              </>
            ) : (
              <>
                <Link to="/login" className="text-xs font-black uppercase tracking-widest text-zen-blue/60 dark:text-zen-paper/60 hover:text-zen-blue px-4">Portal Login</Link>
                <Link to="/register" className="btn-primary py-3 px-8 text-xs uppercase tracking-widest">
                  Initialize
                </Link>
              </>
            )}
          </div>
          
          <div className="hidden lg:block w-px h-6 bg-zen-blue/10 dark:bg-white/10" />
          
          <button 
            onClick={toggleTheme}
            className="p-3 rounded-xl hover:bg-zen-blue/5 dark:hover:bg-white/5 transition-colors text-zen-blue dark:text-zen-paper z-50"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-3 rounded-xl hover:bg-zen-blue/5 dark:hover:bg-white/5 transition-colors text-zen-blue dark:text-zen-paper z-50"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 mt-4 w-full glass-container p-4 flex flex-col gap-2 lg:hidden shadow-2xl"
            >
              {token ? (
                <>
                  <NavLink to="/dashboard" icon={LayoutDashboard} onClick={() => setIsMenuOpen(false)}>Dashboard</NavLink>
                  <NavLink to="/library" icon={BookOpen} onClick={() => setIsMenuOpen(false)}>Asanas</NavLink>
                  <NavLink to="/chat" icon={Brain} onClick={() => setIsMenuOpen(false)}>Guru</NavLink>
                  <NavLink to="/profile" icon={UserIcon} onClick={() => setIsMenuOpen(false)}>Profile</NavLink>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-center py-3 text-xs font-black uppercase tracking-widest text-zen-blue/60 dark:text-zen-paper/60 hover:text-zen-blue">Portal Login</Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)} className="btn-primary py-3 w-full text-center text-xs uppercase tracking-widest">
                    Initialize
                  </Link>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </nav>
    </div>
  );
};

export default Navbar;
