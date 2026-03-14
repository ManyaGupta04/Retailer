import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';
import TimePicker from '../components/TimePicker';
import './Settings.css';

export default function Settings() {
    const { user, retailer, refreshRetailer } = useAuth();
    const [loading, setLoading] = useState(false);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
    const [toast, setToast] = useState<{ message: string; type: 'error' | 'success' } | null>(null);

    // Shop settings
    const [shopName, setShopName] = useState('');
    const [shopAddress, setShopAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [googleMapsLink, setGoogleMapsLink] = useState('');
    const [openingTime, setOpeningTime] = useState('9:00 AM');
    const [closingTime, setClosingTime] = useState('9:00 PM');
    const [allowsPickup, setAllowsPickup] = useState(true);
    const [allowsDelivery, setAllowsDelivery] = useState(true);
    const [city, setCity] = useState('prayagraj');

    // Load current settings
    useEffect(() => {
        if (retailer) {
            setShopName(retailer.shop_name || '');
            setShopAddress(retailer.shop_address || '');
            setPhone(retailer.phone || '');
            setGoogleMapsLink(retailer.google_maps_link || '');
            setOpeningTime(retailer.opening_time || '9:00 AM');
            setClosingTime(retailer.closing_time || '9:00 PM');
            setAllowsPickup(retailer.allows_pickup ?? true);
            setAllowsDelivery(retailer.allows_delivery ?? true);
            setCity(retailer.city || 'prayagraj');
        }
    }, [retailer]);

    const handleSave = async () => {
        if (!user) return;

        // Validate at least one delivery option
        if (!allowsPickup && !allowsDelivery) {
            alert('Please enable at least one delivery option');
            return;
        }

        setLoading(true);
        setSaveStatus('saving');

        try {
            const { error } = await supabase
                .from('retailers')
                .update({
                    shop_name: shopName,
                    shop_address: shopAddress,
                    phone: phone,
                    google_maps_link: googleMapsLink,
                    opening_time: openingTime,
                    closing_time: closingTime,
                    allows_pickup: allowsPickup,
                    allows_delivery: allowsDelivery,
                    city: city,
                })
                .eq('id', user.id);

            if (error) throw error;

            setSaveStatus('saved');
            if (refreshRetailer) refreshRetailer();

            setTimeout(() => setSaveStatus('idle'), 2000);
        } catch (error) {
            console.error('Error saving settings:', error);
            setSaveStatus('error');
            setTimeout(() => setSaveStatus('idle'), 3000);
        } finally {
            setLoading(false);
        }
    };

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

            <main className="main-content">
                <header className="page-header">
                    <div>
                        <h1>⚙️ Settings</h1>
                        <p>Configure your shop settings</p>
                    </div>
                </header>

                <div className="settings-container">
                    {/* Shop Info Section */}
                    <section className="settings-section">
                        <h2>🏪 Shop Information</h2>

                        <div className="form-group">
                            <label htmlFor="shopName">Shop Name</label>
                            <input
                                id="shopName"
                                type="text"
                                value={shopName}
                                onChange={(e) => setShopName(e.target.value)}
                                placeholder="Your shop name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="shopAddress">Shop Address</label>
                            <input
                                id="shopAddress"
                                type="text"
                                value={shopAddress}
                                onChange={(e) => setShopAddress(e.target.value)}
                                placeholder="Full shop address"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                id="phone"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="+91 XXXXXXXXXX"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="googleMapsLink">📍 Google Maps Link</label>
                            <input
                                id="googleMapsLink"
                                type="url"
                                value={googleMapsLink}
                                onChange={(e) => setGoogleMapsLink(e.target.value)}
                                placeholder="https://maps.google.com/..."
                            />
                            <span className="input-hint">Paste your Google Maps share link for directions</span>
                        </div>

                        <div className="form-group">
                            <label htmlFor="city">📍 City</label>
                            <select
                                id="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    background: 'rgba(255,255,255,0.08)',
                                    color: 'inherit',
                                    fontSize: '0.95rem',
                                    outline: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                <option value="prayagraj">Allahabad / Prayagraj</option>
                                <option value="bangalore">Bangalore</option>
                            </select>
                        </div>
                    </section>

                    {/* Shop Hours Section */}
                    <section className="settings-section">
                        <h2>🕐 Shop Hours</h2>
                        <p className="section-description">
                            Set your shop opening and closing times. This will be shown to customers.
                        </p>

                        <div className="time-pickers-row">
                            <TimePicker
                                label="Opening Time"
                                value={openingTime}
                                onChange={setOpeningTime}
                            />

                            <span className="time-separator-text">to</span>

                            <TimePicker
                                label="Closing Time"
                                value={closingTime}
                                onChange={setClosingTime}
                            />
                        </div>
                    </section>

                    {/* Delivery Options Section */}
                    <section className="settings-section">
                        <h2>🚚 Delivery Options</h2>
                        <p className="section-description">
                            Choose which order fulfillment options you support.
                        </p>

                        <div className="toggle-group">
                            <label className="toggle-item">
                                <div className="toggle-info">
                                    <span className="toggle-icon">🏪</span>
                                    <div>
                                        <span className="toggle-label">Self Pickup</span>
                                        <span className="toggle-description">Customers can pick up orders from your shop</span>
                                    </div>
                                </div>
                                <button
                                    className={`toggle-switch ${allowsPickup ? 'active' : ''}`}
                                    onClick={() => setAllowsPickup(!allowsPickup)}
                                >
                                    <span className="toggle-slider"></span>
                                </button>
                            </label>

                            <label className="toggle-item">
                                <div className="toggle-info">
                                    <span className="toggle-icon">🚚</span>
                                    <div>
                                        <span className="toggle-label">Home Delivery</span>
                                        <span className="toggle-description">You deliver orders to customer's address</span>
                                    </div>
                                </div>
                                <button
                                    className={`toggle-switch ${allowsDelivery ? 'active' : ''}`}
                                    onClick={() => setAllowsDelivery(!allowsDelivery)}
                                >
                                    <span className="toggle-slider"></span>
                                </button>
                            </label>
                        </div>

                        {!allowsPickup && !allowsDelivery && (
                            <div className="warning-message">
                                ⚠️ Please enable at least one delivery option
                            </div>
                        )}
                    </section>

                    {/* Save Button */}
                    <div className="save-section">
                        <button
                            className={`save-btn ${saveStatus}`}
                            onClick={handleSave}
                            disabled={loading || (!allowsPickup && !allowsDelivery)}
                        >
                            {saveStatus === 'saving' && '💾 Saving...'}
                            {saveStatus === 'saved' && '✅ Saved!'}
                            {saveStatus === 'error' && '❌ Error - Try Again'}
                            {saveStatus === 'idle' && '💾 Save Settings'}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
