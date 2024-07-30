import React, { useState, useEffect } from 'react';

const CircularProgressBar = ({ endValue, colour, text }) => {
  const [value, setValue] = useState(0);
  const duration = 2000;

  useEffect(() => {
    const step = endValue / (duration / 16);
    const interval = setInterval(() => {
      setValue((prev) => {
        const nextValue = prev + step;
        if (nextValue >= endValue) {
          clearInterval(interval);
          return endValue;
        }
        return nextValue;
      });
    }, 16);
    return () => clearInterval(interval);
  }, [endValue, duration]);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center w-64 h-64 m-10">
      <svg className="w-full h-full transform rotate-90">
        <circle
          className="text-gray-300 mt-10"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50%"
          cy="50%"
        />
        <circle
          className={colour}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50%"
          cy="50%"
          style={{ transition: 'stroke-dashoffset 0.35s' }}
        />
      </svg>
      <div className="absolute -mt-2- text-2xl text-gray-700">{Math.round(value)}%</div>
      <div className="mt-4 font-bold ">{text}</div>
    </div>
  );
};

export default CircularProgressBar;
