import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const RestaurantHero = ({ restaurant }) => {
  return (
    <div className="relative h-64 w-full overflow-hidden">
      <Image
        src={restaurant.image}
        alt={restaurant.name}
        className="w-full h-full object-cover"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      
      {/* Restaurant Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h1 className="text-2xl font-bold mb-2">{restaurant.name}</h1>
        
        <div className="flex items-center space-x-4 mb-2">
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={16} color="#FFD700" />
            <span className="text-sm font-medium">{restaurant.rating}</span>
            <span className="text-sm opacity-80">({restaurant.reviewCount})</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={16} color="white" />
            <span className="text-sm">{restaurant.deliveryTime}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Icon name="MapPin" size={16} color="white" />
            <span className="text-sm">{restaurant.distance}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-xs bg-green-500 px-2 py-1 rounded-full">
            {restaurant.isOpen ? 'Open' : 'Closed'}
          </span>
          <span className="text-xs opacity-80">{restaurant.cuisine}</span>
        </div>
      </div>
      
      {/* Favorite Button */}
      <button className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
        <Icon name="Heart" size={20} color="white" />
      </button>
    </div>
  );
};

export default RestaurantHero;