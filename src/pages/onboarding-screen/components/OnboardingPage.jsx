import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const OnboardingPage = ({ pageData, isActive }) => {
  return (
    <div className={`flex-shrink-0 w-full h-full flex flex-col items-center justify-center px-6 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
      {/* Illustration Container */}
      <div className="flex-1 flex items-center justify-center mb-8">
        <div className="relative w-80 h-80 flex items-center justify-center">
          {pageData.type === 'chatbot' && (
            <div className="relative">
              {/* Floating Chat Bubble Animation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full animate-pulse"></div>
              </div>
              <div className="relative z-10 w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-floating animate-bounce">
                <Icon name="MessageCircle" size={32} color="white" />
              </div>
              {/* Chat Messages Animation */}
              <div className="absolute top-16 left-20 bg-white rounded-2xl px-4 py-2 shadow-card animate-slide-up">
                <p className="text-sm text-foreground">Hi! I'm your food assistant</p>
              </div>
              <div className="absolute bottom-16 right-20 bg-primary rounded-2xl px-4 py-2 shadow-card animate-slide-up" style={{ animationDelay: '0.5s' }}>
                <p className="text-sm text-white">What's your budget?</p>
              </div>
            </div>
          )}
          
          {pageData.type === 'budget' && (
            <div className="relative">
              {/* Budget Input Mockup */}
              <div className="w-72 bg-white rounded-3xl shadow-elevated p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Bot" size={20} color="white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Food Assistant</p>
                    <p className="text-xs text-muted-foreground">Online</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-muted rounded-2xl px-4 py-3">
                    <p className="text-sm text-muted-foreground">What's your budget for today?</p>
                  </div>
                  <div className="bg-primary rounded-2xl px-4 py-3 ml-8">
                    <p className="text-sm text-white">I have ₹200</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
              {/* Currency Symbol Animation */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-accent rounded-full flex items-center justify-center animate-bounce">
                <span className="text-lg font-bold text-accent-foreground">₹</span>
              </div>
            </div>
          )}
          
          {pageData.type === 'recommendations' && (
            <div className="relative">
              {/* Recommendation Cards Stack */}
              <div className="space-y-4">
                <div className="w-80 bg-white rounded-2xl shadow-card p-4 transform rotate-2 animate-slide-up">
                  <div className="flex items-center space-x-3 mb-3">
                    <Image 
                      src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=60&h=60&fit=crop&crop=center" 
                      alt="Pizza" 
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-foreground">Margherita Pizza</p>
                      <p className="text-sm text-muted-foreground">Pizza Palace</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">₹180</p>
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={12} color="var(--color-accent)" />
                        <span className="text-xs text-muted-foreground">4.5</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-success/10 text-success px-2 py-1 rounded-full">Best Value</span>
                    <span className="text-xs text-muted-foreground">25 min</span>
                  </div>
                </div>
                
                <div className="w-80 bg-white rounded-2xl shadow-card p-4 transform -rotate-1 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                  <div className="flex items-center space-x-3 mb-3">
                    <Image 
                      src="https://images.unsplash.com/photo-1563379091339-03246963d96c?w=60&h=60&fit=crop&crop=center" 
                      alt="Biryani" 
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-foreground">Chicken Biryani</p>
                      <p className="text-sm text-muted-foreground">Spice Garden</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">₹190</p>
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={12} color="var(--color-accent)" />
                        <span className="text-xs text-muted-foreground">4.7</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Popular</span>
                    <span className="text-xs text-muted-foreground">30 min</span>
                  </div>
                </div>
              </div>
              
              {/* Sorting Badge */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-accent rounded-full px-4 py-2 shadow-floating animate-bounce">
                <div className="flex items-center space-x-2">
                  <Icon name="TrendingUp" size={16} color="var(--color-accent-foreground)" />
                  <span className="text-sm font-medium text-accent-foreground">Best Value</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-foreground mb-4 text-heading">
          {pageData.title}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-sm mx-auto text-body">
          {pageData.description}
        </p>
      </div>
    </div>
  );
};

export default OnboardingPage;