import { useState, useEffect } from 'react';
import { subscribeToNewOrders, type OrderEventData } from '../lib/orderEvents';
import './OrderAlertPopup.css';

const OrderAlertPopup = () => {
    const [order, setOrder] = useState<OrderEventData | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Subscribe to new order events
        const unsubscribe = subscribeToNewOrders((newOrder) => {
            setOrder(newOrder);
            setIsVisible(true);

            // Auto-dismiss after 10 seconds
            setTimeout(() => {
                setIsVisible(false);
            }, 10000);
        });

        return () => unsubscribe();
    }, []);

    const handleClose = () => {
        setIsVisible(false);
    };

    if (!isVisible || !order) return null;

    return (
        <div className="order-alert-overlay" onClick={handleClose}>
            <div className="order-alert-popup" onClick={(e) => e.stopPropagation()}>
                <div className="order-alert-header">
                    <span className="order-alert-icon">🛒</span>
                    <h2>New Order Received!</h2>
                    <button className="order-alert-close" onClick={handleClose}>×</button>
                </div>

                <div className="order-alert-content">
                    <div className="order-alert-detail">
                        <span className="detail-label">Order #</span>
                        <span className="detail-value">{order.orderNumber}</span>
                    </div>
                    <div className="order-alert-detail">
                        <span className="detail-label">Customer</span>
                        <span className="detail-value">{order.customerName}</span>
                    </div>
                    <div className="order-alert-detail">
                        <span className="detail-label">Items</span>
                        <span className="detail-value">{order.itemCount} items</span>
                    </div>
                    <div className="order-alert-total">
                        <span className="total-label">Total Amount</span>
                        <span className="total-value">₹{order.total}</span>
                    </div>
                </div>

                <div className="order-alert-footer">
                    <p>Click anywhere or wait to dismiss</p>
                </div>
            </div>
        </div>
    );
};

export default OrderAlertPopup;
