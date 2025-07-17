import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const handleSearchFocus = () => {
    navigate('/restaurant-detail-screen', { state: { searchMode: true } });
  };

  const handleVoiceSearch = () => {
    setIsVoiceActive(true);
    // Simulate voice search
    setTimeout(() => {
      setIsVoiceActive(false);
      setSearchQuery('Chicken Biryani');
    }, 2000);
  };

  const popularSearches = [
    "Biryani", "Pizza", "Burger", "Dosa", "Chinese", "Ice Cream"
  ];

  return (
    <div className="px-4 py-4">
      <div className="relative">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search for restaurants, dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleSearchFocus}
            className="pl-12 pr-12 h-12 bg-muted border-0 rounded-xl text-sm"
          />
          
          {/* Search Icon */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <Icon name="Search" size={18} color="var(--color-muted-foreground)" />
          </div>
          
          {/* Voice Search Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleVoiceSearch}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 ${
              isVoiceActive ? 'text-primary' : 'text-muted-foreground'
            }`}
            iconName={isVoiceActive ? "MicOff" : "Mic"}
            iconSize={16}
          />
        </div>
        
        {/* Voice Search Indicator */}
        {isVoiceActive && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-lg shadow-elevated border border-border p-4 z-50">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm text-foreground">Listening...</span>
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        )}
      </div>
      
      {/* Popular Searches */}
      <div className="mt-4">
        <p className="text-xs text-muted-foreground mb-2">Popular searches</p>
        <div className="flex flex-wrap gap-2">
          {popularSearches.map((search, index) => (
            <button
              key={index}
              onClick={() => setSearchQuery(search)}
              className="px-3 py-1.5 bg-muted rounded-full text-xs text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
            >
              {search}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;