import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ChevronRight, ChevronLeft, Sparkles, Leaf, Activity, Target, Heart } from 'lucide-react';
import PageTransition from '../components/common/PageTransition';
import { authApi } from '../services/api/api';
import { setOnBoarding } from '../redux/slices/authSlice';

const Onboarding = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    flexibility: 'Medium',
    stress: 5,
    goal: 'Relaxation'
  });
  const [loading, setLoading] = useState(false);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await authApi.onboarding(formData);
      dispatch(setOnBoarding());
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center p-6 py-20 relative overflow-hidden">

        <div className="max-w-xl w-full relative z-10">
          {/* Progress Header */}
          <div className="flex justify-center gap-2 mb-12">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className={`h-1.5 flex-1 rounded-full transition-all duration-700 ${s <= step ? 'bg-zen-sage shadow-soft' : 'bg-zen-slate/10 dark:bg-white/10'}`} />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-container p-10 md:p-14 border-zen-sage/10 shadow-2xl"
            >
              {step === 1 && (
                <div className="space-y-8">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-zen-sage/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-zen-sage/20">
                      <Leaf className="w-8 h-8 text-zen-sage" />
                    </div>
                    <h2 className="font-display text-3xl font-black text-zen-slate dark:text-zen-paper">The Basics</h2>
                    <p className="text-zen-slate/50 dark:text-zen-paper/50 font-medium">To personalize your zen journey.</p>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zen-sage ml-1">Current Age</label>
                      <input
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        placeholder="Enter your age"
                        className="w-full glass-card bg-transparent border-zen-slate/10 dark:border-white/10 rounded-2xl px-6 py-4 text-zen-slate dark:text-zen-paper focus:outline-none focus:border-zen-sage/40 transition-all font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zen-sage ml-1">Gender Identity</label>
                      <select
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className="w-full glass-card bg-transparent border-zen-slate/10 dark:border-white/10 rounded-2xl px-6 py-4 text-zen-slate dark:text-zen-paper focus:outline-none focus:border-zen-sage/40 transition-all font-medium appearance-none"
                      >
                        <option value="" className="bg-zen-paper dark:bg-zen-slate">Select Identity</option>
                        <option value="Male" className="bg-zen-paper dark:bg-zen-slate">Male</option>
                        <option value="Female" className="bg-zen-paper dark:bg-zen-slate">Female</option>
                        <option value="Non-binary" className="bg-zen-paper dark:bg-zen-slate">Non-binary</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-zen-lavender/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-zen-lavender/20">
                      <Activity className="w-8 h-8 text-zen-lavender" />
                    </div>
                    <h2 className="font-display text-3xl font-black text-zen-slate dark:text-zen-paper">Physical Base</h2>
                    <p className="text-zen-slate/50 dark:text-zen-paper/50 font-medium">How fluid is your movement today?</p>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {['Low', 'Medium', 'High'].map(level => (
                      <button
                        key={level}
                        onClick={() => setFormData({ ...formData, flexibility: level })}
                        className={`p-6 rounded-2xl border-2 transition-all flex justify-between items-center group ${formData.flexibility === level ? 'bg-zen-sage/5 border-zen-sage text-zen-sage' : 'bg-transparent border-zen-slate/5 dark:border-white/5 hover:border-zen-sage/20 text-zen-slate/60 dark:text-zen-paper/60'}`}
                      >
                        <span className="font-bold text-lg">{level} Flexibility</span>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${formData.flexibility === level ? 'border-zen-sage bg-zen-sage' : 'border-zen-slate/20 dark:border-white/20'}`}>
                          {formData.flexibility === level && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-zen-sage/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-zen-sage/20">
                      <Heart className="w-8 h-8 text-zen-sage" />
                    </div>
                    <h2 className="font-display text-3xl font-black text-zen-slate dark:text-zen-paper">Mental Gravity</h2>
                    <p className="text-zen-slate/50 dark:text-zen-paper/50 font-medium">What is the weight of your stress?</p>
                  </div>
                  <div className="space-y-12 py-6">
                    <div className="relative">
                      <div className="flex justify-between text-xs font-black uppercase tracking-widest text-zen-sage/40 mb-6">
                        <span>Weightless</span>
                        <span>Heavy</span>
                      </div>
                      <input
                        type="range" min="1" max="10"
                        value={formData.stress}
                        onChange={(e) => setFormData({ ...formData, stress: parseInt(e.target.value) })}
                        className="w-full h-2 bg-zen-slate/5 dark:bg-white/5 rounded-full appearance-none cursor-pointer accent-zen-sage"
                      />
                      <div className="text-center mt-8">
                        <span className="text-6xl font-display font-black text-zen-sage">{formData.stress}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-8">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-zen-lavender/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-zen-lavender/20">
                      <Target className="w-8 h-8 text-zen-lavender" />
                    </div>
                    <h2 className="font-display text-3xl font-black text-zen-slate dark:text-zen-paper">Your Intention</h2>
                    <p className="text-zen-slate/50 dark:text-zen-paper/50 font-medium">What does success feel like to you?</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {['Relaxation', 'Strength', 'Flexibility', 'Focus'].map(goal => (
                      <button
                        key={goal}
                        onClick={() => setFormData({ ...formData, goal })}
                        className={`p-6 rounded-2xl border-2 transition-all text-center flex flex-col items-center gap-3 ${formData.goal === goal ? 'bg-zen-sage/5 border-zen-sage text-zen-sage' : 'bg-transparent border-zen-slate/5 dark:border-white/5 hover:border-zen-sage/20 text-zen-slate/40 dark:text-zen-paper/40'}`}
                      >
                        <span className="font-black uppercase tracking-widest text-[10px]">{goal}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 mt-12">
                {step > 1 && (
                  <button onClick={handleBack} className="p-5 rounded-2xl glass-card hover:text-zen-sage transition-colors border-zen-slate/10 dark:border-white/10">
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                )}
                <button
                  onClick={step === 4 ? handleSubmit : handleNext}
                  disabled={loading}
                  className="btn-primary flex-1 flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                  {loading ? 'Initializing...' : step === 4 ? 'Complete Setup' : 'Continue'}
                  {step < 4 && <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-2 text-zen-slate/20 dark:text-zen-paper/20">
            <Sparkles className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">VIPS Sanctuary Engine</span>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Onboarding;
