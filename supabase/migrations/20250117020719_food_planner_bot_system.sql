-- Location: supabase/migrations/20250117020719_food_planner_bot_system.sql

-- 1. Extensions & Types
CREATE TYPE public.user_role AS ENUM ('admin', 'customer', 'manager');
CREATE TYPE public.dish_category AS ENUM ('appetizer', 'main_course', 'dessert', 'beverage', 'snack');
CREATE TYPE public.cuisine_type AS ENUM ('indian', 'chinese', 'italian', 'mexican', 'thai', 'continental', 'fast_food');

-- 2. Core Tables
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    phone TEXT,
    role public.user_role DEFAULT 'customer'::public.user_role,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.restaurants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    address TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    cuisine_type public.cuisine_type NOT NULL,
    rating DECIMAL(2,1) DEFAULT 0.0,
    delivery_time_min INTEGER DEFAULT 30,
    delivery_time_max INTEGER DEFAULT 45,
    minimum_order_amount INTEGER DEFAULT 0,
    delivery_fee INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.dishes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    restaurant_id UUID REFERENCES public.restaurants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    price INTEGER NOT NULL, -- Price in paise/cents
    category public.dish_category NOT NULL,
    is_vegetarian BOOLEAN DEFAULT false,
    is_available BOOLEAN DEFAULT true,
    image_url TEXT,
    rating DECIMAL(2,1) DEFAULT 0.0,
    prep_time_minutes INTEGER DEFAULT 15,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.user_searches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    query TEXT NOT NULL,
    budget INTEGER, -- Budget in paise/cents
    dish_name TEXT,
    results_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Essential Indexes
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_restaurants_cuisine_type ON public.restaurants(cuisine_type);
CREATE INDEX idx_restaurants_rating ON public.restaurants(rating DESC);
CREATE INDEX idx_dishes_restaurant_id ON public.dishes(restaurant_id);
CREATE INDEX idx_dishes_price ON public.dishes(price);
CREATE INDEX idx_dishes_name ON public.dishes(name);
CREATE INDEX idx_dishes_category ON public.dishes(category);
CREATE INDEX idx_user_searches_user_id ON public.user_searches(user_id);
CREATE INDEX idx_user_searches_created_at ON public.user_searches(created_at DESC);

-- 4. RLS Setup
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_searches ENABLE ROW LEVEL SECURITY;

-- 5. Helper Functions
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = auth.uid() AND up.role = 'admin'::public.user_role
)
$$;

CREATE OR REPLACE FUNCTION public.search_dishes_by_budget(budget_amount INTEGER)
RETURNS TABLE(
    dish_id UUID,
    dish_name TEXT,
    restaurant_name TEXT,
    price INTEGER,
    delivery_time TEXT,
    rating DECIMAL,
    image_url TEXT,
    is_best_value BOOLEAN
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        d.id,
        d.name,
        r.name,
        d.price,
        CONCAT(r.delivery_time_min::TEXT, '-', r.delivery_time_max::TEXT, ' min'),
        d.rating,
        d.image_url,
        (d.price <= budget_amount * 0.7)::BOOLEAN -- Best value if <= 70% of budget
    FROM public.dishes d
    JOIN public.restaurants r ON d.restaurant_id = r.id
    WHERE d.price <= budget_amount 
    AND d.is_available = true 
    AND r.is_active = true
    ORDER BY 
        (d.price <= budget_amount * 0.7)::BOOLEAN DESC, -- Best value first
        d.rating DESC,
        d.price ASC
    LIMIT 5;
END;
$$;

CREATE OR REPLACE FUNCTION public.search_dishes_by_name(dish_query TEXT, max_price INTEGER DEFAULT NULL)
RETURNS TABLE(
    dish_id UUID,
    dish_name TEXT,
    restaurant_name TEXT,
    price INTEGER,
    delivery_time TEXT,
    rating DECIMAL,
    image_url TEXT,
    is_best_value BOOLEAN
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        d.id,
        d.name,
        r.name,
        d.price,
        CONCAT(r.delivery_time_min::TEXT, '-', r.delivery_time_max::TEXT, ' min'),
        d.rating,
        d.image_url,
        (max_price IS NULL OR d.price <= max_price)::BOOLEAN
    FROM public.dishes d
    JOIN public.restaurants r ON d.restaurant_id = r.id
    WHERE d.name ILIKE '%' || dish_query || '%'
    AND d.is_available = true 
    AND r.is_active = true
    AND (max_price IS NULL OR d.price <= max_price)
    ORDER BY 
        d.rating DESC,
        d.price ASC
    LIMIT 5;
END;
$$;

CREATE OR REPLACE FUNCTION public.log_user_search(query_text TEXT, budget_amount INTEGER DEFAULT NULL, dish_query TEXT DEFAULT NULL)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    search_id UUID;
BEGIN
    INSERT INTO public.user_searches (user_id, query, budget, dish_name)
    VALUES (auth.uid(), query_text, budget_amount, dish_query)
    RETURNING id INTO search_id;
    
    RETURN search_id;
END;
$$;

-- Functions for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, full_name, role)
    VALUES (
        NEW.id, 
        NEW.email, 
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'role', 'customer')::public.user_role
    );
    RETURN NEW;
