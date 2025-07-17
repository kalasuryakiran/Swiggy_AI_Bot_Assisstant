import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const ChatInput = ({ onSendMessage, disabled }) => {
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSend = () => {
    if (!inputValue.trim() || disabled) return;
    
    onSendMessage(inputValue.trim());
    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="p-4 border-t border-border bg-card">
      <div className="flex items-end space-x-3">
        <div className="flex-1 relative">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask for food suggestions... (e.g., 'I have ₹200' or 'chicken biryani under ₹180')"
            className="w-full px-4 py-3 bg-muted rounded-2xl border-0 resize-none focus:ring-2 focus:ring-primary focus:outline-none text-sm placeholder:text-muted-foreground"
            rows="1"
            style={{ minHeight: '48px', maxHeight: '120px' }}
            disabled={disabled}
          />
          
          {/* Voice input button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleVoiceInput}
            disabled={disabled || isListening}
            className={`absolute right-2 top-2 w-8 h-8 ${
              isListening ? 'text-primary animate-pulse' : 'text-muted-foreground'
            }`}
            iconName={isListening ? 'MicIcon' : 'Mic'}
            iconSize={16}
          />
        </div>
        
        <Button
          onClick={handleSend}
          disabled={!inputValue.trim() || disabled}
          size="icon"
          className="w-12 h-12 rounded-full"
          iconName="Send"
          iconSize={18}
        />
      </div>
      
      {/* Quick suggestions */}
      <div className="flex flex-wrap gap-2 mt-3">
        {[
          "I have ₹200",
          "Lunch under ₹150",
          "Chicken biryani ₹180",
          "Vegetarian options"
        ].map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => setInputValue(suggestion)}
            disabled={disabled}
            className="px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-full text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatInput;