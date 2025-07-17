import React from 'react';

const LoadingIndicator = ({ progress = 0 }) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Progress Bar */}
      <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
        <div 
          className="h-full bg-white rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* Loading Text */}
      <p className="text-white/80 text-sm font-medium animate-pulse">
        Preparing your food experience...
      </p>
      
      {/* Animated Dots */}
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
};

export default LoadingIndicator;