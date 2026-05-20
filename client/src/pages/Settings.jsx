import { Settings as SettingsIcon, Bell, Moon, Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/common/PageTransition';

const Settings = () => {
  const settingsOptions = [
    { id: 'notifications', label: 'Push Notifications', icon: <Bell className="w-5 h-5" />, active: true },
    { id: 'darkmode', label: 'Academic Dark Mode', icon: <Moon className="w-5 h-5" />, active: true },
    { id: 'privacy', label: 'Strict Data Privacy', icon: <Shield className="w-5 h-5" />, active: false },
  ];

  return (
    <PageTransition>
      <div className="pt-32 pb-12 px-6">
        <div className="max-w-3xl mx-auto space-y-8">

          <div className="flex items-center gap-4">
            <Link to="/profile" className="p-3 glass-card rounded-full hover:bg-zen-sage/10 transition-all text-zen-slate/40 dark:text-zen-paper/40 hover:text-zen-sage">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="font-display text-4xl font-black text-zen-slate dark:text-zen-paper tracking-tight flex items-center gap-3">
              <SettingsIcon className="w-8 h-8 text-zen-sage" /> System Preferences
            </h1>
          </div>

          <div className="glass-container p-8 space-y-6">
            {settingsOptions.map((option) => (
              <div key={option.id} className="flex items-center justify-between p-4 rounded-2xl bg-zen-slate/5 dark:bg-white/5 border border-transparent hover:border-zen-sage/20 transition-all">
                <div className="flex items-center gap-4 text-zen-slate dark:text-zen-paper font-bold">
                  <div className="p-3 rounded-xl bg-zen-sage/10 text-zen-sage">
                    {option.icon}
                  </div>
                  {option.label}
                </div>
                <button
                  className={`w-14 h-8 rounded-full p-1 transition-colors ${option.active ? 'bg-zen-sage' : 'bg-zen-slate/20 dark:bg-white/20'}`}
                >
                  <div className={`w-6 h-6 rounded-full bg-white transition-transform ${option.active ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-center pt-8">
            <p className="text-[10px] uppercase tracking-widest font-black text-zen-slate/30 dark:text-zen-paper/30">
              InnerPulse Matrix v2.1.0
            </p>
          </div>

        </div>
      </div>
    </PageTransition>
  );
};

export default Settings;
