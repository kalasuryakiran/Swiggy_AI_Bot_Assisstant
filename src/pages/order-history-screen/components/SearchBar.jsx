import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ onSearch, placeholder = "Search orders..." }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (value) => {
    setSearchValue(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchValue('');
    onSearch('');
  };

  return (
    <div className="relative mb-4">
      <div className="relative">
        <Icon
          name="Search"
          size={20}
          color="var(--color-muted-foreground)"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10"
        />
        <Input
          type="search"
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 pr-10 bg-muted border-0 focus:bg-card focus:ring-2 focus:ring-primary"
        />
        {searchValue && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-muted-foreground/10 rounded-full transition-colors"
          >
            <Icon
              name="X"
              size={16}
              color="var(--color-muted-foreground)"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;