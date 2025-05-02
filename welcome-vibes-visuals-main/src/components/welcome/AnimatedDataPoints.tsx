
import React from 'react';
import { motion } from 'framer-motion';

const AnimatedDataPoints = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-data-blue/30"
          initial={{ 
            x: Math.random() * 100 - 50 + "%",
            y: Math.random() * 100 + "%",
            scale: 0,
            opacity: 0
          }}
          animate={{ 
            scale: [0, 1, 0.5],
            opacity: [0, 0.8, 0],
            transition: { 
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.8
            }
          }}
          style={{
            width: 6 + Math.random() * 8 + "px",
            height: 6 + Math.random() * 8 + "px",
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedDataPoints;
