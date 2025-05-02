import React from 'react';
import { motion } from 'framer-motion';
import AnimatedDataPoints from './AnimatedDataPoints';

interface WelcomeContentProps {
  isLoaded: boolean;
  onGetStarted: () => void;
}

const WelcomeContent = ({ isLoaded, onGetStarted }: WelcomeContentProps) => {
  return (
    <motion.div
      className="glass-card p-10 md:p-12 rounded-2xl shadow-2xl text-center mb-12 overflow-hidden backdrop-blur-xl"
      style={{
        background: 'rgba(13, 28, 63, 0.4)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
          ease: "easeOut",
          delay: 0.4
        }
      }}
    >
      <AnimatedDataPoints />

      <div className="relative">
        {/* Badge/Chip */}
        <motion.div
          className="inline-block rounded-full bg-data-navy/70 px-4 py-1.5 text-data-blue text-xs sm:text-sm font-mono tracking-wider border border-data-blue/20 mb-6 backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              duration: 0.6,
              delay: 1.4
            }
          }}
        >
          TIME SERIES ANALYSIS
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.8,
              delay: 0.8
            }
          }}
        >
          Welcome to Time Series Analyzer
        </motion.h1>

        {/* Author */}
        <motion.p
          className="text-base text-white/90 mb-8 font-light"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              duration: 0.8,
              delay: 1.2
            }
          }}
        >
          Created by <span className="font-medium text-data-green drop-shadow-md">Sheheryar Yousaf</span>
        </motion.p>

        {/* Loading indicator */}
        <motion.div
          className="loading-indicator flex items-center justify-center space-x-2 transition-opacity duration-500"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              duration: 0.6,
              delay: 1.6
            }
          }}
        >
          <span className="block h-2 w-2 rounded-full bg-data-blue animate-pulse" style={{ animationDelay: "0s" }}></span>
          <span className="block h-2 w-2 rounded-full bg-data-green animate-pulse" style={{ animationDelay: "0.2s" }}></span>
          <span className="block h-2 w-2 rounded-full bg-data-purple animate-pulse" style={{ animationDelay: "0.4s" }}></span>
          <span className="text-xs font-mono text-white/80 ml-2">Loading analysis engine...</span>
        </motion.div>

        {/* Button */}
        <motion.button
          className="data-button mt-10 px-8 py-3 bg-data-blue/90 hover:bg-data-blue text-white rounded-lg transform transition-all duration-200 hover:scale-105 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: isLoaded ? 1 : 0,
            y: isLoaded ? 0 : 20,
            transition: {
              duration: 0.6,
              delay: 2.4
            }
          }}
          onClick={onGetStarted}
        >
          Enter Analysis Dashboard
        </motion.button>
      </div>
    </motion.div>
  );
};

export default WelcomeContent;
