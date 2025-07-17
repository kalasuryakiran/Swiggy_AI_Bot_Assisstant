import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MenuItemCard = ({ item, onAddToCart }) => {
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = () => {
    setQuantity(prev => prev + 1);
    onAddToCart(item, quantity + 1);
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    onAddToCart(item, newQuantity);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 card-hover">
      <div className="flex space-x-4">
        {/* Item Image */}
        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Item Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-medium text-foreground truncate">{item.name}</h3>
                <div className={`w-3 h-3 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
                {item.isAiSuggested && (
                  <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full">
                    AI Suggested
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={14} color="#FFD700" />
                  <span className="text-sm text-muted-foreground">{item.rating}</span>
                </div>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{item.preparationTime}</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {item.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-foreground">₹{item.price}</span>
            
            {quantity === 0 ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddToCart}
                iconName="Plus"
                iconPosition="left"
                iconSize={16}
              >
                Add
              </Button>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  iconName="Minus"
                  iconSize={16}
                  className="w-8 h-8"
                />
                <span className="text-sm font-medium w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  iconName="Plus"
                  iconSize={16}
                  className="w-8 h-8"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;