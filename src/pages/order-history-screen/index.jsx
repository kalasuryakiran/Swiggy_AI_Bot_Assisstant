import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BottomTabNavigator from '../../components/ui/BottomTabNavigator';
import FloatingChatWidget from '../../components/ui/FloatingChatWidget';

import Button from '../../components/ui/Button';
import OrderCard from './components/OrderCard';
import FilterModal from './components/FilterModal';
import OrderDetailsModal from './components/OrderDetailsModal';
import EmptyState from './components/EmptyState';
import SearchBar from './components/SearchBar';

const OrderHistoryScreen = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock order data
  const mockOrders = [
    {
      id: 'ORD001',
      restaurantName: 'Spice Garden',
      restaurantImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400',
      restaurantAddress: 'MG Road, Bangalore',
      orderDate: new Date('2025-01-16T19:30:00'),
      status: 'Delivered',
      totalAmount: 450,
      itemTotal: 380,
      deliveryFee: 40,
      taxes: 50,
      discount: 20,
      deliveryAddress: 'Home',
      fullAddress: '123 Brigade Road, Bangalore, Karnataka 560001',
      paymentMethod: 'UPI - Google Pay',
      items: [
        {
          name: 'Chicken Biryani',
          image: 'https://images.unsplash.com/photo-1563379091339-03246963d51a?w=400',
          quantity: 1,
          price: 280
        },
        {
          name: 'Raita',
          image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400',
          quantity: 1,
          price: 60
        },
        {
          name: 'Gulab Jamun',
          image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400',
          quantity: 2,
          price: 40
        }
      ]
    },
    {
      id: 'ORD002',
      restaurantName: 'Pizza Corner',
      restaurantImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
      restaurantAddress: 'Koramangala, Bangalore',
      orderDate: new Date('2025-01-15T20:15:00'),
      status: 'Delivered',
      totalAmount: 680,
      itemTotal: 620,
      deliveryFee: 30,
      taxes: 60,
      discount: 30,
      deliveryAddress: 'Office',
      fullAddress: 'Tech Park, Electronic City, Bangalore, Karnataka 560100',
      paymentMethod: 'Credit Card - **** 1234',
      items: [
        {
          name: 'Margherita Pizza (Large)',
          image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400',
          quantity: 1,
          price: 420
        },
        {
          name: 'Garlic Bread',
          image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=400',
          quantity: 1,
          price: 120
        },
        {
          name: 'Coke (500ml)',
          image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400',
          quantity: 2,
          price: 80
        }
      ]
    },
    {
      id: 'ORD003',
      restaurantName: 'Burger Junction',
      restaurantImage: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400',
      restaurantAddress: 'Indiranagar, Bangalore',
      orderDate: new Date('2025-01-14T13:45:00'),
      status: 'In Progress',
      totalAmount: 320,
      itemTotal: 280,
      deliveryFee: 25,
      taxes: 35,
      discount: 20,
      deliveryAddress: 'Home',
      fullAddress: '123 Brigade Road, Bangalore, Karnataka 560001',
      paymentMethod: 'Cash on Delivery',
      items: [
        {
          name: 'Classic Burger',
          image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
          quantity: 2,
          price: 200
        },
        {
          name: 'French Fries',
          image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400',
          quantity: 1,
          price: 80
        }
      ]
    },
    {
      id: 'ORD004',
      restaurantName: 'Dosa Palace',
      restaurantImage: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400',
      restaurantAddress: 'Jayanagar, Bangalore',
      orderDate: new Date('2025-01-13T12:30:00'),
      status: 'Cancelled',
      totalAmount: 180,
      itemTotal: 160,
      deliveryFee: 20,
      taxes: 20,
      discount: 20,
      deliveryAddress: 'Home',
      fullAddress: '123 Brigade Road, Bangalore, Karnataka 560001',
      paymentMethod: 'UPI - PhonePe',
      items: [
        {
          name: 'Masala Dosa',
          image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400',
          quantity: 1,
          price: 120
        },
        {
          name: 'Filter Coffee',
          image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400',
          quantity: 2,
          price: 40
        }
      ]
    },
    {
      id: 'ORD005',
      restaurantName: 'Chinese Express',
      restaurantImage: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400',
      restaurantAddress: 'BTM Layout, Bangalore',
      orderDate: new Date('2025-01-12T19:00:00'),
      status: 'Delivered',
      totalAmount: 520,
      itemTotal: 460,
      deliveryFee: 35,
      taxes: 45,
      discount: 20,
      deliveryAddress: 'Home',
      fullAddress: '123 Brigade Road, Bangalore, Karnataka 560001',
      paymentMethod: 'Debit Card - **** 5678',
      items: [
        {
          name: 'Chicken Fried Rice',
          image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400',
          quantity: 1,
          price: 220
        },
        {
          name: 'Chicken Manchurian',
          image: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=400',
          quantity: 1,
          price: 180
        },
        {
          name: 'Veg Spring Rolls',
          image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400',
          quantity: 1,
          price: 60
        }
      ]
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setOrders(mockOrders);
      setFilteredOrders(mockOrders);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterOrders();
  }, [selectedFilter, searchQuery, orders]);

  const filterOrders = () => {
    let filtered = [...orders];

    // Apply status filter
    if (selectedFilter !== 'all') {
      if (selectedFilter === 'last-30-days') {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        filtered = filtered.filter(order => new Date(order.orderDate) >= thirtyDaysAgo);
      } else if (selectedFilter === 'last-7-days') {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        filtered = filtered.filter(order => new Date(order.orderDate) >= sevenDaysAgo);
      } else {
        filtered = filtered.filter(order => 
          order.status.toLowerCase().replace(' ', '-') === selectedFilter
        );
      }
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(order =>
        order.restaurantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items.some(item => 
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    setFilteredOrders(filtered);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false);
      // Haptic feedback simulation
      if (navigator.vibrate) {
        navigator.vibrate(10);
      }
    }, 1000);
  };

  const handleReorder = (order) => {
    // Simulate reorder process
    alert(`Reordering from ${order.restaurantName}...`);
    navigate('/restaurant-detail-screen');
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const getFilterLabel = () => {
    switch (selectedFilter) {
      case 'delivered':
        return 'Delivered Orders';
      case 'cancelled':
        return 'Cancelled Orders';
      case 'in-progress':
        return 'Active Orders';
      case 'last-30-days':
        return 'Last 30 Days';
      case 'last-7-days':
        return 'Last 7 Days';
      default:
        return 'All Orders';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20 pb-20 px-4">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-xl p-4 shimmer h-32" />
            ))}
          </div>
        </div>
        <BottomTabNavigator />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-20 pb-20 px-4">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Your Orders</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {getFilterLabel()} • {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsFilterModalOpen(true)}
            iconName="Filter"
            iconSize={20}
          />
        </div>

        {/* Search Bar */}
        <SearchBar
          onSearch={setSearchQuery}
          placeholder="Search by restaurant or dish..."
        />

        {/* Filter Chips */}
        <div className="flex items-center space-x-2 mb-6 overflow-x-auto pb-2">
          {['all', 'delivered', 'in-progress', 'cancelled'].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedFilter === filter
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {filter === 'all' ? 'All' : 
               filter === 'in-progress' ? 'Active' :
               filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        {/* Pull to Refresh Indicator */}
        {isRefreshing && (
          <div className="flex items-center justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <span className="ml-2 text-sm text-muted-foreground">Refreshing...</span>
          </div>
        )}

        {/* Orders List */}
        {filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onReorder={handleReorder}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        ) : (
          <EmptyState filter={selectedFilter} />
        )}

        {/* Refresh Button */}
        {filteredOrders.length > 0 && (
          <div className="flex justify-center mt-8">
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={isRefreshing}
              iconName="RotateCcw"
              iconPosition="left"
              iconSize={16}
            >
              {isRefreshing ? 'Refreshing...' : 'Refresh Orders'}
            </Button>
          </div>
        )}
      </div>

      {/* Modals */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
      />

      <OrderDetailsModal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        order={selectedOrder}
      />

      <BottomTabNavigator />
      <FloatingChatWidget />
    </div>
  );
};

export default OrderHistoryScreen;