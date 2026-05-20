import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip } from 'recharts';

const SerenityRings = ({ metrics }) => {
  const defaultMetrics = metrics || { meditationMinutes: 30, streak: 5, stressScore: 4 };

  const data = [
    { name: 'Meditation', value: defaultMetrics.meditationMinutes, fill: '#84A98C', max: 60 },
    { name: 'Consistency', value: Math.min(defaultMetrics.streak * 10, 100), fill: '#CDB4DB', max: 100 },
    { name: 'Calm Index', value: (10 - defaultMetrics.stressScore) * 10, fill: '#84A98C', max: 100 }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-container p-3 border-zen-sage/20 text-zen-slate dark:text-zen-paper">
          <p className="font-display text-xs font-bold uppercase tracking-widest text-zen-sage">{payload[0].payload.name}</p>
          <p className="text-xl font-black">{payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-64 w-full flex flex-col items-center justify-center relative">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart cx="50%" cy="50%" innerRadius="30%" outerRadius="100%" barSize={12} data={data}>
          <RadialBar
            minAngle={15}
            background={{ fill: '#84A98C', opacity: 0.05 }}
            clockWise
            dataKey="value"
            cornerRadius={10}
          />
          <Tooltip content={<CustomTooltip />} />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SerenityRings;
