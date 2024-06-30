import React from 'react';

// Utility function to calculate the stroke-dasharray value
const calculateStrokeDashoffset = (percentage) => {
  const radius = 50; // Radius of the circle
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  return circumference - (percentage / 100) * circumference;
};

export const CircularProgress = ({ percentage }) => {
  const radius = 50;
  const strokeDashoffset = calculateStrokeDashoffset(percentage);
  return (
    <div className="relative flex items-center justify-center">
      <svg className="w-16 h-16" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="lightgray"
          strokeWidth="10"
          fill="none"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="green"
          strokeWidth="10"
          fill="none"
          strokeDasharray={`${2 * Math.PI * radius}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
        />
      </svg>
      <span className="absolute text-sm font-bold text-gray-800">
        {percentage}%
      </span>
    </div>
  );
};
