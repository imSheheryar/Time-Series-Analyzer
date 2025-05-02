import React, { useEffect, useState } from 'react';
import BackgroundElements from './welcome/BackgroundElements';
import FinanceChartLines from './welcome/FinanceChartLines';
import WelcomeContent from './welcome/WelcomeContent';
import FloatingElements from './welcome/FloatingElements';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

const WelcomeScreen = ({ onGetStarted }: WelcomeScreenProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    // Simulate loading analytics data
    const timer = setTimeout(() => {
      document.querySelector('.loading-indicator')?.classList.add('hide');
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: 'url(/time-series-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-data-deep-blue/90 via-data-deep-blue/80 to-data-deep-blue/70"></div>
      </div>

      {/* Keep existing animated elements with adjusted opacity */}
      <div className="absolute inset-0 z-1 opacity-40">
        <BackgroundElements />
        <FinanceChartLines />
        <FloatingElements />
      </div>
      
      {/* Main content with glass effect */}
      <div className="relative z-10 max-w-3xl px-6 md:px-0">
        <WelcomeContent isLoaded={isLoaded} onGetStarted={onGetStarted} />
      </div>
    </div>
  );
};

export default WelcomeScreen;
