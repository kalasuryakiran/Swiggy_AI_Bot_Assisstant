import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const NearbyRestaurants = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(new Set());

  const nearbyRestaurants = [
    {
      id: 1,
      name: "Maharaja Restaurant",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
      rating: 4.4,
      deliveryTime: "30-35 min",
      cuisine: "North Indian, Mughlai",
      distance: "1.2 km",
      deliveryFee: "₹25",
      averageCost: "₹300 for two",
      isPromoted: true,
      offers: ["50% OFF up to ₹100", "Free Delivery"]
    },
    {
      id: 2,
      name: "Cafe Mocha",
      image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg",
      rating: 4.2,
      deliveryTime: "20-25 min",
      cuisine: "Cafe, Continental",
      distance: "0.8 km",
      deliveryFee: "Free",
      averageCost: "₹250 for two",
      isPromoted: false,
      offers: ["Buy 2 Get 1 Free on Beverages"]
    },
    {
      id: 3,
      name: "Biryani House",
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg",
      rating: 4.6,
      deliveryTime: "35-40 min",
      cuisine: "Biryani, South Indian",
      distance: "2.1 km",
      deliveryFee: "₹30",
      averageCost: "₹400 for two",
      isPromoted: false,
      offers: ["₹75 OFF above ₹299"]
    },
    {
      id: 4,
      name: "Pizza Express",
      image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg",
      rating: 4.1,
      deliveryTime: "25-30 min",
      cuisine: "Italian, Pizza",
      distance: "1.5 km",
      deliveryFee: "₹20",
      averageCost: "₹350 for two",
      isPromoted: true,
      offers: ["Buy 1 Get 1 Free on Large Pizza"]
    },
    {
      id: 5,
      name: "Healthy Bites",
      image: "https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg",
      rating: 4.3,
      deliveryTime: "20-25 min",
      cuisine: "Healthy, Salads",
      distance: "1.0 km",
      deliveryFee: "Free",
      averageCost: "₹200 for two",
      isPromoted: false,
      offers: ["20% OFF on all items"]
    }
  ];

  const handleRestaurantClick = (restaurant) => {
    navigate('/restaurant-detail-screen', { state: { restaurant } });
  };

  const toggleFavorite = (restaurantId, event) => {
    event.stopPropagation();
    const newFavorites = new Set(favorites);
    if (newFavorites.has(restaurantId)) {
      newFavorites.delete(restaurantId);
    } else {
      newFavorites.add(restaurantId);
    }
    setFavorites(newFavorites);
  };

  return (
    <div className="py-6">
      <div className="px-4 mb-4">
        <h2 className="text-xl font-semibold text-foreground">Restaurants near you</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {nearbyRestaurants.length} restaurants delivering to your location
        </p>
      </div>

      <div className="space-y-4 px-4">
        {nearbyRestaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            onClick={() => handleRestaurantClick(restaurant)}
            className="bg-card rounded-xl shadow-card border border-border cursor-pointer card-hover"
          >
            <div className="relative">
              <Image
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              
              {/* Promoted Badge */}
              {restaurant.isPromoted && (
                <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-medium">
                  PROMOTED
                </div>
              )}
              
              {/* Rating Badge */}
              <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded flex items-center space-x-1">
                <Icon name="Star" size={12} color="gold" />
                <span className="text-xs font-medium">{restaurant.rating}</span>
              </div>
              
              {/* Favorite Button */}
              <button
                onClick={(e) => toggleFavorite(restaurant.id, e)}
                className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
              >
                <Icon
                  name={favorites.has(restaurant.id) ? "Heart" : "Heart"}
                  size={16}
                  color={favorites.has(restaurant.id) ? "var(--color-error)" : "var(--color-muted-foreground)"}
                  strokeWidth={favorites.has(restaurant.id) ? 0 : 2}
                />
              </button>
            </div>
            
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-lg mb-1">
                    {restaurant.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {restaurant.cuisine}
                  </p>
                </div>
              </div>
              
              {/* Offers */}
              {restaurant.offers.length > 0 && (
                <div className="mb-3">
                  <div className="flex items-center space-x-1 text-primary text-sm">
                    <Icon name="Percent" size={14} />
                    <span className="font-medium">{restaurant.offers[0]}</span>
                  </div>
                  {restaurant.offers.length > 1 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      +{restaurant.offers.length - 1} more offers
                    </p>
                  )}
                </div>
              )}
              
              {/* Restaurant Info */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} />
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={14} />
                    <span>{restaurant.distance}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs">{restaurant.averageCost}</p>
                  <p className="text-xs">
                    {restaurant.deliveryFee === "Free" ? (
                      <span className="text-success font-medium">Free Delivery</span>
                    ) : (
                      <span>Delivery {restaurant.deliveryFee}</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyRestaurants;