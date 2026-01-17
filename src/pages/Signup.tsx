import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Auth.css';

export default function Signup() {
    const [shopName, setShopName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [shopAddress, setShopAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const { signUp } = useAuth();
    const navigate = useNavigate();

    // Validation functions
    const isValidEmail = (email: string): boolean => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email.trim());
    };

    const isValidPhone = (phone: string): boolean => {
        // Remove all non-digit characters and check for exactly 10 digits
        const digitsOnly = phone.replace(/\D/g, '');
        return digitsOnly.length === 10;
    };

    const formatPhoneDisplay = (input: string): string => {
        // Keep only digits
        const digits = input.replace(/\D/g, '');
        // Limit to 10 digits
        return digits.slice(0, 10);
    };

    const handlePhoneChange = (value: string) => {
        const formatted = formatPhoneDisplay(value);
        setPhone(formatted);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        // Validate email format
        if (!isValidEmail(email)) {
            setError('Please enter a valid email address (e.g., shop@email.com)');
            return;
        }

        // Validate phone number (if provided)
        if (phone && !isValidPhone(phone)) {
            setError('Phone number must be exactly 10 digits');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        // Format phone for storage (add +91 prefix if 10 digits)
        const formattedPhone = phone ? `+91${phone}` : '';

        const { error } = await signUp(email, password, shopName, shopAddress, formattedPhone);

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            setSuccess(true);
            setTimeout(() => navigate('/dashboard'), 1500);
        }
    };

    if (success) {
        return (
            <div className="auth-container">
                <div className="auth-background">
                    <div className="bg-gradient-1"></div>
                    <div className="bg-gradient-2"></div>
                    <div className="bg-gradient-3"></div>
                </div>
                <div className="auth-card success-card">
                    <div className="success-icon">✓</div>
                    <h2>Account Created!</h2>
                    <p>Redirecting to dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-container">
            <div className="auth-background">
                <div className="bg-gradient-1"></div>
                <div className="bg-gradient-2"></div>
                <div className="bg-gradient-3"></div>
            </div>

            <div className="auth-card signup-card">
                <div className="auth-header">
                    <div className="logo">
                        <span className="logo-icon">🏪</span>
                        <h1>CompareKart</h1>
                    </div>
                    <p className="auth-subtitle">Retailer Portal</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <h2>Create Account</h2>
                    <p className="form-subtitle">Register your store on CompareKart</p>

                    {error && <div className="error-message">{error}</div>}

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="shopName">Shop Name *</label>
                            <input
                                id="shopName"
                                type="text"
                                value={shopName}
                                onChange={(e) => setShopName(e.target.value)}
                                placeholder="Your Shop Name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone Number (10 digits)</label>
                            <div className="phone-input-wrapper">
                                <span className="phone-prefix">+91</span>
                                <input
                                    id="phone"
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => handlePhoneChange(e.target.value)}
                                    placeholder="9876543210"
                                    maxLength={10}
                                />
                            </div>
                            {phone && phone.length < 10 && (
                                <span className="input-hint warning">{10 - phone.length} more digits needed</span>
                            )}
                            {phone && phone.length === 10 && (
                                <span className="input-hint success">✓ Valid phone number</span>
                            )}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="shopAddress">Shop Address</label>
                        <input
                            id="shopAddress"
                            type="text"
                            value={shopAddress}
                            onChange={(e) => setShopAddress(e.target.value)}
                            placeholder="123 Market Street, City"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email *</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="shop@email.com"
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="password">Password *</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password *</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? (
                            <span className="loading-spinner"></span>
                        ) : (
                            'Create Account'
                        )}
                    </button>

                    <p className="auth-link">
                        Already have an account? <Link to="/login">Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
