import React from 'react';
import Icon from '../../../components/AppIcon';

const TypingIndicator = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="flex items-end space-x-2">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="UtensilsCrossed" size={14} color="white" />
        </div>
        
        <div className="bg-card border border-border px-4 py-3 rounded-2xl rounded-bl-md">
          <div className="flex items-center space-x-1">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
              <div 
                className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" 
                style={{ animationDelay: '0.2s' }}
              ></div>
              <div 
                className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" 
                style={{ animationDelay: '0.4s' }}
              ></div>
            </div>
            <span className="text-xs text-muted-foreground ml-2">
              Finding recommendations...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;