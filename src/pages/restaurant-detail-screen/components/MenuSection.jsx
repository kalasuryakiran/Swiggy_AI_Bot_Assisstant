import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import MenuItemCard from './MenuItemCard';

const MenuSection = ({ restaurant, onAddToCart }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const menuCategories = [
    { id: 'all', name: 'All Items' },
    { id: 'starters', name: 'Starters' },
    { id: 'mains', name: 'Main Course' },
    { id: 'biryani', name: 'Biryani' },
    { id: 'desserts', name: 'Desserts' },
    { id: 'beverages', name: 'Beverages' }
  ];

  const menuItems = [
    {
      id: 1,
      name: "Chicken Biryani",
      description: "Aromatic basmati rice cooked with tender chicken pieces and traditional spices",
      price: 180,
      image: "https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg",
      category: "biryani",
      isVeg: false,
      rating: 4.5,
      isAiSuggested: true,
      preparationTime: "25-30 mins"
    },
    {
      id: 2,
      name: "Paneer Butter Masala",
      description: "Creamy tomato-based curry with soft paneer cubes and aromatic spices",
      price: 160,
      image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg",
      category: "mains",
      isVeg: true,
      rating: 4.3,
      isAiSuggested: false,
      preparationTime: "20-25 mins"
    },
    {
      id: 3,
      name: "Chicken Tikka Starter",
      description: "Marinated chicken pieces grilled to perfection with mint chutney",
      price: 140,
      image: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg",
      category: "starters",
      isVeg: false,
      rating: 4.6,
      isAiSuggested: true,
      preparationTime: "15-20 mins"
    },
    {
      id: 4,
      name: "Mutton Biryani",
      description: "Slow-cooked mutton with fragrant basmati rice and traditional spices",
      price: 220,
      image: "https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg",
      category: "biryani",
      isVeg: false,
      rating: 4.7,
      isAiSuggested: false,
      preparationTime: "35-40 mins"
    },
    {
      id: 5,
      name: "Gulab Jamun",
      description: "Traditional Indian sweet dumplings in sugar syrup",
      price: 80,
      image: "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg",
      category: "desserts",
      isVeg: true,
      rating: 4.4,
      isAiSuggested: false,
      preparationTime: "5-10 mins"
    },
    {
      id: 6,
      name: "Fresh Lime Soda",
      description: "Refreshing lime drink with soda water and mint",
      price: 60,
      image: "https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg",
      category: "beverages",
      isVeg: true,
      rating: 4.2,
      isAiSuggested: false,
      preparationTime: "2-5 mins"
    }
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-4 space-y-4">
      {/* Search Bar */}
      <Input
        type="search"
        placeholder="Search menu items..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full"
      />

      {/* Category Filter */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {menuCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === category.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Menu Items */}
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No items found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default MenuSection;