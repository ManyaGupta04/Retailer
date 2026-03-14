-- Add city column to retailers table for location-based filtering
-- Run this SQL in your Supabase SQL Editor (Dashboard -> SQL Editor -> New Query)

-- Step 1: Add city column with default 'prayagraj'
ALTER TABLE retailers ADD COLUMN IF NOT EXISTS city TEXT DEFAULT 'prayagraj';

-- Step 2: Set all existing retailers to Prayagraj
UPDATE retailers SET city = 'prayagraj' WHERE city IS NULL;

-- Step 3: Allow anonymous users to read retailers (customer app needs this for city filtering)
-- Check if policy already exists before creating
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'retailers' AND policyname = 'Anyone can view all retailers'
  ) THEN
    CREATE POLICY "Anyone can view all retailers"
      ON retailers FOR SELECT
      TO anon
      USING (true);
  END IF;
END
$$;

-- Step 4: Also allow authenticated users to read all retailers (for competitor features)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'retailers' AND policyname = 'Authenticated users can view all retailers'
  ) THEN
    CREATE POLICY "Authenticated users can view all retailers"
      ON retailers FOR SELECT
      TO authenticated
      USING (true);
  END IF;
END
$$;

-- Step 5: Update the new user trigger to include city
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.retailers (id, shop_name, shop_address, phone, email, city)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'shop_name', 'My Shop'),
    NEW.raw_user_meta_data->>'shop_address',
    NEW.raw_user_meta_data->>'phone',
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'city', 'prayagraj')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 6: Create index for faster city-based queries
CREATE INDEX IF NOT EXISTS idx_retailers_city ON retailers(city);
