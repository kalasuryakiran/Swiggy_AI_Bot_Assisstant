import React from 'react';
import Icon from '../../../components/AppIcon';

const MessageBubble = ({ message, onLongPress, onSwipeDelete }) => {
  const isUser = message.type === 'user';
  
  const handleLongPress = () => {
    if (onLongPress) {
      onLongPress(message);
    }
  };

  const handleSwipe = (e) => {
    if (e.type === 'touchend' && onSwipeDelete) {
      // Simple swipe detection - in real app would use gesture library
      onSwipeDelete(message.id);
    }
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 chat-bubble-enter`}>
      <div className={`flex items-end space-x-2 max-w-xs ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {!isUser && (
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="UtensilsCrossed" size={14} color="white" />
          </div>
        )}
        
        <div
          className={`px-4 py-3 rounded-2xl cursor-pointer ${
            isUser
              ? 'bg-primary text-primary-foreground rounded-br-md'
              : 'bg-card border border-border text-foreground rounded-bl-md'
          }`}
          onTouchStart={handleLongPress}
          onTouchEnd={handleSwipe}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>
          <div className={`flex items-center justify-between mt-2 text-xs ${
            isUser ? 'text-primary-foreground/70' : 'text-muted-foreground'
          }`}>
            <span>
              {message.timestamp.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
            {isUser && (
              <div className="flex items-center space-x-1 ml-2">
                <Icon 
                  name={message.status === 'read' ? 'CheckCheck' : 'Check'} 
                  size={12} 
                  color={message.status === 'read' ? '#4CAF50' : 'currentColor'} 
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;