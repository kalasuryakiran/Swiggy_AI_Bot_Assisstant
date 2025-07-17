import React from 'react';
import Icon from '../../../components/AppIcon';

const AppLogo = ({ isAnimating = true }) => {
  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Logo Container with Animation */}
      <div className={`relative ${isAnimating ? 'animate-pulse' : ''}`}>
        <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-white/30">
          <Icon 
            name="UtensilsCrossed" 
            size={48} 
            color="white" 
            strokeWidth={1.5}
          />
        </div>
        
        {/* Glow Effect */}
        <div className="absolute inset-0 w-24 h-24 bg-white/10 rounded-3xl blur-xl animate-pulse"></div>
      </div>
      
      {/* App Name */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">
          FoodPlannerBot
        </h1>
        <p className="text-white/80 text-sm font-medium">
          Smart Food Planning Within Budget
        </p>
      </div>
    </div>
  );
};

export default AppLogo;