import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FloatingCartButton = ({ cartItems, totalAmount }) => {
  const navigate = useNavigate();

  if (cartItems.length === 0) return null;

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleViewCart = () => {
    // Navigate to cart or checkout page
    navigate('/order-history-screen');
  };

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 bottom-sheet-enter">
      <Button
        onClick={handleViewCart}
        className="w-full h-14 bg-primary text-primary-foreground shadow-floating rounded-xl flex items-center justify-between px-6"
        size="lg"
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
            <Icon name="ShoppingCart" size={18} color="white" />
          </div>
          <div className="text-left">
            <span className="text-sm font-medium">View Cart</span>
            <div className="text-xs opacity-90">
              {totalItems} item{totalItems > 1 ? 's' : ''}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold">₹{totalAmount}</span>
          <Icon name="ChevronRight" size={20} color="white" />
        </div>
      </Button>
    </div>
  );
};

export default FloatingCartButton;