END;
$$;

-- 6. Triggers
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 7. RLS Policies
CREATE POLICY "users_own_profile" ON public.user_profiles 
FOR ALL 
USING (auth.uid() = id) 
WITH CHECK (auth.uid() = id);

CREATE POLICY "public_read_restaurants" ON public.restaurants 
FOR SELECT 
TO public 
USING (is_active = true);

CREATE POLICY "admin_manage_restaurants" ON public.restaurants 
FOR ALL 
TO authenticated 
USING (public.is_admin()) 
WITH CHECK (public.is_admin());

CREATE POLICY "public_read_dishes" ON public.dishes 
FOR SELECT 
TO public 
USING (is_available = true);

CREATE POLICY "admin_manage_dishes" ON public.dishes 
FOR ALL 
TO authenticated 
USING (public.is_admin()) 
WITH CHECK (public.is_admin());

CREATE POLICY "users_own_searches" ON public.user_searches 
FOR ALL 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

-- 8. Sample Data
DO $$
DECLARE
    admin_uuid UUID := gen_random_uuid();
    restaurant1_id UUID := gen_random_uuid();
    restaurant2_id UUID := gen_random_uuid();
    restaurant3_id UUID := gen_random_uuid();
    restaurant4_id UUID := gen_random_uuid();
    restaurant5_id UUID := gen_random_uuid();
