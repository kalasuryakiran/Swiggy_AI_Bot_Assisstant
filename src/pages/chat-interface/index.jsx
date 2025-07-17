import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ChatHeader from './components/ChatHeader';
import MessageBubble from './components/MessageBubble';
import RecommendationList from './components/RecommendationList';
import TypingIndicator from './components/TypingIndicator';
import ChatInput from './components/ChatInput';
import DragHandle from './components/DragHandle';
import foodService from '../../utils/foodService';

const ChatInterface = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hi! I\'m your food assistant. I can help you find delicious meals within your budget. Try asking me something like \'I have ₹200\' or \'chicken biryani under ₹180\'!",
      timestamp: new Date(Date.now() - 300000),
      status: 'delivered'
    }
  ]);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content) => {
    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content,
      timestamp: new Date(),
      status: 'sent'
    };

    setMessages(prev => [...prev, newMessage]);
    setIsTyping(true);

    // Update message status
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: 'delivered' }
            : msg
        )
      );
    }, 500);

    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: 'read' }
            : msg
        )
      );
    }, 1000);

    // Log search if user is authenticated
    if (user) {
      const parsedQuery = foodService.parseUserQuery(content);
      foodService.logSearch(content, parsedQuery.budget, parsedQuery.dishName);
    }

    // Get bot response
    try {
      const botResponse = await getBotResponse(content);
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: botResponse.message,
        timestamp: new Date(),
        status: 'delivered',
        recommendations: botResponse.recommendations || []
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: "Sorry, I'm having trouble connecting to the food database. Please try again later.",
        timestamp: new Date(),
        status: 'delivered',
        recommendations: []
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const getBotResponse = async (userInput) => {
    const parsedQuery = foodService.parseUserQuery(userInput);
    
    try {
      let result = { success: false, data: [] };
      
      switch (parsedQuery.queryType) {
        case 'budget_only':
          result = await foodService.searchByBudget(parsedQuery.budget);
          if (result.success && result.data.length > 0) {
            return {
              message: `Perfect! Here are delicious options within your ₹${parsedQuery.budget} budget:`,
              recommendations: result.data
            };
          }
          break;
          
        case 'dish_only':
          result = await foodService.searchByDish(parsedQuery.dishName);
          if (result.success && result.data.length > 0) {
            return {
              message: `I found some great ${parsedQuery.dishName} options for you:`,
              recommendations: result.data
            };
          }
          break;
          
        case 'dish_with_budget':
          result = await foodService.searchByDish(parsedQuery.dishName, parsedQuery.budget);
          if (result.success && result.data.length > 0) {
            return {
              message: `Excellent! Here are ${parsedQuery.dishName} options under ₹${parsedQuery.budget}:`,
              recommendations: result.data
            };
          }
          break;
          
        default:
          // General query - search by common budget
          result = await foodService.searchByBudget(200);
          if (result.success && result.data.length > 0) {
            return {
              message: "I can help you find food within your budget! Here are some popular options:",
              recommendations: result.data.slice(0, 3)
            };
          }
      }
      
      // If no results found or error occurred
      if (!result.success && result.error) {
        return {
          message: `Sorry, ${result.error}. Please try again later.`,
          recommendations: []
        };
      }
      
      return {
        message: "I couldn't find any dishes matching your request. Try asking:\n• 'I have ₹200'\n• 'chicken biryani under ₹180'\n• 'vegetarian options'\n• 'lunch under ₹150'",
        recommendations: []
      };
      
    } catch (error) {
      return {
        message: "Sorry, I'm having trouble connecting to the food database. Please try again later.",
        recommendations: []
      };
    }
  };

  const handleOrderNow = (recommendation) => {
    // Navigate to restaurant detail or order page
    navigate('/restaurant-detail-screen', { 
      state: { 
        restaurant: recommendation.restaurantName,
        dish: recommendation.dishName,
        price: recommendation.price
      }
    });
  };

  const handleMinimize = () => {
    navigate('/main-dashboard');
  };

  const handleClose = () => {
    navigate('/main-dashboard');
  };

  const handleMessageLongPress = (message) => {
    // Show copy/share options
    if (navigator.share) {
      navigator.share({
        text: message.content
      });
    } else {
      navigator.clipboard.writeText(message.content);
    }
  };

  const handleSwipeDelete = (messageId) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  };

  const handleDrag = (e) => {
    // Handle drag for resizing - simplified implementation
    console.log('Drag handle touched');
  };

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Bottom Sheet Container - 70% screen height */}
      <div className="absolute inset-x-0 bottom-0 h-[70vh] bg-card rounded-t-3xl shadow-elevated border-t border-border flex flex-col bottom-sheet-enter">
        
        {/* Drag Handle */}
        <DragHandle onDrag={handleDrag} />
        
        {/* Chat Header */}
        <ChatHeader 
          onMinimize={handleMinimize}
          onClose={handleClose}
          isTyping={isTyping}
        />
        
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-0">
          {messages.map((message) => (
            <div key={message.id}>
              <MessageBubble
                message={message}
                onLongPress={handleMessageLongPress}
                onSwipeDelete={handleSwipeDelete}
              />
              
              {/* Show recommendations after bot messages */}
              {message.type === 'bot' && message.recommendations && message.recommendations.length > 0 && (
                <RecommendationList
                  recommendations={message.recommendations}
                  onOrderNow={handleOrderNow}
                />
              )}
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && <TypingIndicator />}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Chat Input */}
        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={isTyping}
        />
      </div>
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
    </div>
  );
};

export default ChatInterface;