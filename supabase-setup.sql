-- CompareKart Retailer Database Setup
-- Run this SQL in your Supabase SQL Editor (Dashboard -> SQL Editor -> New Query)

-- Create retailers table
CREATE TABLE IF NOT EXISTS retailers (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  shop_name TEXT NOT NULL,
  shop_address TEXT,
  phone TEXT,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  retailer_id UUID REFERENCES retailers(id) ON DELETE CASCADE,
  catalog_id TEXT,  -- Links to hardcoded product catalog
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  unit TEXT DEFAULT 'piece',
  in_stock BOOLEAN DEFAULT true,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE retailers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Retailers policies
CREATE POLICY "Users can view own retailer profile"
  ON retailers FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own retailer profile"
  ON retailers FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own retailer profile"
  ON retailers FOR UPDATE
  USING (auth.uid() = id);

-- Products policies (retailers can manage their own products)
CREATE POLICY "Retailers can view own products"
  ON products FOR SELECT
  USING (auth.uid() = retailer_id);

CREATE POLICY "Retailers can insert own products"
  ON products FOR INSERT
  WITH CHECK (auth.uid() = retailer_id);

CREATE POLICY "Retailers can update own products"
  ON products FOR UPDATE
  USING (auth.uid() = retailer_id);

CREATE POLICY "Retailers can delete own products"
  ON products FOR DELETE
  USING (auth.uid() = retailer_id);

-- Public policy: Anyone can view all products (for consumer app)
CREATE POLICY "Anyone can view all products"
  ON products FOR SELECT
  TO anon
  USING (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_products_retailer_id ON products(retailer_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);

-- Function to handle new user signup (creates retailer profile automatically)
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.retailers (id, shop_name, shop_address, phone, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'shop_name', 'My Shop'),
    NEW.raw_user_meta_data->>'shop_address',
    NEW.raw_user_meta_data->>'phone',
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function when a new user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
