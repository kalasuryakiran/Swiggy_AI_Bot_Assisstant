import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReviewsSection = ({ restaurant }) => {
  const [sortBy, setSortBy] = useState('recent');

  const reviews = [
    {
      id: 1,
      userName: "Priya Sharma",
      userAvatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
      rating: 5,
      date: "2025-01-15",
      comment: "Amazing biryani! The chicken was perfectly cooked and the rice was aromatic. Delivery was quick too.",
      images: ["https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg"],
      helpful: 12,
      notHelpful: 1,
      orderItems: ["Chicken Biryani", "Raita"]
    },
    {
      id: 2,
      userName: "Rahul Kumar",
      userAvatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
      rating: 4,
      date: "2025-01-14",
      comment: "Good food quality but delivery took longer than expected. The paneer butter masala was delicious though.",
      images: [],
      helpful: 8,
      notHelpful: 2,
      orderItems: ["Paneer Butter Masala", "Naan"]
    },
    {
      id: 3,
      userName: "Anjali Patel",
      userAvatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg",
      rating: 5,
      date: "2025-01-13",
      comment: "Excellent service and food quality. The chicken tikka starter was perfectly spiced. Will order again!",
      images: ["https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg"],
      helpful: 15,
      notHelpful: 0,
      orderItems: ["Chicken Tikka Starter", "Mint Chutney"]
    },
    {
      id: 4,
      userName: "Vikram Singh",
      userAvatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg",
      rating: 3,
      date: "2025-01-12",
      comment: "Average experience. Food was okay but not exceptional. Packaging could be better.",
      images: [],
      helpful: 5,
      notHelpful: 3,
      orderItems: ["Mutton Biryani"]
    }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'helpful', label: 'Most Helpful' },
    { value: 'rating', label: 'Highest Rating' }
  ];

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case 'helpful':
        return b.helpful - a.helpful;
      case 'rating':
        return b.rating - a.rating;
      default:
        return new Date(b.date) - new Date(a.date);
    }
  });

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        color={index < rating ? "#FFD700" : "#E5E5E5"}
      />
    ));
  };

  return (
    <div className="p-4 space-y-6">
      {/* Rating Summary */}
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-3xl font-bold text-foreground">{restaurant.rating}</span>
            <div className="flex space-x-1">
              {renderStars(Math.floor(restaurant.rating))}
            </div>
          </div>
          <span className="text-sm text-muted-foreground">{restaurant.reviewCount} reviews</span>
        </div>
        
        {/* Rating Distribution */}
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center space-x-2">
              <span className="text-sm w-2">{star}</span>
              <Icon name="Star" size={12} color="#FFD700" />
              <div className="flex-1 bg-border rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${Math.random() * 80 + 10}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground w-8">
                {Math.floor(Math.random() * 50 + 10)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-foreground">Reviews</h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="text-sm bg-muted border border-border rounded-md px-3 py-1"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {sortedReviews.map((review) => (
          <div key={review.id} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={review.userAvatar}
                  alt={review.userName}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-foreground">{review.userName}</h4>
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                {review.orderItems.length > 0 && (
                  <div className="mb-2">
                    <span className="text-xs text-muted-foreground">Ordered: </span>
                    <span className="text-xs text-foreground">
                      {review.orderItems.join(', ')}
                    </span>
                  </div>
                )}
                
                <p className="text-sm text-foreground mb-3">{review.comment}</p>
                
                {review.images.length > 0 && (
                  <div className="flex space-x-2 mb-3">
                    {review.images.map((image, index) => (
                      <div key={index} className="w-16 h-16 rounded-lg overflow-hidden">
                        <Image
                          src={image}
                          alt={`Review image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="ThumbsUp"
                    iconPosition="left"
                    iconSize={14}
                    className="text-xs"
                  >
                    Helpful ({review.helpful})
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="ThumbsDown"
                    iconPosition="left"
                    iconSize={14}
                    className="text-xs"
                  >
                    Not Helpful ({review.notHelpful})
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;