BEGIN
    -- Create admin user
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES (
        admin_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
        'admin@foodplanner.com', crypt('admin123', gen_salt('bf', 10)), now(), now(), now(),
        '{"full_name": "Food Planner Admin", "role": "admin"}'::jsonb, 
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null
    );

    -- Create restaurants
    INSERT INTO public.restaurants (id, name, description, address, phone, cuisine_type, rating, delivery_time_min, delivery_time_max, minimum_order_amount, delivery_fee)
    VALUES
        (restaurant1_id, 'Biryani House', 'Authentic Hyderabadi Biryani', 'MG Road, Bangalore', '+91-9876543210', 'indian'::public.cuisine_type, 4.5, 25, 30, 10000, 2000),
        (restaurant2_id, 'Royal Kitchen', 'Traditional Indian Cuisine', 'Koramangala, Bangalore', '+91-9876543211', 'indian'::public.cuisine_type, 4.3, 30, 35, 12000, 1500),
        (restaurant3_id, 'Green Spice', 'Pure Vegetarian Delights', 'HSR Layout, Bangalore', '+91-9876543212', 'indian'::public.cuisine_type, 4.2, 20, 25, 8000, 1000),
        (restaurant4_id, 'Spice Garden', 'North Indian Specialties', 'Whitefield, Bangalore', '+91-9876543213', 'indian'::public.cuisine_type, 4.4, 20, 25, 9000, 1500),
        (restaurant5_id, 'Curry Point', 'Homestyle Indian Food', 'Indiranagar, Bangalore', '+91-9876543214', 'indian'::public.cuisine_type, 4.1, 25, 30, 8000, 2000);

    -- Create dishes
    INSERT INTO public.dishes (restaurant_id, name, description, price, category, is_vegetarian, image_url, rating, prep_time_minutes)
    VALUES
        -- Biryani House
        (restaurant1_id, 'Chicken Biryani', 'Aromatic basmati rice with tender chicken', 18000, 'main_course'::public.dish_category, false, 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=400', 4.5, 25),
        (restaurant1_id, 'Mutton Biryani', 'Rich and flavorful mutton biryani', 22000, 'main_course'::public.dish_category, false, 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=400', 4.3, 30),
        (restaurant1_id, 'Veg Biryani', 'Fragrant vegetable biryani', 15000, 'main_course'::public.dish_category, true, 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=400', 4.2, 20),
        
        -- Royal Kitchen
        (restaurant2_id, 'Butter Chicken', 'Creamy tomato-based chicken curry', 19000, 'main_course'::public.dish_category, false, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&auto=format&fit=crop&q=60', 4.4, 20),
        (restaurant2_id, 'Paneer Makhani', 'Rich and creamy paneer curry', 16000, 'main_course'::public.dish_category, true, 'https://images.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_640.jpg', 4.2, 18),
        (restaurant2_id, 'Chicken Tikka Masala', 'Grilled chicken in spiced curry', 20000, 'main_course'::public.dish_category, false, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&auto=format&fit=crop&q=60', 4.3, 25),
        
        -- Green Spice
        (restaurant3_id, 'Paneer Butter Masala', 'Cottage cheese in rich tomato gravy', 16000, 'main_course'::public.dish_category, true, 'https://images.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_640.jpg', 4.4, 20),
        (restaurant3_id, 'Dal Tadka', 'Tempered yellow lentils', 9000, 'main_course'::public.dish_category, true, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', 4.0, 15),
        (restaurant3_id, 'Veg Pulao', 'Aromatic vegetable rice', 12000, 'main_course'::public.dish_category, true, 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=400', 4.1, 20),
        
        -- Spice Garden
        (restaurant4_id, 'Chicken Curry', 'Traditional home-style chicken curry', 14000, 'main_course'::public.dish_category, false, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&auto=format&fit=crop&q=60', 4.1, 25),
        (restaurant4_id, 'Aloo Gobi', 'Spiced potato and cauliflower', 11000, 'main_course'::public.dish_category, true, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', 4.0, 20),
        (restaurant4_id, 'Tandoori Chicken', 'Marinated grilled chicken', 17000, 'main_course'::public.dish_category, false, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&auto=format&fit=crop&q=60', 4.2, 30),
        
        -- Curry Point
        (restaurant5_id, 'Fish Curry', 'South Indian style fish curry', 16000, 'main_course'::public.dish_category, false, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&auto=format&fit=crop&q=60', 4.0, 25),
        (restaurant5_id, 'Sambar Rice', 'Traditional South Indian comfort food', 10000, 'main_course'::public.dish_category, true, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', 3.9, 15),
        (restaurant5_id, 'Chicken Fry', 'Spicy fried chicken pieces', 15000, 'main_course'::public.dish_category, false, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&auto=format&fit=crop&q=60', 4.1, 20);

    -- Add more dishes to reach ~100 dishes across restaurants
    INSERT INTO public.dishes (restaurant_id, name, description, price, category, is_vegetarian, image_url, rating, prep_time_minutes)
    SELECT 
        (ARRAY[restaurant1_id, restaurant2_id, restaurant3_id, restaurant4_id, restaurant5_id])[floor(random() * 5 + 1)],
        'Dish ' || generate_series,
        'Delicious food item ' || generate_series,
        floor(random() * 15000 + 5000)::INTEGER, -- Price between 50-200 rupees
        (ARRAY['appetizer', 'main_course', 'dessert', 'beverage', 'snack'])[floor(random() * 5 + 1)]::public.dish_category,
        random() > 0.5, -- Random vegetarian flag
        'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
        round((random() * 2 + 3)::numeric, 1), -- Rating between 3.0-5.0
        floor(random() * 20 + 10)::INTEGER -- Prep time 10-30 minutes
    FROM generate_series(1, 85); -- Add 85 more dishes to reach ~100 total

END $$;