import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import SplashScreen from "pages/splash-screen";
import OnboardingScreen from "pages/onboarding-screen";
import ChatInterface from "pages/chat-interface";
import OrderHistoryScreen from "pages/order-history-screen";
import MainDashboard from "pages/main-dashboard";
import RestaurantDetailScreen from "pages/restaurant-detail-screen";
import Login from "pages/authentication/Login";
import Signup from "pages/authentication/Signup";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<MainDashboard />} />
        <Route path="/splash-screen" element={<SplashScreen />} />
        <Route path="/onboarding-screen" element={<OnboardingScreen />} />
        <Route path="/chat-interface" element={<ChatInterface />} />
        <Route path="/order-history-screen" element={<OrderHistoryScreen />} />
        <Route path="/main-dashboard" element={<MainDashboard />} />
        <Route path="/restaurant-detail-screen" element={<RestaurantDetailScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;