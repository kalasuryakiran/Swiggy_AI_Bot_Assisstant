import React from 'react';

const PageIndicator = ({ totalPages, currentPage }) => {
  return (
    <div className="flex items-center justify-center space-x-2">
      {Array.from({ length: totalPages }).map((_, index) => (
        <div
          key={index}
          className={`transition-all duration-300 rounded-full ${
            index === currentPage
              ? 'w-8 h-2 bg-primary' :'w-2 h-2 bg-muted-foreground/30'
          }`}
        />
      ))}
    </div>
  );
};

export default PageIndicator;