import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingPage from './components/OnboardingPage';
import PageIndicator from './components/PageIndicator';
import NavigationControls from './components/NavigationControls';

const OnboardingScreen = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef(null);
  const startX = useRef(0);
  const currentX = useRef(0);
  const isDragging = useRef(false);

  const onboardingData = [
    {
      type: 'chatbot',
      title: 'Smart Food Assistant',
      description: `Meet your AI-powered food companion that helps you discover delicious meals within your budget. Just chat naturally and get personalized recommendations.`
    },
    {
      type: 'budget',
      title: 'Budget-Based Planning',
      description: `Simply tell us your budget like "I have ₹200" and we'll find the perfect meal options that fit your spending limit perfectly.`
    },
    {
      type: 'recommendations',title: 'Best Value Recommendations',
      description: `Get curated food suggestions sorted by best value, ratings, and delivery time. Discover great meals without breaking the bank.`
    }
  ];

  // Check if onboarding was already completed
  useEffect(() => {
    const onboardingCompleted = localStorage.getItem('onboarding_completed');
    if (onboardingCompleted === 'true') {
      navigate('/main-dashboard', { replace: true });
    }
  }, [navigate]);

  // Auto-advance hint after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPage < onboardingData.length - 1) {
        // Show subtle hint animation
        const container = containerRef.current;
        if (container) {
          container.style.transform = `translateX(${-currentPage * 100 - 2}%)`;
          setTimeout(() => {
            container.style.transform = `translateX(${-currentPage * 100}%)`;
          }, 200);
        }
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentPage, onboardingData.length]);

  const handleNext = () => {
    if (currentPage < onboardingData.length - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentPage(prev => prev + 1);
      
      // Haptic feedback simulation
      if (navigator.vibrate) {
        navigator.vibrate(10);
      }
      
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  const handleSkip = () => {
    localStorage.setItem('onboarding_completed', 'true');
    navigate('/main-dashboard', { replace: true });
  };

  const handleGetStarted = () => {
    localStorage.setItem('onboarding_completed', 'true');
    navigate('/main-dashboard', { replace: true });
  };

  // Touch event handlers for swipe gestures
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    
    currentX.current = e.touches[0].clientX;
    const diffX = startX.current - currentX.current;
    const container = containerRef.current;
    
    if (container && Math.abs(diffX) > 10) {
      const translateX = -currentPage * 100 - (diffX / window.innerWidth) * 100;
      container.style.transform = `translateX(${translateX}%)`;
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    
    const diffX = startX.current - currentX.current;
    const threshold = window.innerWidth * 0.2; // 20% of screen width
    
    if (Math.abs(diffX) > threshold) {
      if (diffX > 0 && currentPage < onboardingData.length - 1) {
        // Swipe left - next page
        handleNext();
      } else if (diffX < 0 && currentPage > 0) {
        // Swipe right - previous page
        setCurrentPage(prev => prev - 1);
      }
    }
    
    // Reset container position
    const container = containerRef.current;
    if (container) {
      container.style.transform = `translateX(${-currentPage * 100}%)`;
    }
    
    isDragging.current = false;
  };

  // Mouse event handlers for desktop
  const handleMouseDown = (e) => {
    startX.current = e.clientX;
    isDragging.current = true;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    
    currentX.current = e.clientX;
    const diffX = startX.current - currentX.current;
    const container = containerRef.current;
    
    if (container && Math.abs(diffX) > 10) {
      const translateX = -currentPage * 100 - (diffX / window.innerWidth) * 100;
      container.style.transform = `translateX(${translateX}%)`;
    }
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    
    const diffX = startX.current - currentX.current;
    const threshold = window.innerWidth * 0.2;
    
    if (Math.abs(diffX) > threshold) {
      if (diffX > 0 && currentPage < onboardingData.length - 1) {
        handleNext();
      } else if (diffX < 0 && currentPage > 0) {
        setCurrentPage(prev => prev - 1);
      }
    }
    
    const container = containerRef.current;
    if (container) {
      container.style.transform = `translateX(${-currentPage * 100}%)`;
    }
    
    isDragging.current = false;
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-background via-muted/20 to-primary/5 overflow-hidden">
      {/* Pages Container */}
      <div 
        className="h-full overflow-hidden cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          ref={containerRef}
          className="flex h-full transition-transform duration-300 ease-out"
          style={{ 
            transform: `translateX(${-currentPage * 100}%)`,
            width: `${onboardingData.length * 100}%`
          }}
        >
          {onboardingData.map((pageData, index) => (
            <OnboardingPage
              key={index}
              pageData={pageData}
              isActive={index === currentPage}
            />
          ))}
        </div>
      </div>

      {/* Bottom Navigation Area */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/95 to-transparent backdrop-blur-sm">
        <div className="flex flex-col items-center space-y-6 py-6">
          {/* Page Indicators */}
          <PageIndicator 
            totalPages={onboardingData.length} 
            currentPage={currentPage} 
          />
          
          {/* Navigation Controls */}
          <NavigationControls
            currentPage={currentPage}
            totalPages={onboardingData.length}
            onNext={handleNext}
            onSkip={handleSkip}
            onGetStarted={handleGetStarted}
          />
        </div>
      </div>

      {/* Accessibility: Reduced motion alternative */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          .transition-transform {
            transition: none !important;
          }
          .animate-bounce,
          .animate-pulse,
          .animate-slide-up {
            animation: none !important;
          }
        }
        
        .animate-slide-up {
          animation: slideUp 0.6s ease-out forwards;
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default OnboardingScreen;