import React from 'react';
import RecommendationCard from './RecommendationCard';

const RecommendationList = ({ recommendations, onOrderNow }) => {
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <div className="mb-4">
      <div className="flex items-center space-x-2 mb-3 px-1">
        <span className="text-sm font-medium text-muted-foreground">
          {recommendations.length} suggestions found
        </span>
        <div className="h-1 w-1 bg-muted-foreground rounded-full"></div>
        <span className="text-sm text-muted-foreground">
          Sorted by best value
        </span>
      </div>
      
      <div className="flex overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex space-x-0">
          {recommendations.map((recommendation) => (
            <RecommendationCard
              key={recommendation.id}
              recommendation={recommendation}
              onOrderNow={onOrderNow}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendationList;