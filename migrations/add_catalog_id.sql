-- Migration: Add catalog_id column to products table
-- Run this SQL in your Supabase SQL Editor if you have existing data

-- Add catalog_id column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'products' AND column_name = 'catalog_id'
    ) THEN
        ALTER TABLE products ADD COLUMN catalog_id TEXT;
    END IF;
END $$;

-- Create index on catalog_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_products_catalog_id ON products(catalog_id);

-- Create unique constraint to prevent duplicate products per retailer
CREATE UNIQUE INDEX IF NOT EXISTS idx_products_retailer_catalog 
ON products(retailer_id, catalog_id) 
WHERE catalog_id IS NOT NULL;
