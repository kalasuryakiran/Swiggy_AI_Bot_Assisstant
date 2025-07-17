import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const OrderDetailsModal = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'text-success';
      case 'cancelled':
        return 'text-destructive';
      case 'in progress':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Order Details</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
            iconSize={20}
          />
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Restaurant Info */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden">
                <Image
                  src={order.restaurantImage}
                  alt={order.restaurantName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{order.restaurantName}</h4>
                <p className="text-sm text-muted-foreground">{order.restaurantAddress}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} color="var(--color-muted-foreground)" />
                <span className="text-sm text-muted-foreground">{formatDate(order.orderDate)}</span>
              </div>
              <div className={`text-sm font-medium ${getStatusColor(order.status)}`}>
                {order.status}
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="p-4 border-b border-border">
            <h5 className="font-medium text-foreground mb-3">Order Items</h5>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium text-foreground">₹{item.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Address */}
          <div className="p-4 border-b border-border">
            <h5 className="font-medium text-foreground mb-2">Delivery Address</h5>
            <div className="flex items-start space-x-2">
              <Icon name="MapPin" size={16} color="var(--color-muted-foreground)" className="mt-1" />
              <p className="text-sm text-muted-foreground">{order.fullAddress}</p>
            </div>
          </div>

          {/* Bill Details */}
          <div className="p-4 border-b border-border">
            <h5 className="font-medium text-foreground mb-3">Bill Details</h5>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Item Total</span>
                <span className="text-foreground">₹{order.itemTotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span className="text-foreground">₹{order.deliveryFee}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Taxes & Charges</span>
                <span className="text-foreground">₹{order.taxes}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="text-success">-₹{order.discount}</span>
                </div>
              )}
              <div className="border-t border-border pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span className="text-foreground">Total Paid</span>
                  <span className="text-foreground">₹{order.totalAmount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="p-4">
            <h5 className="font-medium text-foreground mb-2">Payment Method</h5>
            <div className="flex items-center space-x-2">
              <Icon name="CreditCard" size={16} color="var(--color-muted-foreground)" />
              <span className="text-sm text-muted-foreground">{order.paymentMethod}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 border-t border-border">
          <div className="flex space-x-3">
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
              iconSize={16}
              className="flex-1"
            >
              Receipt
            </Button>
            {order.status.toLowerCase() === 'delivered' && (
              <Button
                variant="default"
                size="sm"
                iconName="RotateCcw"
                iconPosition="left"
                iconSize={16}
                className="flex-1"
              >
                Reorder
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;