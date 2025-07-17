import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import BottomTabNavigator from '../../components/ui/BottomTabNavigator';
import FloatingChatWidget from '../../components/ui/FloatingChatWidget';
import LocationSelector from './components/LocationSelector';
import SearchBar from './components/SearchBar';
import FeaturedRestaurants from './components/FeaturedRestaurants';
import CuisineCategories from './components/CuisineCategories';
import NearbyRestaurants from './components/NearbyRestaurants';

const MainDashboard = () => {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    
    // Simulate API refresh
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setLastUpdated(new Date());
    setIsRefreshing(false);
  };

  const handleNotificationClick = () => {
    // Navigate to notifications or show notification panel
    console.log('Notifications clicked');
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="pt-16 pb-20">
        {/* Sticky Header with Location and Notifications */}
        <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between px-4 py-3">
            <LocationSelector />
            
            <div className="flex items-center space-x-2">
              {/* Offline Indicator */}
              {!isOnline && (
                <div className="flex items-center space-x-1 text-warning text-xs">
                  <Icon name="WifiOff" size={14} />
                  <span>Offline</span>
                </div>
              )}
              
              {/* Refresh Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="w-8 h-8"
                iconName="RotateCcw"
                iconSize={16}
              />
              
              {/* Notifications */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNotificationClick}
                className="w-8 h-8 relative"
                iconName="Bell"
                iconSize={16}
              >
                {/* Notification Badge */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-error-foreground">3</span>
                </div>
              </Button>
            </div>
          </div>
          
          {/* Last Updated Indicator */}
          {!isOnline && (
            <div className="px-4 pb-2">
              <p className="text-xs text-muted-foreground">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <SearchBar />

        {/* Pull to Refresh Indicator */}
        {isRefreshing && (
          <div className="flex items-center justify-center py-4">
            <div className="flex items-center space-x-2 text-primary">
              <Icon name="RotateCcw" size={16} className="animate-spin" />
              <span className="text-sm">Refreshing...</span>
            </div>
          </div>
        )}

        {/* Featured Restaurants Carousel */}
        <FeaturedRestaurants />

        {/* Cuisine Categories Grid */}
        <CuisineCategories />

        {/* Nearby Restaurants List */}
        <NearbyRestaurants />

        {/* Scroll to Top Button */}
        <Button
          onClick={handleScrollToTop}
          className="fixed bottom-24 left-4 z-30 w-12 h-12 rounded-full shadow-floating"
          size="icon"
          iconName="ArrowUp"
          iconSize={20}
        />
      </main>

      {/* Bottom Tab Navigator */}
      <BottomTabNavigator />
      
      {/* Floating Chat Widget */}
      <FloatingChatWidget />
    </div>
  );
};

export default MainDashboard;