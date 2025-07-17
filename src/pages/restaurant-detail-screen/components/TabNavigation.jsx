import React from 'react';
import Button from '../../../components/ui/Button';

const TabNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'menu', label: 'Menu', icon: 'UtensilsCrossed' },
    { id: 'reviews', label: 'Reviews', icon: 'MessageSquare' },
    { id: 'info', label: 'Info', icon: 'Info' }
  ];

  return (
    <div className="sticky top-0 z-40 bg-card border-b border-border">
      <div className="flex items-center px-4">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onTabChange(tab.id)}
            iconName={tab.icon}
            iconPosition="left"
            iconSize={16}
            className="flex-1 rounded-none border-b-2 border-transparent data-[active=true]:border-primary"
            data-active={activeTab === tab.id}
          >
            {tab.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;