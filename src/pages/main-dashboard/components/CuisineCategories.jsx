import React from 'react';
import Image from '../../../components/AppImage';

const CuisineCategories = () => {
  const cuisineCategories = [
    {
      id: 1,
      name: "North Indian",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
      color: "#FF6B35"
    },
    {
      id: 2,
      name: "South Indian",
      image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg",
      color: "#2E8B57"
    },
    {
      id: 3,
      name: "Chinese",
      image: "https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg",
      color: "#FFD700"
    },
    {
      id: 4,
      name: "Italian",
      image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg",
      color: "#DC3545"
    },
    {
      id: 5,
      name: "Fast Food",
      image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg",
      color: "#FFC107"
    },
    {
      id: 6,
      name: "Desserts",
      image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg",
      color: "#E91E63"
    },
    {
      id: 7,
      name: "Beverages",
      image: "https://images.pexels.com/photos/544961/pexels-photo-544961.jpeg",
      color: "#9C27B0"
    },
    {
      id: 8,
      name: "Healthy",
      image: "https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg",
      color: "#4CAF50"
    }
  ];

  const handleCategoryClick = (category) => {
    // Navigate to restaurant list with category filter
    console.log('Category selected:', category.name);
  };

  return (
    <div className="py-6">
      <div className="px-4 mb-4">
        <h2 className="text-xl font-semibold text-foreground">What's on your mind?</h2>
      </div>

      <div className="grid grid-cols-4 gap-4 px-4">
        {cuisineCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category)}
            className="flex flex-col items-center space-y-2 p-3 rounded-xl hover:bg-muted/50 transition-colors"
          >
            <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-card">
              <Image
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
                style={{ backgroundColor: `${category.color}20` }}
              />
            </div>
            <span className="text-xs font-medium text-foreground text-center leading-tight">
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CuisineCategories;