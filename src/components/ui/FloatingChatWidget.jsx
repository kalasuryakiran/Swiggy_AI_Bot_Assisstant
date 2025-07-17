import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Icon from '../AppIcon';
import Button from './Button';
import foodService from '../../utils/foodService';

const FloatingChatWidget = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hi! I\'m your food planning assistant. What\'s your budget for today? Try asking me \'I have ₹200\' or \'chicken biryani under ₹180\'!",
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const messagesEndRef = useRef(null);
  const location = useLocation();
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, recommendations]);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      // Haptic feedback simulation
      if (navigator.vibrate) {
        navigator.vibrate(10);
      }
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);
    setRecommendations([]);

    // Log search if user is authenticated
    if (user) {
      const parsedQuery = foodService.parseUserQuery(currentInput);
      foodService.logSearch(currentInput, parsedQuery.budget, parsedQuery.dishName);
    }

    try {
      const botResponse = await getBotResponse(currentInput);
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: botResponse.message,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setRecommendations(botResponse.recommendations || []);
    } catch (error) {
      const errorMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: "Sorry, I'm having trouble connecting to the food database. Please try again later.",
        timestamp: new Date(),
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
              message: `Great! Here are delicious options within your ₹${parsedQuery.budget} budget:`,
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
              message: `Perfect! Here are ${parsedQuery.dishName} options under ₹${parsedQuery.budget}:`,
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleOrderNow = (recommendation) => {
    // Add order functionality here
    console.log('Ordering:', recommendation);
    const orderMessage = {
      id: messages.length + 1,
      type: 'bot',
      content: `Great choice! I've added ${recommendation.dishName} from ${recommendation.restaurantName} to your cart. You can proceed to checkout when ready.`,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, orderMessage]);
  };

  // Don't show on splash or onboarding screens
  if (location.pathname === '/splash-screen' || location.pathname === '/onboarding-screen') {
    return null;
  }

  return (
    <>
      {/* Floating Chat Button */}
      {!isExpanded && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={handleToggleExpand}
            className="w-14 h-14 rounded-full chat-gradient shadow-floating fab-scale"
            size="icon"
            iconName="MessageCircle"
            iconSize={24}
          />
          {/* Notification Badge */}
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-accent-foreground">1</span>
          </div>
        </div>
      )}

      {/* Expanded Chat Interface */}
      {isExpanded && (
        <div className="fixed inset-x-4 bottom-4 top-1/3 z-50 bg-card rounded-2xl shadow-elevated border border-border bottom-sheet-enter">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Bot" size={16} color="white" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Food Assistant</h3>
                <p className="text-xs text-muted-foreground">
                  {isTyping ? 'Typing...' : 'Online'}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleExpand}
              iconName="X"
              iconSize={20}
            />
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-80">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} chat-bubble-enter`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl ${
                    message.type === 'user' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Recommendations */}
            {recommendations?.length > 0 && (
              <div className="space-y-3">
                {recommendations.map((recommendation) => (
                  <div
                    key={recommendation.id}
                    className="bg-muted rounded-lg p-3 border border-border"
                  >
                    <div className="flex items-start space-x-3">
                      <img
                        src={recommendation.image}
                        alt={recommendation.dishName}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-foreground text-sm">
                            {recommendation.dishName}
                          </h4>
                          {recommendation.isBestValue && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              Best Value
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {recommendation.restaurantName}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-foreground">
                              ₹{recommendation.price}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              • {recommendation.deliveryTime}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="Star" size={12} className="text-yellow-500" />
                            <span className="text-xs text-muted-foreground">
                              {recommendation.rating}
                            </span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="mt-2 w-full"
                          onClick={() => handleOrderNow(recommendation)}
                        >
                          Order Now
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted px-4 py-2 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-border">
            <div className="flex items-end space-x-2">
              <div className="flex-1 relative">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about restaurants, budget, or dishes..."
                  className="w-full px-4 py-3 bg-muted rounded-2xl border-0 resize-none focus:ring-2 focus:ring-primary focus:outline-none text-sm"
                  rows="1"
                  style={{ minHeight: '44px', maxHeight: '100px' }}
                />
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                size="icon"
                className="w-11 h-11 rounded-full"
                iconName="Send"
                iconSize={16}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChatWidget;