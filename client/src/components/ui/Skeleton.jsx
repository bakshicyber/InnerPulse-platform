import React from 'react';

const Skeleton = ({ className }) => {
  return (
    <div className={`animate-pulse bg-zen-stone/40 rounded-xl ${className}`} />
  );
};

export default Skeleton;
