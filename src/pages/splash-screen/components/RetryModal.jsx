import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RetryModal = ({ isVisible, onRetry, onSkip }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-elevated">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center">
            <Icon name="Wifi" size={32} color="var(--color-error)" />
          </div>
        </div>
        
        {/* Content */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Connection Timeout
          </h3>
          <p className="text-muted-foreground text-sm">
            Unable to connect to our servers. Please check your internet connection and try again.
          </p>
        </div>
        
        {/* Actions */}
        <div className="flex flex-col space-y-3">
          <Button 
            variant="default" 
            onClick={onRetry}
            iconName="RefreshCw"
            iconPosition="left"
            iconSize={16}
            fullWidth
          >
            Try Again
          </Button>
          <Button 
            variant="ghost" 
            onClick={onSkip}
            fullWidth
          >
            Continue Offline
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RetryModal;