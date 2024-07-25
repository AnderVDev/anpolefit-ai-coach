import React from "react";

interface RadialProgressProp {
  name: string;
  valueKcal: number;
  valueGrams: number;
  total: number;
}

function RadialProgress({name, valueKcal, valueGrams, total }: RadialProgressProp) {
  const intake = (valueKcal / total) * 100;
  // Ensure value is between 0 and 100
  const progressValue = Math.min(Math.max(intake, 0), 100);

  // Calculate the stroke-dashoffset based on the progress value
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progressValue / 100) * circumference;

  return (
    <div className="relative size-12">
      <svg
        className="size-full"
        width="36"
        height="36"
        viewBox="0 0 36 36"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Circle */}
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className="stroke-current text-purple-100"
          strokeWidth="4"
        ></circle>
        {/* Progress Circle inside a group with rotation */}
        <g className="origin-center -rotate-90 transform">
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            className="stroke-current text-gray-500 rounded-lg"
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={offset || 0}
          ></circle>
        </g>
      </svg>
      {/* Percentage Text */}
      <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
        <p className="text-center text-xs font-bold ">
          {valueKcal} <br />{name !== "total" && <span>/ {valueGrams} g</span>}
        </p>
      </div>
    </div>
  );
}

export default RadialProgress;
