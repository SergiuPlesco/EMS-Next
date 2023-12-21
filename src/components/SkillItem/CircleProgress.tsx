import React from "react";

type CircleProgressProps = {
  percentage: number;
  size: number;
  strokeWidth: number;
};

const CircleProgress = ({
  percentage,
  size,
  strokeWidth,
}: CircleProgressProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  //   const progress = ((100 - percentage) / 100) * circumference;
  const progress = (percentage / 100) * circumference;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        stroke="rgba(141, 198, 64, 0.5)"
        fill="none"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        stroke="rgba(141, 198, 64, 1)"
        fill="none"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={progress}
        r={radius}
        cx={size / 2}
        cy={size / 2}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="20px"
        fill="#000000"
      >
        {percentage}%
      </text>
    </svg>
  );
};

export default CircleProgress;
