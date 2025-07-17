import { supabase } from './supabase';

const foodService = {
  // Search dishes by budget
  searchByBudget: async (budgetAmount) => {
    try {
      // Convert rupees to paise (multiply by 100)
      const budgetInPaise = Math.floor(budgetAmount * 100);
      
      const { data, error } = await supabase.rpc('search_dishes_by_budget', {
        budget_amount: budgetInPaise
      });

      if (error) {
        return { success: false, error: error.message, data: [] };
      }

      // Convert response format
      const formattedData = data?.map(item => ({
        id: item.dish_id,
        dishName: item.dish_name,
        restaurantName: item.restaurant_name,
        price: Math.floor(item.price / 100), // Convert paise to rupees
        deliveryTime: item.delivery_time,
        rating: parseFloat(item.rating),
        image: item.image_url || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
        isBestValue: item.is_best_value
      })) || [];

      return { success: true, data: formattedData };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.',
          data: []
        };
      }
      return { success: false, error: 'Failed to search dishes by budget.', data: [] };
    }
  },

  // Search dishes by name with optional price filter
  searchByDish: async (dishName, maxPrice = null) => {
    try {
      const maxPriceInPaise = maxPrice ? Math.floor(maxPrice * 100) : null;
      
      const { data, error } = await supabase.rpc('search_dishes_by_name', {
        dish_query: dishName,
        max_price: maxPriceInPaise
      });

      if (error) {
        return { success: false, error: error.message, data: [] };
      }

      // Convert response format
      const formattedData = data?.map(item => ({
        id: item.dish_id,
        dishName: item.dish_name,
        restaurantName: item.restaurant_name,
        price: Math.floor(item.price / 100), // Convert paise to rupees
        deliveryTime: item.delivery_time,
        rating: parseFloat(item.rating),
        image: item.image_url || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
        isBestValue: item.is_best_value
      })) || [];

      return { success: true, data: formattedData };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.',
          data: []
        };
      }
      return { success: false, error: 'Failed to search dishes by name.', data: [] };
    }
  },

  // Log user search query
  logSearch: async (query, budget = null, dishName = null) => {
    try {
      const budgetInPaise = budget ? Math.floor(budget * 100) : null;
      
      const { data, error } = await supabase.rpc('log_user_search', {
        query_text: query,
        budget_amount: budgetInPaise,
        dish_query: dishName
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Failed to log search query.' };
    }
  },

  // Get all restaurants
  getAllRestaurants: async () => {
    try {
      const { data, error } = await supabase
        .from('restaurants')
        .select('*')
        .eq('is_active', true)
        .order('rating', { ascending: false });

      if (error) {
        return { success: false, error: error.message, data: [] };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      return { success: false, error: 'Failed to get restaurants.', data: [] };
    }
  },

  // Get dishes by restaurant
  getDishesByRestaurant: async (restaurantId) => {
    try {
      const { data, error } = await supabase
        .from('dishes')
        .select(`
          *,
          restaurants!inner(name, rating, delivery_time_min, delivery_time_max)
        `)
        .eq('restaurant_id', restaurantId)
        .eq('is_available', true)
        .order('rating', { ascending: false });

      if (error) {
        return { success: false, error: error.message, data: [] };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      return { success: false, error: 'Failed to get dishes by restaurant.', data: [] };
    }
  },

  // Parse user query and determine intent
  parseUserQuery: (query) => {
    const lowerQuery = query.toLowerCase();
    
    // Extract budget
    const budgetMatch = lowerQuery.match(/₹\s*(\d+)|(\d+)\s*₹|(\d+)\s*rupees?/i);
    let budget = null;
    
    if (budgetMatch) {
      budget = parseInt(budgetMatch[1] || budgetMatch[2] || budgetMatch[3]);
    }

    // Extract dish name
    let dishName = null;
    const dishKeywords = ['biryani', 'curry', 'masala', 'chicken', 'paneer', 'dal', 'rice', 'fish', 'mutton', 'tandoori'];
    
    for (const keyword of dishKeywords) {
      if (lowerQuery.includes(keyword)) {
        dishName = keyword;
        break;
      }
    }

    // Determine query type
    let queryType = 'general';
    if (budget && dishName) {
      queryType = 'dish_with_budget';
    } else if (budget) {
      queryType = 'budget_only';
    } else if (dishName) {
      queryType = 'dish_only';
    }

    return {
      queryType,
      budget,
      dishName,
      originalQuery: query
    };
  }
};

export default foodService;