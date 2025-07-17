import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ filter }) => {
  const navigate = useNavigate();

  const getEmptyStateContent = () => {
    switch (filter) {
      case 'delivered':
        return {
          icon: 'CheckCircle',
          title: 'No Delivered Orders',
          description: 'You haven\'t received any orders yet. Start exploring restaurants!'
        };
      case 'cancelled':
        return {
          icon: 'XCircle',
          title: 'No Cancelled Orders',
          description: 'Great! You haven\'t cancelled any orders.'
        };
      case 'in-progress':
        return {
          icon: 'Clock',
          title: 'No Active Orders',
          description: 'You don\'t have any orders in progress right now.'
        };
      default:
        return {
          icon: 'ShoppingBag',
          title: 'No Orders Yet',
          description: 'Start your food journey by exploring delicious restaurants near you!'
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      {/* Illustration */}
      <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center mb-6">
        <Icon
          name={content.icon}
          size={48}
          color="var(--color-muted-foreground)"
        />
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold text-foreground mb-2">
        {content.title}
      </h3>
      <p className="text-muted-foreground mb-8 max-w-sm leading-relaxed">
        {content.description}
      </p>

      {/* Action Button */}
      <Button
        variant="default"
        size="lg"
        onClick={() => navigate('/main-dashboard')}
        iconName="Search"
        iconPosition="left"
        iconSize={20}
        className="px-8"
      >
        Explore Restaurants
      </Button>

      {/* Secondary Actions */}
      <div className="flex items-center space-x-4 mt-6">
        <button
          onClick={() => navigate('/chat-interface')}
          className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Icon name="MessageCircle" size={16} />
          <span>Ask AI for recommendations</span>
        </button>
      </div>
    </div>
  );
};

export default EmptyState;