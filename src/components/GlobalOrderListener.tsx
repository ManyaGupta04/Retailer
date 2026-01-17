// Global Order Listener - Subscribes to real-time order updates at App level
// This runs on ALL pages so order notifications work everywhere

import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { emitNewOrder } from '../lib/orderEvents';

interface OrderPayload {
    id: string;
    order_number: string;
    customer_name: string;
    customer_phone: string;
    total: number;
    items: { name: string; quantity: number; price: number }[];
    status: string;
    retailer_id: string;
}

const GlobalOrderListener = () => {
    const { user } = useAuth();

    useEffect(() => {
        if (!user) return;

        console.log('GlobalOrderListener: Setting up real-time subscription for user:', user.id);

        const channel = supabase
            .channel('global-order-notifications')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'orders',
                    filter: `retailer_id=eq.${user.id}`
                },
                (payload) => {
                    console.log('GlobalOrderListener: New order received:', payload);
                    const newOrder = payload.new as OrderPayload;

                    // Emit order event for voice announcement and popup
                    emitNewOrder({
                        orderNumber: newOrder.order_number,
                        customerName: newOrder.customer_name,
                        total: newOrder.total,
                        itemCount: newOrder.items?.length || 0
                    });
                }
            )
            .subscribe((status) => {
                console.log('GlobalOrderListener: Subscription status:', status);
            });

        return () => {
            console.log('GlobalOrderListener: Cleaning up subscription');
            supabase.removeChannel(channel);
        };
    }, [user]);

    // This component doesn't render anything
    return null;
};

export default GlobalOrderListener;
