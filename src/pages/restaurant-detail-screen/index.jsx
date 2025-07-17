import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BottomTabNavigator from '../../components/ui/BottomTabNavigator';
import FloatingChatWidget from '../../components/ui/FloatingChatWidget';

import Button from '../../components/ui/Button';
import RestaurantHero from './components/RestaurantHero';
import TabNavigation from './components/TabNavigation';
import MenuSection from './components/MenuSection';
import ReviewsSection from './components/ReviewsSection';
import InfoSection from './components/InfoSection';
import FloatingCartButton from './components/FloatingCartButton';

const RestaurantDetailScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('menu');
  const [cartItems, setCartItems] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock restaurant data
  const restaurant = {
    id: 1,
    name: "Spice Garden Restaurant",
    image: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",
    rating: 4.5,
    reviewCount: 1247,
    deliveryTime: "25-30 mins",
    distance: "1.2 km",
    isOpen: true,
    cuisine: "North Indian, Chinese",
    address: "123 MG Road, Near City Mall",
    area: "Koramangala",
    city: "Bangalore",
    phone: "+91 98765 43210",
    deliveryFee: 25,
    minimumOrder: 150,
    established: "2018",
    latitude: 12.9352,
    longitude: 77.6245
  };

  const handleAddToCart = (item, quantity) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      
      if (quantity === 0) {
        return prevItems.filter(cartItem => cartItem.id !== item.id);
      }
      
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity }];
      }
    });
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: restaurant.name,
        text: `Check out ${restaurant.name} - ${restaurant.cuisine}`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'menu':
        return <MenuSection restaurant={restaurant} onAddToCart={handleAddToCart} />;
      case 'reviews':
        return <ReviewsSection restaurant={restaurant} />;
      case 'info':
        return <InfoSection restaurant={restaurant} />;
      default:
        return <MenuSection restaurant={restaurant} onAddToCart={handleAddToCart} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Custom Header for Restaurant Detail */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-sm border-b border-border safe-top">
        <div className="flex items-center justify-between h-16 px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            iconName="ArrowLeft"
            iconSize={20}
          />
          
          <div className="flex-1 text-center">
            <h1 className="text-lg font-semibold text-foreground truncate">
              {restaurant.name}
            </h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              iconName="Share"
              iconSize={20}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRefresh}
              iconName="RotateCcw"
              iconSize={20}
              className={isRefreshing ? 'animate-spin' : ''}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-16 pb-20">
        {/* Restaurant Hero Section */}
        <RestaurantHero restaurant={restaurant} />

        {/* Tab Navigation */}
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab Content */}
        <div className="min-h-screen">
          {renderTabContent()}
        </div>
      </div>

      {/* Floating Cart Button */}
      <FloatingCartButton cartItems={cartItems} totalAmount={totalAmount} />

      {/* Bottom Navigation */}
      <BottomTabNavigator />

      {/* Floating Chat Widget */}
      <FloatingChatWidget />
    </div>
  );
};

export default RestaurantDetailScreen;