// Global order event system for broadcasting new orders across components

import { speakOrderReceived } from './speech';

export interface OrderEventData {
    orderNumber: string;
    customerName: string;
    total: number;
    itemCount: number;
}

const ORDER_EVENT_NAME = 'retailer-new-order';

// Emit a new order event
export const emitNewOrder = (order: OrderEventData) => {
    console.log('Emitting new order event:', order);

    // Dispatch custom event for in-app popup
    const event = new CustomEvent(ORDER_EVENT_NAME, { detail: order });
    window.dispatchEvent(event);

    // Speak the order announcement
    speakOrderReceived();

    // Show browser notification (works even when tab is not focused)
    showBrowserNotification(order);
};

// Subscribe to new order events
export const subscribeToNewOrders = (callback: (order: OrderEventData) => void): (() => void) => {
    const handler = (event: Event) => {
        const customEvent = event as CustomEvent<OrderEventData>;
        callback(customEvent.detail);
    };

    window.addEventListener(ORDER_EVENT_NAME, handler);

    // Return unsubscribe function
    return () => window.removeEventListener(ORDER_EVENT_NAME, handler);
};

// Request browser notification permission
export const requestNotificationPermission = async (): Promise<boolean> => {
    if (!('Notification' in window)) {
        console.log('Browser does not support notifications');
        return false;
    }

    if (Notification.permission === 'granted') {
        return true;
    }

    if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
    }

    return false;
};

// Show browser notification
const showBrowserNotification = (order: OrderEventData) => {
    if (!('Notification' in window) || Notification.permission !== 'granted') {
        return;
    }

    try {
        const notification = new Notification('🛒 New Order Received!', {
            body: `Order #${order.orderNumber}\n${order.customerName}\n₹${order.total} (${order.itemCount} items)`,
            icon: '/vite.svg',
            tag: 'order-' + order.orderNumber, // Prevents duplicate notifications
            requireInteraction: true // Keep notification visible until user interacts
        });

        // Close notification after 10 seconds
        setTimeout(() => notification.close(), 10000);

        // Focus app when notification is clicked
        notification.onclick = () => {
            window.focus();
            notification.close();
        };
    } catch (error) {
        console.error('Error showing notification:', error);
    }
};
