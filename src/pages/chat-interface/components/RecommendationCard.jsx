import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendationCard = ({ recommendation, onOrderNow }) => {
  const handleOrderClick = () => {
    onOrderNow?.(recommendation);
  };

  return (
    <div className="bg-card rounded-xl p-4 border border-border shadow-sm recommendation-card-enter">
      <div className="flex items-start space-x-4">
        {/* Dish Image */}
        <div className="relative">
          <img
            src={recommendation?.image || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400'}
            alt={recommendation?.dishName || 'Dish'}
            className="w-20 h-20 rounded-lg object-cover"
          />
          {recommendation?.isBestValue && (
            <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              Best Value
            </div>
          )}
        </div>

        {/* Dish Details */}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground text-lg">
              {recommendation?.dishName}
            </h3>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} className="text-yellow-500" />
              <span className="text-sm text-muted-foreground">
                {recommendation?.rating?.toFixed(1)}
              </span>
            </div>
          </div>
          
          <p className="text-muted-foreground text-sm mt-1">
            {recommendation?.restaurantName}
          </p>

          {/* Price and Delivery Time */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-3">
              <span className="text-xl font-bold text-foreground">
                ₹{recommendation?.price}
              </span>
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Icon name="Clock" size={14} />
                <span className="text-sm">{recommendation?.deliveryTime}</span>
              </div>
            </div>
          </div>

          {/* Order Button */}
          <Button
            onClick={handleOrderClick}
            className="w-full mt-3"
            size="sm"
          >
            Order Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;