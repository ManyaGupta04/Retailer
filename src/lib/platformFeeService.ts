// Platform Fee Service - Handles payment and visibility logic

import { supabase } from './supabase';

export interface PlatformFeeStatus {
    pendingFees: number;
    visibleUntil: Date | null;
    isVisible: boolean;
    lastPaymentTime: Date | null;
}

/**
 * Get the total pending platform fees from completed orders
 */
export const getPendingPlatformFees = async (retailerId: string): Promise<number> => {
    try {
        const { data, error } = await supabase
            .from('orders')
            .select('platform_fee')
            .eq('retailer_id', retailerId)
            .eq('status', 'completed');

        if (error) {
            console.error('Error fetching platform fees:', error);
            return 0;
        }

        const total = data?.reduce((sum, order) => sum + (order.platform_fee || 0), 0) || 0;
        return total;
    } catch (error) {
        console.error('Error calculating platform fees:', error);
        return 0;
    }
};

/**
 * Get the platform fee status for a retailer
 */
export const getPlatformFeeStatus = async (retailerId: string): Promise<PlatformFeeStatus> => {
    try {
        // Get retailer visibility info
        const { data: retailer, error: retailerError } = await supabase
            .from('retailers')
            .select('visible_until, last_payment_time, pending_platform_fees')
            .eq('id', retailerId)
            .single();

        if (retailerError) {
            console.error('Error fetching retailer:', retailerError);
            return {
                pendingFees: 0,
                visibleUntil: null,
                isVisible: false,
                lastPaymentTime: null
            };
        }

        // Get pending fees from completed orders
        const pendingFees = await getPendingPlatformFees(retailerId);

        const visibleUntil = retailer?.visible_until ? new Date(retailer.visible_until) : null;

        // If no pending fees, store is always visible
        // Otherwise, check if visible_until is in the future
        const isVisible = pendingFees === 0 || (visibleUntil ? visibleUntil > new Date() : false);
        const lastPaymentTime = retailer?.last_payment_time ? new Date(retailer.last_payment_time) : null;

        return {
            pendingFees,
            visibleUntil,
            isVisible,
            lastPaymentTime
        };
    } catch (error) {
        console.error('Error getting platform fee status:', error);
        return {
            pendingFees: 0,
            visibleUntil: null,
            isVisible: false,
            lastPaymentTime: null
        };
    }
};

/**
 * Calculate the visibility expiry time based on payment time
 * - Pay between 3 PM - 9 PM: Visible for 6 hours from now
 * - Pay at 9 PM or later: Visible until 3 PM next day
 * - Pay before 3 PM: Visible until 9 PM same day
 */
export const calculateVisibilityExpiry = (): Date => {
    const now = new Date();
    const currentHour = now.getHours();
    const expiry = new Date();

    if (currentHour >= 21) {
        // 9 PM or later: Visible until 3 PM next day
        expiry.setDate(expiry.getDate() + 1);
        expiry.setHours(15, 0, 0, 0);
    } else if (currentHour >= 15) {
        // 3 PM - 9 PM: Visible for 6 hours from now
        expiry.setTime(now.getTime() + 6 * 60 * 60 * 1000);
    } else {
        // Before 3 PM: Visible until 9 PM same day
        expiry.setHours(21, 0, 0, 0);
    }

    return expiry;
};

/**
 * Pay platform fees - Demo payment gateway
 * Marks fees as paid, resets pending fees, sets visibility expiry
 */
export const payPlatformFees = async (retailerId: string): Promise<boolean> => {
    try {
        const visibleUntil = calculateVisibilityExpiry();

        // Update retailer visibility
        const { error: retailerError } = await supabase
            .from('retailers')
            .update({
                last_payment_time: new Date().toISOString(),
                visible_until: visibleUntil.toISOString(),
                pending_platform_fees: 0
            })
            .eq('id', retailerId);

        if (retailerError) {
            console.error('Error updating retailer:', retailerError);
            return false;
        }

        // Reset platform_fee to 0 on all completed orders (fees are now paid)
        const { error: ordersError } = await supabase
            .from('orders')
            .update({ platform_fee: 0 })
            .eq('retailer_id', retailerId)
            .eq('status', 'completed');

        if (ordersError) {
            console.error('Error resetting order fees:', ordersError);
            // Don't fail payment, just log the error
        }

        console.log('Platform fees paid! Visible until:', visibleUntil);
        return true;
    } catch (error) {
        console.error('Error processing payment:', error);
        return false;
    }
};

/**
 * Auto-extend visibility if retailer has no pending fees
 * Call this when fees are 0 to ensure store stays visible
 */
export const autoExtendVisibilityIfNoFees = async (retailerId: string): Promise<void> => {
    try {
        const pendingFees = await getPendingPlatformFees(retailerId);

        if (pendingFees === 0) {
            // Set visibility to far future since there's nothing to pay
            const farFuture = new Date();
            farFuture.setFullYear(farFuture.getFullYear() + 1); // 1 year from now

            await supabase
                .from('retailers')
                .update({ visible_until: farFuture.toISOString() })
                .eq('id', retailerId);

            console.log('Auto-extended visibility (no pending fees)');
        }
    } catch (error) {
        console.error('Error auto-extending visibility:', error);
    }
};

/**
 * Format visibility expiry for display
 */
export const formatVisibilityExpiry = (date: Date | null): string => {
    if (!date) return 'Not set';

    return date.toLocaleString('en-IN', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
    });
};
