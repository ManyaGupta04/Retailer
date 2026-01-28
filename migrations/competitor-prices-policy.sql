-- Competitor Prices Feature - RLS Policy Update
-- Run this SQL in your Supabase SQL Editor (Dashboard -> SQL Editor -> New Query)
-- This allows authenticated retailers to view all products and retailer info for competitor price comparison

-- Allow authenticated retailers to read all products
CREATE POLICY "Authenticated users can view all products"
  ON products FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to view all retailer info (for shop names in competitor prices)
CREATE POLICY "Authenticated users can view all retailers"
  ON retailers FOR SELECT
  TO authenticated
  USING (true);
