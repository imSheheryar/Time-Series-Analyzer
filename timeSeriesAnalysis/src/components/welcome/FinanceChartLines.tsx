
import React from 'react';
import { motion } from 'framer-motion';

const FinanceChartLines = () => {
  return (
    <svg className="absolute inset-0 w-full h-full overflow-visible opacity-20" preserveAspectRatio="none">
      {/* Stock market chart lines */}
      <motion.path
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: 1, 
          opacity: 0.7,
          transition: { duration: 2.5, ease: "easeInOut", delay: 0.5 }
        }}
        d="M0,120 C100,140 200,60 300,80 C400,100 500,120 600,100 C700,80 800,100 900,80 C1000,60 1100,120 1200,100 C1300,80 1400,100 1500,90"
        stroke="#3aa5ff"
        strokeWidth="2"
        fill="none"
        className="transform translate-y-[10vh]"
      />
      <motion.path
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: 1, 
          opacity: 0.7, 
          transition: { duration: 2.5, ease: "easeInOut", delay: 0.8 }
        }}
        d="M0,200 C100,180 200,220 300,200 C400,180 500,220 600,240 C700,260 800,220 900,200 C1000,180 1100,220 1200,200"
        stroke="#46e991"
        strokeWidth="2"
        fill="none"
        className="transform translate-y-[5vh]"
      />
      <motion.path
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: 1, 
          opacity: 0.7,
          transition: { duration: 2.5, ease: "easeInOut", delay: 1.1 }
        }}
        d="M0,300 C100,320 200,280 300,300 C400,320 500,280 600,260 C700,240 800,280 900,300 C1000,320 1100,280 1200,300"
        stroke="#ff5b79"
        strokeWidth="2"
        fill="none"
        className="transform translate-y-[0vh]"
      />
      
      {/* Candlestick patterns (financial charts) */}
      {[...Array(10)].map((_, i) => (
        <g key={`candlestick-${i}`} className="opacity-30">
          <motion.rect
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: 0.6,
              height: 20 + Math.random() * 30,
              transition: { duration: 1.5, delay: 0.5 + i * 0.1 }
            }}
            x={150 + i * 60}
            y={350 - (20 + Math.random() * 30)}
            width={10}
            fill={Math.random() > 0.5 ? "#46e991" : "#ff5b79"}
            rx={1}
          />
          <motion.line
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 0.6,
              transition: { duration: 1.5, delay: 0.5 + i * 0.1 }
            }}
            x1={155 + i * 60}
            y1={320 - Math.random() * 30}
            x2={155 + i * 60}
            y2={380 + Math.random() * 30}
            stroke={Math.random() > 0.5 ? "#46e991" : "#ff5b79"}
            strokeWidth={1}
          />
        </g>
      ))}
    </svg>
  );
};

export default FinanceChartLines;
