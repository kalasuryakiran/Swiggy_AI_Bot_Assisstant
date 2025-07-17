import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InfoSection = ({ restaurant }) => {
  const operatingHours = [
    { day: 'Monday', hours: '11:00 AM - 11:00 PM' },
    { day: 'Tuesday', hours: '11:00 AM - 11:00 PM' },
    { day: 'Wednesday', hours: '11:00 AM - 11:00 PM' },
    { day: 'Thursday', hours: '11:00 AM - 11:00 PM' },
    { day: 'Friday', hours: '11:00 AM - 12:00 AM' },
    { day: 'Saturday', hours: '11:00 AM - 12:00 AM' },
    { day: 'Sunday', hours: '11:00 AM - 11:00 PM' }
  ];

  const certifications = [
    { name: 'FSSAI License', number: 'LIC-12345678901234', verified: true },
    { name: 'GST Registration', number: 'GST-29ABCDE1234F1Z5', verified: true },
    { name: 'Fire Safety Certificate', number: 'FSC-2024-001', verified: true }
  ];

  const handleCall = () => {
    window.open(`tel:${restaurant.phone}`, '_self');
  };

  const handleDirections = () => {
    const address = encodeURIComponent(restaurant.address);
    window.open(`https://maps.google.com?q=${address}`, '_blank');
  };

  return (
    <div className="p-4 space-y-6">
      {/* Contact Information */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-medium text-foreground mb-4 flex items-center">
          <Icon name="MapPin" size={20} className="mr-2" />
          Location & Contact
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Icon name="MapPin" size={16} className="mt-1 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm text-foreground">{restaurant.address}</p>
              <p className="text-xs text-muted-foreground mt-1">{restaurant.area}, {restaurant.city}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Icon name="Phone" size={16} className="text-muted-foreground" />
            <span className="text-sm text-foreground">{restaurant.phone}</span>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCall}
              iconName="Phone"
              iconPosition="left"
              iconSize={16}
              className="flex-1"
            >
              Call
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDirections}
              iconName="Navigation"
              iconPosition="left"
              iconSize={16}
              className="flex-1"
            >
              Directions
            </Button>
          </div>
        </div>
      </div>

      {/* Operating Hours */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-medium text-foreground mb-4 flex items-center">
          <Icon name="Clock" size={20} className="mr-2" />
          Operating Hours
        </h3>
        
        <div className="space-y-2">
          {operatingHours.map((schedule, index) => {
            const isToday = new Date().getDay() === (index + 1) % 7;
            return (
              <div key={schedule.day} className={`flex justify-between items-center py-1 ${
                isToday ? 'bg-primary/10 px-2 rounded' : ''
              }`}>
                <span className={`text-sm ${isToday ? 'font-medium text-primary' : 'text-foreground'}`}>
                  {schedule.day}
                </span>
                <span className={`text-sm ${isToday ? 'font-medium text-primary' : 'text-muted-foreground'}`}>
                  {schedule.hours}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Map */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-medium text-foreground mb-4 flex items-center">
          <Icon name="Map" size={20} className="mr-2" />
          Location Map
        </h3>
        
        <div className="w-full h-48 rounded-lg overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title={restaurant.name}
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${restaurant.latitude},${restaurant.longitude}&z=15&output=embed`}
          />
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-medium text-foreground mb-4 flex items-center">
          <Icon name="Shield" size={20} className="mr-2" />
          Certifications & Licenses
        </h3>
        
        <div className="space-y-3">
          {certifications.map((cert, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-foreground">{cert.name}</span>
                  {cert.verified && (
                    <Icon name="CheckCircle" size={16} color="var(--color-success)" />
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{cert.number}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-medium text-foreground mb-4 flex items-center">
          <Icon name="Info" size={20} className="mr-2" />
          Additional Information
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Delivery Fee</span>
            <span className="text-sm text-foreground">₹{restaurant.deliveryFee}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Minimum Order</span>
            <span className="text-sm text-foreground">₹{restaurant.minimumOrder}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Payment Methods</span>
            <div className="flex items-center space-x-2">
              <Icon name="CreditCard" size={16} className="text-muted-foreground" />
              <Icon name="Smartphone" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">Cash, Card, UPI</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Established</span>
            <span className="text-sm text-foreground">{restaurant.established}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;