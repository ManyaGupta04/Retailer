import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../lib/supabase';
import type { Order } from '../types';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';
import { emitNewOrder } from '../lib/orderEvents';
import { speakOrderCompleted } from '../lib/speech';
import './Orders.css';

type TabType = 'ongoing' | 'cancelled' | 'completed';

type ToastType = 'error' | 'success' | 'warning';

interface Toast {
    message: string;
    type: ToastType;
}

const Orders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<TabType>('ongoing');
    const [otpInput, setOtpInput] = useState('');
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [toast, setToast] = useState<Toast | null>(null);

    // Show toast notification
    const showToast = (message: string, type: ToastType = 'error') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    // Fetch orders
    const fetchOrders = async () => {
        if (!user) return;

        try {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('retailer_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setOrders(data || []);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    // Subscribe to real-time updates
    useEffect(() => {
        if (!user) return;

        fetchOrders();

        const channel = supabase
            .channel('retailer-orders')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'orders',
                    filter: `retailer_id=eq.${user.id}`
                },
                (payload) => {
                    console.log('Order update:', payload);
                    if (payload.eventType === 'INSERT') {
                        const newOrder = payload.new as Order;
                        setOrders(prev => [newOrder, ...prev]);
                        // Play notification sound
                        playNotificationSound();
                        // Emit order event for voice announcement and popup
                        emitNewOrder({
                            orderNumber: newOrder.order_number,
                            customerName: newOrder.customer_name,
                            total: newOrder.total,
                            itemCount: newOrder.items?.length || 0
                        });
                    } else if (payload.eventType === 'UPDATE') {
                        setOrders(prev => prev.map(order =>
                            order.id === payload.new.id ? payload.new as Order : order
                        ));
                    } else if (payload.eventType === 'DELETE') {
                        setOrders(prev => prev.filter(order => order.id !== payload.old.id));
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user]);

    const playNotificationSound = () => {
        try {
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleS0ADBCMz+24oV4KCSC55u2/l089AAANh87uvKltNQAAFpbP89ChXzsACTCu4+m0mWEsAA');
            audio.volume = 0.5;
            audio.play().catch(() => { });
        } catch { }
    };

    // Filter orders by tab
    const filteredOrders = useMemo(() => {
        if (activeTab === 'ongoing') {
            return orders.filter(o => o.status === 'pending' || o.status === 'ongoing');
        }
        return orders.filter(o => o.status === activeTab);
    }, [orders, activeTab]);

    // Count for tabs
    const pendingCount = orders.filter(o => o.status === 'pending').length;
    const ongoingCount = orders.filter(o => o.status === 'pending' || o.status === 'ongoing').length;
    const cancelledCount = orders.filter(o => o.status === 'cancelled').length;
    const completedCount = orders.filter(o => o.status === 'completed').length;

    // Accept order
    const handleAccept = async (orderId: string) => {
        setActionLoading(orderId);
        try {
            const { error } = await supabase
                .from('orders')
                .update({
                    status: 'ongoing',
                    accepted_at: new Date().toISOString()
                })
                .eq('id', orderId);

            if (error) throw error;
        } catch (error) {
            console.error('Error accepting order:', error);
            alert('Failed to accept order');
        } finally {
            setActionLoading(null);
        }
    };

    // Decline order
    const handleDecline = async (orderId: string) => {
        if (!confirm('Are you sure you want to decline this order?')) return;

        setActionLoading(orderId);
        try {
            const { error } = await supabase
                .from('orders')
                .update({
                    status: 'cancelled',
                    cancelled_reason: 'declined'
                })
                .eq('id', orderId);

            if (error) throw error;
        } catch (error) {
            console.error('Error declining order:', error);
            showToast('Failed to decline order', 'error');
        } finally {
            setActionLoading(null);
        }
    };

    // Complete order with OTP
    const handleComplete = async (orderId: string, otp: string) => {
        const order = orders.find(o => o.id === orderId);
        if (!order) return;

        if (otp !== order.otp_code) {
            showToast('❌ Invalid OTP. Please try again.', 'error');
            return;
        }

        setActionLoading(orderId);
        try {
            const { error } = await supabase
                .from('orders')
                .update({
                    status: 'completed',
                    completed_at: new Date().toISOString()
                })
                .eq('id', orderId);

            if (error) throw error;
            setSelectedOrderId(null);
            setOtpInput('');
            // Auto-switch to completed tab
            setActiveTab('completed');
            showToast('✅ Order completed successfully!', 'success');
            // Speak "Shandaar! order pura hua"
            speakOrderCompleted();
        } catch (error) {
            console.error('Error completing order:', error);
            showToast('Failed to complete order', 'error');
        } finally {
            setActionLoading(null);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-IN', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatTimeAgo = (dateString: string) => {
        const now = new Date();
        const date = new Date(dateString);
        const diff = now.getTime() - date.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return formatDate(dateString);
    };

    if (loading) {
        return (
            <div className="app-layout">
                <Sidebar />
                <main className="main-content">
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Loading orders...</p>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="app-layout">
            <Sidebar />

            {/* Toast Notification */}
            {toast && (
                <div className={`toast-notification ${toast.type}`}>
                    <span className="toast-message">{toast.message}</span>
                    <button className="toast-close" onClick={() => setToast(null)}>×</button>
                </div>
            )}

            <main className="main-content orders-page">
                {/* Header */}
                <div className="orders-header">
                    <h1>📦 Orders</h1>
                    <button onClick={fetchOrders} className="refresh-btn">
                        🔄
                    </button>
                </div>

                {/* Tabs */}
                <div className="orders-tabs">
                    <button
                        className={`tab ${activeTab === 'ongoing' ? 'active' : ''}`}
                        onClick={() => setActiveTab('ongoing')}
                    >
                        <span className="tab-icon">🕐</span>
                        <span>Ongoing</span>
                        {ongoingCount > 0 && <span className="badge">{ongoingCount}</span>}
                    </button>
                    <button
                        className={`tab ${activeTab === 'cancelled' ? 'active' : ''}`}
                        onClick={() => setActiveTab('cancelled')}
                    >
                        <span className="tab-icon">❌</span>
                        <span>Cancelled</span>
                        {cancelledCount > 0 && <span className="badge cancelled">{cancelledCount}</span>}
                    </button>
                    <button
                        className={`tab ${activeTab === 'completed' ? 'active' : ''}`}
                        onClick={() => setActiveTab('completed')}
                    >
                        <span className="tab-icon">✅</span>
                        <span>Completed</span>
                        {completedCount > 0 && <span className="badge completed">{completedCount}</span>}
                    </button>
                </div>

                {/* Pending notification banner */}
                {pendingCount > 0 && activeTab !== 'ongoing' && (
                    <div className="pending-banner" onClick={() => setActiveTab('ongoing')}>
                        🔔 You have {pendingCount} new order{pendingCount > 1 ? 's' : ''} waiting!
                    </div>
                )}

                {/* Orders List */}
                <div className="orders-list">
                    {filteredOrders.length === 0 ? (
                        <div className="empty-state">
                            {activeTab === 'ongoing' && (
                                <>
                                    <div className="empty-icon">📭</div>
                                    <h3>No ongoing orders</h3>
                                    <p>New orders will appear here</p>
                                </>
                            )}
                            {activeTab === 'cancelled' && (
                                <>
                                    <div className="empty-icon">✨</div>
                                    <h3>No cancelled orders</h3>
                                    <p>That's a good thing!</p>
                                </>
                            )}
                            {activeTab === 'completed' && (
                                <>
                                    <div className="empty-icon">📊</div>
                                    <h3>No completed orders yet</h3>
                                    <p>Completed orders will show here</p>
                                </>
                            )}
                        </div>
                    ) : (
                        filteredOrders.map(order => (
                            <div
                                key={order.id}
                                className={`order-card ${order.status === 'pending' ? 'pending' : ''}`}
                            >
                                {/* Order Header */}
                                <div className="order-header">
                                    <div className="order-number">
                                        <span className="label">Order</span>
                                        <span className="number">#{order.order_number}</span>
                                    </div>
                                    <div className="order-time">
                                        {formatTimeAgo(order.created_at)}
                                    </div>
                                </div>

                                {/* Status Badge */}
                                <div className={`status-badge ${order.status}`}>
                                    {order.status === 'pending' && '⏳ Waiting for acceptance'}
                                    {order.status === 'ongoing' && '✅ Accepted'}
                                    {order.status === 'completed' && '🎉 Completed'}
                                    {order.status === 'cancelled' && order.cancelled_reason === 'timeout' && '⏰ Expired'}
                                    {order.status === 'cancelled' && order.cancelled_reason === 'declined' && '❌ Declined by you'}
                                    {order.status === 'cancelled' && (order.cancelled_reason === 'customer_cancelled' || order.cancelled_reason === 'Cancelled by customer') && '🚫 Cancelled by customer'}
                                    {order.status === 'cancelled' && !['timeout', 'declined', 'customer_cancelled', 'Cancelled by customer'].includes(order.cancelled_reason || '') && `❌ ${order.cancelled_reason || 'Cancelled'}`}
                                </div>

                                {/* Customer Info */}
                                <div className="customer-info">
                                    <div className="info-row">
                                        <span className="icon">👤</span>
                                        <span className="value">{order.customer_name}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="icon">📱</span>
                                        <a href={`tel:${order.customer_phone}`} className="phone-link">
                                            {order.customer_phone}
                                        </a>
                                    </div>
                                    <div className="info-row">
                                        <span className="icon">{order.mode === 'delivery' ? '🚚' : '🏪'}</span>
                                        <span className="value mode">
                                            {order.mode === 'delivery' ? 'Home Delivery' : 'Self Pickup'}
                                        </span>
                                    </div>
                                </div>

                                {/* Items */}
                                <div className="order-items">
                                    <div className="items-header">Items ({order.items.length})</div>
                                    <div className="items-list">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="item">
                                                <span className="item-name">{item.name}</span>
                                                <span className="item-qty">×{item.quantity}</span>
                                                <span className="item-price">₹{item.price * item.quantity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Total */}
                                <div className="order-total">
                                    <span>Total</span>
                                    <span className="amount">₹{order.total}</span>
                                </div>

                                {/* Actions for Pending */}
                                {order.status === 'pending' && (
                                    <div className="order-actions">
                                        <button
                                            className="action-btn decline"
                                            onClick={() => handleDecline(order.id)}
                                            disabled={actionLoading === order.id}
                                        >
                                            ❌ Decline
                                        </button>
                                        <button
                                            className="action-btn accept"
                                            onClick={() => handleAccept(order.id)}
                                            disabled={actionLoading === order.id}
                                        >
                                            {actionLoading === order.id ? '...' : '✅ Accept'}
                                        </button>
                                    </div>
                                )}

                                {/* Actions for Ongoing - Complete with OTP */}
                                {order.status === 'ongoing' && (
                                    <div className="complete-section">
                                        {selectedOrderId === order.id ? (
                                            <div className="otp-input-section">
                                                <input
                                                    type="text"
                                                    inputMode="numeric"
                                                    maxLength={4}
                                                    placeholder="Enter 4-digit OTP"
                                                    value={otpInput}
                                                    onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                                                    className="otp-input"
                                                    autoFocus
                                                />
                                                <div className="otp-actions">
                                                    <button
                                                        className="cancel-btn"
                                                        onClick={() => {
                                                            setSelectedOrderId(null);
                                                            setOtpInput('');
                                                        }}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        className="verify-btn"
                                                        onClick={() => handleComplete(order.id, otpInput)}
                                                        disabled={otpInput.length !== 4 || actionLoading === order.id}
                                                    >
                                                        {actionLoading === order.id ? '...' : 'Verify & Complete'}
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <button
                                                className="complete-btn"
                                                onClick={() => setSelectedOrderId(order.id)}
                                            >
                                                🔐 Mark as Complete
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
};

export default Orders;
