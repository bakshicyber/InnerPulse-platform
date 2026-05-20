import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/common/Navbar';
import PrivateRoute from './components/common/PrivateRoute';
import PublicRoute from './components/common/PublicRoute';
import Skeleton from './components/ui/Skeleton';
import { useDispatch } from 'react-redux';
import { authApi } from './services/api/api';
import { updateUserProfile, setInitialized, logout } from './redux/slices/authSlice';

// Lazy load pages
const Landing = lazy(() => import('./pages/Landing'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Onboarding = lazy(() => import('./pages/Onboarding'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const YogaSession = lazy(() => import('./pages/YogaSession'));
const Breathing = lazy(() => import('./pages/Breathing'));
const GuruChat = lazy(() => import('./pages/GuruChat'));
const MoodTracker = lazy(() => import('./pages/MoodTracker'));
const YogaLibrary = lazy(() => import('./pages/YogaLibrary'));
const Profile = lazy(() => import('./pages/Profile'));
const Settings = lazy(() => import('./pages/Settings'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Research = lazy(() => import('./pages/Research'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center p-12">
    <Skeleton className="w-full max-w-4xl h-[600px]" />
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <Suspense fallback={<PageLoader />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/research" element={<Research />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        
        {/* Protected Routes */}
        <Route path="/onboarding" element={<PrivateRoute><Onboarding /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/yoga" element={<PrivateRoute><YogaSession /></PrivateRoute>} />
        <Route path="/breathing" element={<PrivateRoute><Breathing /></PrivateRoute>} />
        <Route path="/chat" element={<PrivateRoute><GuruChat /></PrivateRoute>} />
        <Route path="/mood" element={<PrivateRoute><MoodTracker /></PrivateRoute>} />
        <Route path="/library" element={<PrivateRoute><YogaLibrary /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
};

import MainLayout from './components/common/MainLayout';

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  React.useEffect(() => {
    const syncAuth = async () => {
      if (token) {
        try {
          const res = await authApi.getProfile();
          dispatch(updateUserProfile(res.data.data));
        } catch (err) {
          console.error('Auth sync failed:', err);
          dispatch(logout());
        }
      }
      dispatch(setInitialized());
    };
    syncAuth();
  }, [dispatch, token]);

  return (
    <Router>
      <MainLayout>
        <Navbar />
        <AnimatedRoutes />
      </MainLayout>
    </Router>
  );
}

export default App;
