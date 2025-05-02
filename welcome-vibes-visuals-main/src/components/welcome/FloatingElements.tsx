
import React from 'react';
import { motion } from 'framer-motion';

const FloatingElements = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Data points */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/20"
          initial={{ 
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: 0
          }}
          animate={{ 
            scale: [0, 1, 0],
            opacity: [0, 0.8, 0],
            transition: { 
              duration: 4 + Math.random() * 6,
              repeat: Infinity,
              delay: i * 0.7
            }
          }}
          style={{
            width: 2 + Math.random() * 4 + "px",
            height: 2 + Math.random() * 4 + "px",
          }}
        />
      ))}
      
      {/* Financial indicators */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`indicator-${i}`}
          className="absolute font-mono text-xs text-data-green/40"
          initial={{ 
            x: 20 + Math.random() * 80 + "%",
            y: Math.random() * 100 + "%",
            opacity: 0
          }}
          animate={{ 
            opacity: [0, 0.7, 0],
            transition: { 
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 3
            }
          }}
        >
          {`$${(Math.random() * 1000).toFixed(2)}`}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElements;
