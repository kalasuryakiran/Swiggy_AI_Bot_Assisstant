import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';


const BottomTabNavigator = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabItems = [
    {
      path: '/main-dashboard',
      label: 'Home',
      icon: 'Home',
      activeIcon: 'Home',
    },
    {
      path: '/restaurant-detail-screen',
      label: 'Search',
      icon: 'Search',
      activeIcon: 'Search',
    },
    {
      path: '/order-history-screen',
      label: 'Orders',
      icon: 'Clock',
      activeIcon: 'Clock',
      badge: 2, // Example badge for pending orders
    },
    {
      path: '/chat-interface',
      label: 'Profile',
      icon: 'User',
      activeIcon: 'User',
    },
  ];

  const handleTabPress = (path) => {
    navigate(path);
    // Haptic feedback simulation
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  };

  // Don't show on splash or onboarding screens
  if (location.pathname === '/splash-screen' || location.pathname === '/onboarding-screen') {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border safe-bottom">
      <div className="flex items-center justify-around px-2 py-2 thumb-zone">
        {tabItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => handleTabPress(item.path)}
              className={`relative flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-primary/10 text-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
              style={{ minHeight: '48px' }}
            >
              {/* Icon Container */}
              <div className="relative mb-1">
                <Icon
                  name={isActive ? item.activeIcon : item.icon}
                  size={20}
                  color={isActive ? 'var(--color-primary)' : 'currentColor'}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                
                {/* Badge */}
                {item.badge && (
                  <div className="absolute -top-2 -right-2 min-w-[16px] h-4 bg-error rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-error-foreground px-1">
                      {item.badge > 9 ? '9+' : item.badge}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Label */}
              <span className={`text-xs font-medium truncate max-w-full ${
                isActive ? 'text-primary' : 'text-current'
              }`}>
                {item.label}
              </span>
              
              {/* Active Indicator */}
              {isActive && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomTabNavigator;