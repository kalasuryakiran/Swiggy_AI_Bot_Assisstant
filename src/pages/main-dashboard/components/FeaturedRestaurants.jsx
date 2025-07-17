import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedRestaurants = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const featuredRestaurants = [
    {
      id: 1,
      name: "Spice Garden",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
      rating: 4.5,
      deliveryTime: "25-30 min",
      cuisine: "North Indian",
      offer: "50% OFF up to ₹100",
      distance: "1.2 km",
      isFeatured: true
    },
    {
      id: 2,
      name: "Pizza Corner",
      image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg",
      rating: 4.3,
      deliveryTime: "20-25 min",
      cuisine: "Italian",
      offer: "Buy 1 Get 1 Free",
      distance: "0.8 km",
      isFeatured: true
    },
    {
      id: 3,
      name: "Burger Junction",
      image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg",
      rating: 4.2,
      deliveryTime: "15-20 min",
      cuisine: "American",
      offer: "₹75 OFF above ₹299",
      distance: "1.5 km",
      isFeatured: true
    },
    {
      id: 4,
      name: "Dosa Palace",
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg",
      rating: 4.6,
      deliveryTime: "30-35 min",
      cuisine: "South Indian",
      offer: "Free Delivery",
      distance: "2.1 km",
      isFeatured: true
    }
  ];

  const handleRestaurantClick = (restaurant) => {
    navigate('/restaurant-detail-screen', { state: { restaurant } });
  };

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -280, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 280, behavior: 'smooth' });
  };

  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-4 px-4">
        <h2 className="text-xl font-semibold text-foreground">Featured Restaurants</h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollLeft}
            className="w-8 h-8"
            iconName="ChevronLeft"
            iconSize={16}
          />
          <Button
            variant="outline"
            size="icon"
            onClick={scrollRight}
            className="w-8 h-8"
            iconName="ChevronRight"
            iconSize={16}
          />
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide px-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {featuredRestaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            onClick={() => handleRestaurantClick(restaurant)}
            className="flex-shrink-0 w-64 bg-card rounded-xl shadow-card border border-border cursor-pointer card-hover"
          >
            <div className="relative">
              <Image
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-40 object-cover rounded-t-xl"
              />
              <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                {restaurant.offer}
              </div>
              <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                <Icon name="Star" size={12} color="gold" />
                <span>{restaurant.rating}</span>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-foreground mb-1">{restaurant.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{restaurant.cuisine}</p>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={12} />
                  <span>{restaurant.deliveryTime}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={12} />
                  <span>{restaurant.distance}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedRestaurants;