
import React from 'react';
import { motion } from 'framer-motion';

const BackgroundElements = () => {
  return (
    <>
      {/* Background with grid and overlay */}
      <div className="absolute inset-0 chart-grid-bg opacity-50"></div>
      <div className="absolute inset-0 bg-gradient-radial from-data-navy/50 to-data-deep-blue/95"></div>
      
      {/* Add subtle accent dots */}
      <motion.div 
        className="absolute top-20 right-40 h-24 w-24 rounded-full bg-data-green/10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-40 left-20 h-32 w-32 rounded-full bg-data-blue/10"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
    </>
  );
};

export default BackgroundElements;
