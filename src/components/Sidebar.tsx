import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import './Sidebar.css';

export default function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { retailer, signOut } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleSignOut = async () => {
        await signOut();
        navigate('/login');
    };

    const navItems = [
        { path: '/dashboard', icon: '📊', label: 'Dashboard' },
        { path: '/orders', icon: '📋', label: 'Orders' },
        { path: '/products', icon: '📦', label: 'Products' },
        { path: '/settings', icon: '⚙️', label: 'Settings' },
    ];

    return (
        <>
            <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? '✕' : '☰'}
            </button>

            <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <div className="logo">
                        <span className="logo-icon">🏪</span>
                        <h1>CompareKart</h1>
                    </div>
                    <p className="shop-name">{retailer?.shop_name}</p>
                </div>

                <nav className="sidebar-nav">
                    {navItems.map(item => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                            onClick={() => setMobileOpen(false)}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            <span className="nav-label">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <div className="user-info">
                        <div className="user-avatar">
                            {retailer?.shop_name?.charAt(0) || 'R'}
                        </div>
                        <div className="user-details">
                            <span className="user-name">{retailer?.shop_name}</span>
                            <span className="user-email">{retailer?.email}</span>
                        </div>
                    </div>
                    <button className="logout-btn" onClick={handleSignOut}>
                        <span>🚪</span> Sign Out
                    </button>
                </div>
            </aside>

            {mobileOpen && <div className="sidebar-overlay" onClick={() => setMobileOpen(false)} />}
        </>
    );
}
