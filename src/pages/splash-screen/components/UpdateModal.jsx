import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpdateModal = ({ isVisible, updateInfo, onUpdate, onLater }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-elevated">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Download" size={32} color="var(--color-primary)" />
          </div>
        </div>
        
        {/* Content */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Update Available
          </h3>
          <p className="text-muted-foreground text-sm mb-3">
            A new version of FoodPlannerBot is available with exciting new features and improvements.
          </p>
          
          {/* Version Info */}
          <div className="bg-muted rounded-lg p-3 text-left">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-foreground">Version {updateInfo.version}</span>
              <span className="text-xs text-muted-foreground">{updateInfo.size}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {updateInfo.description}
            </p>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex flex-col space-y-3">
          <Button 
            variant="default" 
            onClick={onUpdate}
            iconName="Download"
            iconPosition="left"
            iconSize={16}
            fullWidth
          >
            Update Now
          </Button>
          {!updateInfo.required && (
            <Button 
              variant="ghost" 
              onClick={onLater}
              fullWidth
            >
              Later
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;