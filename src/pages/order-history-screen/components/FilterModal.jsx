import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterModal = ({ isOpen, onClose, selectedFilter, onFilterChange }) => {
  const filterOptions = [
    { id: 'all', label: 'All Orders', icon: 'List' },
    { id: 'delivered', label: 'Delivered', icon: 'CheckCircle' },
    { id: 'cancelled', label: 'Cancelled', icon: 'XCircle' },
    { id: 'in-progress', label: 'In Progress', icon: 'Clock' },
    { id: 'last-30-days', label: 'Last 30 Days', icon: 'Calendar' },
    { id: 'last-7-days', label: 'Last 7 Days', icon: 'CalendarDays' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end justify-center">
      <div className="bg-card rounded-t-2xl w-full max-w-md bottom-sheet-enter">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Filter Orders</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
            iconSize={20}
          />
        </div>

        {/* Filter Options */}
        <div className="p-4 space-y-2">
          {filterOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                onFilterChange(option.id);
                onClose();
              }}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                selectedFilter === option.id
                  ? 'bg-primary/10 text-primary border border-primary/20' :'text-foreground hover:bg-muted'
              }`}
            >
              <Icon
                name={option.icon}
                size={20}
                color={selectedFilter === option.id ? 'var(--color-primary)' : 'currentColor'}
              />
              <span className="font-medium">{option.label}</span>
              {selectedFilter === option.id && (
                <Icon name="Check" size={16} color="var(--color-primary)" className="ml-auto" />
              )}
            </button>
          ))}
        </div>

        {/* Reset Button */}
        <div className="p-4 border-t border-border">
          <Button
            variant="outline"
            fullWidth
            onClick={() => {
              onFilterChange('all');
              onClose();
            }}
            iconName="RotateCcw"
            iconPosition="left"
            iconSize={16}
          >
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;