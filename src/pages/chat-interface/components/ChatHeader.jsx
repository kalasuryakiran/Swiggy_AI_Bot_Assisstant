import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatHeader = ({ onMinimize, onClose, isTyping }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border bg-card">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
          <Icon name="Bot" size={20} color="white" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Food Assistant</h3>
          <p className="text-sm text-muted-foreground">
            {isTyping ? 'Typing...' : 'Online • Ready to help'}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMinimize}
          iconName="Minus"
          iconSize={18}
          className="text-muted-foreground hover:text-foreground"
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          iconName="X"
          iconSize={18}
          className="text-muted-foreground hover:text-foreground"
        />
      </div>
    </div>
  );
};

export default ChatHeader;