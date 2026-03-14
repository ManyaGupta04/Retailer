import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import type { Product, Order } from '../types';
import Sidebar from '../components/Sidebar';
import { getPlatformFeeStatus, payPlatformFees, formatVisibilityExpiry, autoExtendVisibilityIfNoFees } from '../lib/platformFeeService';
import type { PlatformFeeStatus } from '../lib/platformFeeService';
import { PLATFORM_FEE_ENABLED } from '../lib/platformFeeConfig';
import './Dashboard.css';

export default function Dashboard() {
    const { retailer } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalProducts: 0,
        inStock: 0,
        outOfStock: 0,
        categories: 0,
    });
    const [categoryNames, setCategoryNames] = useState<string[]>([]);
    const [showCategories, setShowCategories] = useState(false);
    const [recentProducts, setRecentProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    // Platform fee state
    const [platformFeeStatus, setPlatformFeeStatus] = useState<PlatformFeeStatus | null>(null);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    // Active orders state for notifications
    const [activeOrders, setActiveOrders] = useState<Order[]>([]);
    const pendingOrdersCount = activeOrders.filter(o => o.status === 'pending').length;
    const ongoingOrdersCount = activeOrders.filter(o => o.status === 'ongoing').length;

    // Auto-hide toast after 4 seconds
    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 4000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    useEffect(() => {
        if (retailer) {
            fetchStats();
            // Only fetch platform fee status if enabled
            if (PLATFORM_FEE_ENABLED) {
                fetchPlatformFeeStatus();
            }
        } else {
            setLoading(false);
        }
    }, [retailer]);

    // Fetch and subscribe to active orders for dashboard notifications
    useEffect(() => {
        if (!retailer?.id) return;

        // Fetch initial active orders (pending and ongoing)
        const fetchActiveOrders = async () => {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('retailer_id', retailer.id)
                .in('status', ['pending', 'ongoing'])
                .order('created_at', { ascending: false });

            if (!error && data) {
                setActiveOrders(data);
            }
        };

        fetchActiveOrders();

        // Subscribe to real-time order updates
        const channel = supabase
            .channel('dashboard-order-notifications')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'orders',
                    filter: `retailer_id=eq.${retailer.id}`
                },
                (payload) => {
                    if (payload.eventType === 'INSERT') {
                        const newOrder = payload.new as Order;
                        if (newOrder.status === 'pending' || newOrder.status === 'ongoing') {
                            setActiveOrders(prev => [newOrder, ...prev]);
                        }
                    } else if (payload.eventType === 'UPDATE') {
                        const updatedOrder = payload.new as Order;
                        if (updatedOrder.status === 'pending' || updatedOrder.status === 'ongoing') {
                            // Update or add to active orders
                            setActiveOrders(prev => {
                                const exists = prev.find(o => o.id === updatedOrder.id);
                                if (exists) {
                                    return prev.map(o => o.id === updatedOrder.id ? updatedOrder : o);
                                }
                                return [updatedOrder, ...prev];
                            });
                        } else {
                            // Remove from active orders if completed/cancelled
                            setActiveOrders(prev => prev.filter(o => o.id !== updatedOrder.id));
                        }
                    } else if (payload.eventType === 'DELETE') {
                        setActiveOrders(prev => prev.filter(o => o.id !== payload.old.id));
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [retailer?.id]);

    const fetchStats = async () => {
        try {
            const { data: products, error } = await supabase
                .from('products')
                .select('*')
                .eq('retailer_id', retailer?.id)
                .order('created_at', { ascending: false });

            if (error) throw error;

            if (products) {
                const inStock = products.filter(p => p.in_stock).length;
                const uniqueCategories = new Set(products.map(p => p.category));

                setStats({
                    totalProducts: products.length,
                    inStock,
                    outOfStock: products.length - inStock,
                    categories: uniqueCategories.size,
                });

                // Store the category names for display
                setCategoryNames(Array.from(uniqueCategories));

                setRecentProducts(products.slice(0, 5));
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchPlatformFeeStatus = async () => {
        if (!retailer?.id) return;
        const status = await getPlatformFeeStatus(retailer.id);
        setPlatformFeeStatus(status);

        // If no pending fees, auto-extend visibility
        if (status.pendingFees === 0) {
            await autoExtendVisibilityIfNoFees(retailer.id);
        }
    };

    const handlePayPlatformFees = async () => {
        if (!retailer?.id) return;
        setPaymentLoading(true);
        const success = await payPlatformFees(retailer.id);
        if (success) {
            await fetchPlatformFeeStatus();
            setToast({ message: '✅ Payment successful! Your store is now visible to customers.', type: 'success' });
        } else {
            setToast({ message: '❌ Payment failed. Please try again.', type: 'error' });
        }
        setPaymentLoading(false);
    };

    return (
        <div className="app-layout">
            <Sidebar />
            <main className="main-content">
                <header className="page-header">
                    <div>
                        <h1>Welcome, {retailer?.shop_name || 'Retailer'}!</h1>
                        <p>Here's an overview of your store</p>
                    </div>
                </header>

                {/* Order Notification Banners - Always visible when there are active orders */}
                {(pendingOrdersCount > 0 || ongoingOrdersCount > 0) && (
                    <div className="order-notification-section">
                        {pendingOrdersCount > 0 && (
                            <div className="order-notification-banner pending" onClick={() => navigate('/orders')}>
                                <div className="banner-icon">🔔</div>
                                <div className="banner-content">
                                    <span className="banner-title">
                                        {pendingOrdersCount} New Order{pendingOrdersCount > 1 ? 's' : ''} Waiting!
                                    </span>
                                    <span className="banner-subtitle">Tap to view and accept</span>
                                </div>
                                <span className="banner-arrow">→</span>
                            </div>
                        )}
                        {ongoingOrdersCount > 0 && (
                            <div className="order-notification-banner ongoing" onClick={() => navigate('/orders')}>
                                <div className="banner-icon">📦</div>
                                <div className="banner-content">
                                    <span className="banner-title">
                                        {ongoingOrdersCount} Active Order{ongoingOrdersCount > 1 ? 's' : ''} in Progress
                                    </span>
                                    <span className="banner-subtitle">Tap to manage orders</span>
                                </div>
                                <span className="banner-arrow">→</span>
                            </div>
                        )}
                    </div>
                )}

                {loading ? (
                    <div className="loading-container">
                        <div className="loading-spinner large"></div>
                    </div>
                ) : (
                    <>
                        {/* Platform Fee Card - Prominent at top (only if enabled) */}
                        {PLATFORM_FEE_ENABLED && platformFeeStatus && (
                            <div className={`platform-fee-card ${platformFeeStatus.isVisible ? 'visible' : 'hidden'}`}>
                                <div className="platform-fee-header">
                                    <div className="platform-fee-icon">💰</div>
                                    <div className="platform-fee-title">
                                        <h3>Platform Fees</h3>
                                        <span className={`visibility-badge ${platformFeeStatus.isVisible ? 'active' : 'inactive'}`}>
                                            {platformFeeStatus.isVisible ? '🟢 Store Visible' : '🔴 Store Hidden'}
                                        </span>
                                    </div>
                                </div>

                                <div className="platform-fee-details">
                                    <div className="fee-amount">
                                        <span className="label">Pending Fees</span>
                                        <span className="amount">₹{platformFeeStatus.pendingFees}</span>
                                    </div>

                                    {platformFeeStatus.visibleUntil && (
                                        <div className="visibility-info">
                                            <span className="label">Visible Until</span>
                                            <span className="value">{formatVisibilityExpiry(platformFeeStatus.visibleUntil)}</span>
                                        </div>
                                    )}
                                </div>

                                <button
                                    className="pay-now-btn"
                                    onClick={handlePayPlatformFees}
                                    disabled={paymentLoading || platformFeeStatus.pendingFees === 0}
                                >
                                    {paymentLoading ? 'Processing...' : `Pay ₹${platformFeeStatus.pendingFees} Now`}
                                </button>

                                {!platformFeeStatus.isVisible && (
                                    <p className="warning-text">
                                        ⚠️ Your store is hidden from customers. Pay platform fees to make it visible.
                                    </p>
                                )}
                            </div>
                        )}

                        <div className="stats-grid">
                            <div className="stat-card clickable" onClick={() => navigate('/products?filter=all')}>
                                <div className="stat-icon blue">📦</div>
                                <div className="stat-info">
                                    <span className="stat-value">{stats.totalProducts}</span>
                                    <span className="stat-label">Total Products</span>
                                </div>
                            </div>

                            <div className="stat-card clickable" onClick={() => navigate('/products?filter=instock')}>
                                <div className="stat-icon green">✓</div>
                                <div className="stat-info">
                                    <span className="stat-value">{stats.inStock}</span>
                                    <span className="stat-label">In Stock</span>
                                </div>
                            </div>

                            <div className="stat-card clickable" onClick={() => navigate('/products?filter=outofstock')}>
                                <div className="stat-icon red">✗</div>
                                <div className="stat-info">
                                    <span className="stat-value">{stats.outOfStock}</span>
                                    <span className="stat-label">Out of Stock</span>
                                </div>
                            </div>

                            <div className="stat-card clickable" onClick={() => setShowCategories(!showCategories)}>
                                <div className="stat-icon purple">🏷️</div>
                                <div className="stat-info">
                                    <span className="stat-value">{stats.categories}</span>
                                    <span className="stat-label">Categories {showCategories ? '▲' : '▼'}</span>
                                </div>
                            </div>
                        </div>

                        {showCategories && categoryNames.length > 0 && (
                            <div className="categories-list">
                                <h3>Your Categories</h3>
                                <div className="category-tags">
                                    {categoryNames.map(cat => (
                                        <span
                                            key={cat}
                                            className="category-tag"
                                            onClick={() => navigate(`/products?category=${cat}`)}
                                        >
                                            {cat}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <section className="recent-section">
                            <div className="section-header">
                                <h2>Recent Products</h2>
                            </div>

                            {recentProducts.length === 0 ? (
                                <div className="empty-state">
                                    <span className="empty-icon">📭</span>
                                    <h3>No products yet</h3>
                                    <p>Start by adding your first product</p>
                                </div>
                            ) : (
                                <div className="recent-list">
                                    {recentProducts.map(product => (
                                        <div key={product.id} className="recent-item">
                                            <div className="recent-item-info">
                                                <span className="recent-item-name">{product.name}</span>
                                                <span className="recent-item-category">{product.category}</span>
                                            </div>
                                            <div className="recent-item-price">
                                                ₹{product.price}/{product.unit}
                                            </div>
                                            <span className={`stock-badge ${product.in_stock ? 'in-stock' : 'out-stock'}`}>
                                                {product.in_stock ? 'In Stock' : 'Out'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    </>
                )}
            </main>

            {/* Toast Notification */}
            {toast && (
                <div className={`toast-notification ${toast.type}`}>
                    <span>{toast.message}</span>
                    <button onClick={() => setToast(null)}>×</button>
                </div>
            )}
        </div>
    );
}

