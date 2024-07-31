import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface RadialProgressProp {
  name: string;
  valueKcal: number;
  valueGrams: number;
  total: number;
  size?: number; // Optional prop for SVG size
}

const RadialProgress: React.FC<RadialProgressProp> = ({
  name,
  valueKcal,
  valueGrams,
  total,
  size = 64, // Default size
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger the animation once
    threshold: 0.5, // Trigger when 50% of the component is visible
  });

  const intake = (valueKcal / total) * 100;
  // Ensure value is between 0 and 100
  const progressValue = Math.min(Math.max(intake, 0), 100);

  // Calculate the stroke-dashoffset based on the progress value
  const radius = size / 2 - 4; // Adjust radius for stroke width
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progressValue / 100) * circumference;

  return (
    <div ref={ref} className="relative" style={{ width: size, height: size }}>
      <svg
        className="absolute inset-0"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        xmlns="http://www.w3.org/2000/svg"
        aria-label={`${name}: ${valueKcal} kcal (${progressValue.toFixed(1)}%)`}
      >
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          className="stroke-current text-purple-100"
          strokeWidth="4"
        ></circle>
        {/* Animated Progress Circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          className="stroke-current text-gray-500"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          animate={
            inView
              ? { strokeDashoffset: offset }
              : { strokeDashoffset: circumference }
          }
          transition={{ duration: 1, ease: "easeOut" }} // Animation duration and easing
        ></motion.circle>
      </svg>
      {/* Percentage Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-center text-xs font-bold">
          {valueKcal} <br />
          {name !== "total" && <span>/ {valueGrams} g</span>}
        </p>
      </div>
    </div>
  );
};

export default RadialProgress;
