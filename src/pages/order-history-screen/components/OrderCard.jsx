import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const OrderCard = ({ order, onReorder, onViewDetails }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-success text-success-foreground';
      case 'cancelled':
        return 'bg-destructive text-destructive-foreground';
      case 'in progress':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-card rounded-xl border border-border p-4 mb-4 card-hover">
      {/* Order Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground text-lg mb-1">
            {order.restaurantName}
          </h3>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Calendar" size={14} />
            <span>{formatDate(order.orderDate)}</span>
            <span>•</span>
            <span>{formatTime(order.orderDate)}</span>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
          {order.status}
        </div>
      </div>

      {/* Order Items Preview */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="flex -space-x-2">
          {order.items.slice(0, 3).map((item, index) => (
            <div key={index} className="w-10 h-10 rounded-lg overflow-hidden border-2 border-card">
              <Image
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {order.items.length > 3 && (
            <div className="w-10 h-10 rounded-lg bg-muted border-2 border-card flex items-center justify-center">
              <span className="text-xs font-medium text-muted-foreground">
                +{order.items.length - 3}
              </span>
            </div>
          )}
        </div>
        <div className="flex-1">
          <p className="text-sm text-foreground font-medium">
            {order.items.length} item{order.items.length > 1 ? 's' : ''}
          </p>
          <p className="text-xs text-muted-foreground">
            {order.items.slice(0, 2).map(item => item.name).join(', ')}
            {order.items.length > 2 && '...'}
          </p>
        </div>
      </div>

      {/* Order Details */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Icon name="MapPin" size={14} />
            <span>{order.deliveryAddress}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-foreground">₹{order.totalAmount}</p>
          {order.discount > 0 && (
            <p className="text-xs text-success">Saved ₹{order.discount}</p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(order)}
          iconName="Eye"
          iconPosition="left"
          iconSize={16}
          className="flex-1"
        >
          View Details
        </Button>
        {order.status.toLowerCase() === 'delivered' && (
          <Button
            variant="default"
            size="sm"
            onClick={() => onReorder(order)}
            iconName="RotateCcw"
            iconPosition="left"
            iconSize={16}
            className="flex-1"
          >
            Reorder
          </Button>
        )}
        {order.status.toLowerCase() === 'in progress' && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onViewDetails(order)}
            iconName="Truck"
            iconPosition="left"
            iconSize={16}
            className="flex-1"
          >
            Track Order
          </Button>
        )}
      </div>
    </div>
  );
};

export default OrderCard;