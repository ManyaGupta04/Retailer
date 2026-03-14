// Competitor Price Service - Fetch prices from other retailers for the same products
import { supabase } from './supabase';

export interface CompetitorPrice {
    retailer_id: string;
    shop_name: string;
    price: number;
}

export interface CompetitorPricesMap {
    [catalogId: string]: CompetitorPrice[];
}

// Removed global cache variables to ensure fresh data is always fetched

/**
 * Fetch competitor prices for products
 * Returns a map of catalog_id -> array of { shop_name, price } for other retailers
 */
export async function fetchCompetitorPrices(
    catalogIds: string[],
    currentRetailerId: string,
    currentCity: string
): Promise<CompetitorPricesMap> {
    if (catalogIds.length === 0) {
        return {};
    }

    // Note: We removed the old global cache here because it was causing a bug where 
    // newly selected products would not show competitor prices until the cache expired.
    // If caching is needed, it must track which specific catalog_ids have been fetched.

    try {
        // Fetch all products from other retailers for the given catalog IDs
        const { data: productsData, error: productsError } = await supabase
            .from('products')
            .select('catalog_id, price, retailer_id, in_stock')
            .in('catalog_id', catalogIds)
            .neq('retailer_id', currentRetailerId)
            .eq('in_stock', true);

        if (productsError) {
            console.error('Error fetching competitor products:', productsError);
            return {};
        }

        console.log('Competitor products found:', productsData);

        if (!productsData || productsData.length === 0) {
            console.log('No competitor products found for catalog IDs:', catalogIds);
            return {};
        }

        // Get unique retailer IDs to fetch shop names
        const retailerIds = [...new Set(productsData.map(p => p.retailer_id))];

        // Fetch retailer names and filter by the current city
        const { data: retailersData, error: retailersError } = await supabase
            .from('retailers')
            .select('id, shop_name')
            .in('id', retailerIds)
            .eq('city', currentCity);

        if (retailersError) {
            console.error('Error fetching retailer names:', retailersError);
        }

        // Create a map of retailer_id -> shop_name
        const retailerNameMap = new Map<string, string>();
        (retailersData || []).forEach(r => {
            retailerNameMap.set(r.id, r.shop_name);
        });

        console.log('Retailer names:', Object.fromEntries(retailerNameMap));

        // Group by catalog_id
        const result: CompetitorPricesMap = {};

        for (const item of productsData) {
            const catalogId = item.catalog_id;
            if (!catalogId) continue;

            const shopName = retailerNameMap.get(item.retailer_id);
            if (!shopName) continue; // Skip products from retailers in other cities

            if (!result[catalogId]) {
                result[catalogId] = [];
            }

            result[catalogId].push({
                retailer_id: item.retailer_id,
                shop_name: shopName,
                price: item.price
            });
        }

        // Sort prices for each product (lowest first)
        for (const catalogId of Object.keys(result)) {
            result[catalogId].sort((a, b) => a.price - b.price);
        }

        console.log('Competitor prices result:', result);
        return result;
    } catch (error) {
        console.error('Error fetching competitor prices:', error);
        return {};
    }
}

/**
 * Clear the competitor prices cache (No-op now that global cache is removed)
 */
export function clearCompetitorPricesCache(): void {
    // No-op
}

/**
 * Get competitor price range for a product
 * Returns { min, max, count } or null if no competitors
 */
export function getCompetitorPriceRange(
    prices: CompetitorPrice[] | undefined
): { min: number; max: number; count: number } | null {
    if (!prices || prices.length === 0) {
        return null;
    }

    const priceValues = prices.map(p => p.price);
    return {
        min: Math.min(...priceValues),
        max: Math.max(...priceValues),
        count: prices.length
    };
}
