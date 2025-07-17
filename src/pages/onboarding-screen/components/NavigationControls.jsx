import React from 'react';
import Button from '../../../components/ui/Button';

const NavigationControls = ({ 
  currentPage, 
  totalPages, 
  onNext, 
  onSkip, 
  onGetStarted 
}) => {
  const isLastPage = currentPage === totalPages - 1;

  return (
    <div className="flex items-center justify-between w-full px-6 pb-8">
      {/* Skip Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onSkip}
        className="text-muted-foreground"
      >
        Skip
      </Button>

      {/* Next/Get Started Button */}
      {isLastPage ? (
        <Button
          variant="default"
          size="lg"
          onClick={onGetStarted}
          className="flex-1 ml-4"
          iconName="ArrowRight"
          iconPosition="right"
        >
          Get Started
        </Button>
      ) : (
        <Button
          variant="default"
          size="default"
          onClick={onNext}
          iconName="ArrowRight"
          iconPosition="right"
          iconSize={16}
        >
          Next
        </Button>
      )}
    </div>
  );
};

export default NavigationControls;