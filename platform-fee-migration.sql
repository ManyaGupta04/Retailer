-- Platform Fee Payment System - Database Migration
-- Run this in Supabase SQL Editor

-- Add visibility and payment tracking fields to retailers table
ALTER TABLE retailers ADD COLUMN IF NOT EXISTS last_payment_time TIMESTAMP WITH TIME ZONE;
ALTER TABLE retailers ADD COLUMN IF NOT EXISTS visible_until TIMESTAMP WITH TIME ZONE;
ALTER TABLE retailers ADD COLUMN IF NOT EXISTS pending_platform_fees INTEGER DEFAULT 0;

-- Initially set all retailers to be visible until tomorrow 3 PM
-- They must pay platform fees to extend visibility
UPDATE retailers SET visible_until = '2026-01-17 15:00:00+05:30' WHERE visible_until IS NULL;

-- Ensure platform_fee column exists in orders table (should already exist)
ALTER TABLE orders ADD COLUMN IF NOT EXISTS platform_fee INTEGER DEFAULT 0;
