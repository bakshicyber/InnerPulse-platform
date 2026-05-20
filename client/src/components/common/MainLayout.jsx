import React from 'react';
import { motion } from 'framer-motion';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen relative">
      <div className="vips-bg-overlay" />
      <div className="gradient-overlay" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
