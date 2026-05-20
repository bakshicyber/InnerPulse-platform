import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const { user, token, initialized } = useSelector((state) => state.auth);
  const location = window.location.pathname;

  if (!initialized) {
    return null; 
  }

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (user && !user.profile?.isOnboarded && location !== '/onboarding') {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
};

export default PrivateRoute;
