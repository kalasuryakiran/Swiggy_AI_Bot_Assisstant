import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLogo from './components/AppLogo';
import LoadingIndicator from './components/LoadingIndicator';
import RetryModal from './components/RetryModal';
import UpdateModal from './components/UpdateModal';

const SplashScreen = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [showRetryModal, setShowRetryModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [initializationStep, setInitializationStep] = useState('Connecting...');

  // Mock user authentication status
  const mockUserData = {
    isAuthenticated: false,
    isFirstTime: true,
    hasCompletedOnboarding: false
  };

  // Mock update information
  const mockUpdateInfo = {
    version: "2.1.0",
    size: "12.5 MB",
    description: "Enhanced AI recommendations and improved restaurant search",
    required: false
  };

  // Initialization steps
  const initSteps = [
    { step: 'Connecting to servers...', duration: 800 },
    { step: 'Loading user preferences...', duration: 600 },
    { step: 'Initializing AI assistant...', duration: 700 },
    { step: 'Preparing restaurant data...', duration: 900 },
    { step: 'Almost ready...', duration: 500 }
  ];

  useEffect(() => {
    // Check for app updates first
    const checkForUpdates = () => {
      // Simulate update check
      const hasUpdate = Math.random() > 0.7; // 30% chance of update
      if (hasUpdate) {
        setShowUpdateModal(true);
        return;
      }
      startInitialization();
    };

    // Start initialization process
    const startInitialization = () => {
      let currentStep = 0;
      let currentProgress = 0;

      const processStep = () => {
        if (currentStep < initSteps.length) {
          setInitializationStep(initSteps[currentStep].step);
          
          const stepProgress = (currentStep + 1) / initSteps.length * 100;
          const progressInterval = setInterval(() => {
            currentProgress += 2;
            setProgress(Math.min(currentProgress, stepProgress));
            
            if (currentProgress >= stepProgress) {
              clearInterval(progressInterval);
              currentStep++;
              
              setTimeout(() => {
                processStep();
              }, initSteps[currentStep - 1]?.duration || 500);
            }
          }, 50);
        } else {
          // Initialization complete
          setTimeout(() => {
            handleNavigationLogic();
          }, 500);
        }
      };

      processStep();
    };

    // Handle navigation after initialization
    const handleNavigationLogic = () => {
      setIsLoading(false);
      
      // Simulate network timeout (5% chance)
      const hasNetworkTimeout = Math.random() < 0.05;
      if (hasNetworkTimeout) {
        setShowRetryModal(true);
        return;
      }

      // Navigation logic based on user status
      if (mockUserData.isAuthenticated) {
        navigate('/main-dashboard');
      } else if (mockUserData.isFirstTime || !mockUserData.hasCompletedOnboarding) {
        navigate('/onboarding-screen');
      } else {
        navigate('/main-dashboard');
      }
    };

    // Start the process
    const timer = setTimeout(checkForUpdates, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleRetry = () => {
    setShowRetryModal(false);
    setProgress(0);
    setIsLoading(true);
    setInitializationStep('Reconnecting...');
    
    // Restart initialization
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const handleSkipOffline = () => {
    setShowRetryModal(false);
    navigate('/main-dashboard');
  };

  const handleUpdate = () => {
    setShowUpdateModal(false);
    // Simulate update process
    setInitializationStep('Downloading update...');
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const handleUpdateLater = () => {
    setShowUpdateModal(false);
    // Continue with normal initialization
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary via-primary/90 to-secondary overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-white rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-white rounded-full blur-xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 safe-top safe-bottom">
        {/* Logo Section */}
        <div className="flex-1 flex items-center justify-center">
          <AppLogo isAnimating={isLoading} />
        </div>

        {/* Loading Section */}
        {isLoading && (
          <div className="mb-16">
            <LoadingIndicator progress={progress} />
            <p className="text-white/70 text-xs text-center mt-4">
              {initializationStep}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-white/60 text-xs">
          <p>© {new Date().getFullYear()} FoodPlannerBot</p>
          <p className="mt-1">Version 2.0.1</p>
        </div>
      </div>

      {/* Modals */}
      <RetryModal
        isVisible={showRetryModal}
        onRetry={handleRetry}
        onSkip={handleSkipOffline}
      />

      <UpdateModal
        isVisible={showUpdateModal}
        updateInfo={mockUpdateInfo}
        onUpdate={handleUpdate}
        onLater={handleUpdateLater}
      />
    </div>
  );
};

export default SplashScreen;