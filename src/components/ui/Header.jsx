import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
  { path: '/main-dashboard', label: 'Home', icon: 'Home' },
  { path: '/chat-interface', label: 'Chat', icon: 'MessageCircle' },
  { path: '/restaurant-detail-screen', label: 'Restaurants', icon: 'Store' },
  { path: '/order-history-screen', label: 'Orders', icon: 'Clock' }];


  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const currentPage = navigationItems.find((item) => item.path === location.pathname);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border safe-top">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="UtensilsCrossed" size={20} color="white" />
          </div>
          <span className="text-xl font-inter font-semibold text-[rgba(26,26,26,1)]">SWIGGY

          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems.map((item) =>
          <Button
            key={item.path}
            variant={location.pathname === item.path ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleNavigation(item.path)}
            iconName={item.icon}
            iconPosition="left"
            iconSize={16}
            className="text-sm">

              {item.label}
            </Button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMenu}
          className="md:hidden"
          iconName={isMenuOpen ? 'X' : 'Menu'}
          iconSize={20} />

      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen &&
      <div className="md:hidden bg-card border-t border-border animate-slide-up">
          <nav className="px-4 py-2 space-y-1">
            {navigationItems.map((item) =>
          <Button
            key={item.path}
            variant={location.pathname === item.path ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleNavigation(item.path)}
            iconName={item.icon}
            iconPosition="left"
            iconSize={16}
            fullWidth
            className="justify-start text-sm">

                {item.label}
              </Button>
          )}
          </nav>
        </div>
      }

      {/* Page Title for Mobile */}
      {currentPage &&
      <div className="md:hidden px-4 py-2 bg-muted/50 border-t border-border">
          <div className="flex items-center space-x-2">
            <Icon name={currentPage.icon} size={16} color="var(--color-muted-foreground)" />
            <span className="text-sm font-medium text-muted-foreground">
              {currentPage.label}
            </span>
          </div>
        </div>
      }
    </header>);

};

export default Header;