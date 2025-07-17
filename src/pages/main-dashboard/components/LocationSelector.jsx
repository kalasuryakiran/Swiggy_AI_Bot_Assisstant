import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LocationSelector = () => {
  const [currentLocation, setCurrentLocation] = useState("Koramangala, Bangalore");
  const [isLocationMenuOpen, setIsLocationMenuOpen] = useState(false);

  const savedLocations = [
    { id: 1, name: "Home", address: "Koramangala, Bangalore", isDefault: true },
    { id: 2, name: "Office", address: "Electronic City, Bangalore", isDefault: false },
    { id: 3, name: "Friend\'s Place", address: "Indiranagar, Bangalore", isDefault: false }
  ];

  const handleLocationSelect = (location) => {
    setCurrentLocation(location.address);
    setIsLocationMenuOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={() => setIsLocationMenuOpen(!isLocationMenuOpen)}
        className="flex items-center space-x-2 px-2"
      >
        <Icon name="MapPin" size={16} color="var(--color-primary)" />
        <div className="text-left">
          <p className="text-xs text-muted-foreground">Deliver to</p>
          <p className="text-sm font-medium text-foreground truncate max-w-32">
            {currentLocation}
          </p>
        </div>
        <Icon name="ChevronDown" size={16} color="var(--color-muted-foreground)" />
      </Button>

      {isLocationMenuOpen && (
        <div className="absolute top-full left-0 mt-2 w-72 bg-card rounded-lg shadow-elevated border border-border z-50">
          <div className="p-4">
            <h3 className="font-medium text-foreground mb-3">Select Location</h3>
            <div className="space-y-2">
              {savedLocations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => handleLocationSelect(location)}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Icon 
                      name={location.name === "Home" ? "Home" : location.name === "Office" ? "Building" : "MapPin"} 
                      size={16} 
                      color="var(--color-muted-foreground)" 
                    />
                    <div className="text-left">
                      <p className="text-sm font-medium text-foreground">{location.name}</p>
                      <p className="text-xs text-muted-foreground">{location.address}</p>
                    </div>
                  </div>
                  {location.isDefault && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      Default
                    </span>
                  )}
                </button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-3"
              iconName="Plus"
              iconPosition="left"
              iconSize={16}
            >
              Add New Address
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;