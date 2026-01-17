import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import type { Product, ProductFormData } from '../types';
import { categories, units } from '../lib/categories';
import './ProductForm.css';

interface ProductFormProps {
    product?: Product | null;
    onSubmit: (data: ProductFormData) => Promise<void>;
    onClose: () => void;
}

export default function ProductForm({ product, onSubmit, onClose }: ProductFormProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<ProductFormData>({
        name: '',
        category: 'vegetables',
        price: 0,
        unit: 'kg',
        in_stock: true,
        image_url: null,
    });

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                category: product.category,
                price: product.price,
                unit: product.unit,
                in_stock: product.in_stock,
                image_url: product.image_url,
            });
        }
    }, [product]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await onSubmit(formData);
        setLoading(false);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{product ? 'Edit Product' : 'Add New Product'}</h2>
                    <button className="modal-close" onClick={onClose}>✕</button>
                </div>

                <form onSubmit={handleSubmit} className="product-form">
                    <div className="form-group">
                        <label htmlFor="name">Product Name *</label>
                        <input
                            id="name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g., Fresh Tomatoes"
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="category">Category *</label>
                            <select
                                id="category"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                required
                            >
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.icon} {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="unit">Unit *</label>
                            <select
                                id="unit"
                                value={formData.unit}
                                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                                required
                            >
                                {units.map(unit => (
                                    <option key={unit.value} value={unit.value}>
                                        {unit.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="price">Price (₹) *</label>
                            <input
                                id="price"
                                type="number"
                                step="0.01"
                                min="0"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                                placeholder="0.00"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Stock Status</label>
                            <div className="stock-switch">
                                <button
                                    type="button"
                                    className={`switch-option ${formData.in_stock ? 'active' : ''}`}
                                    onClick={() => setFormData({ ...formData, in_stock: true })}
                                >
                                    ✓ In Stock
                                </button>
                                <button
                                    type="button"
                                    className={`switch-option ${!formData.in_stock ? 'active out' : ''}`}
                                    onClick={() => setFormData({ ...formData, in_stock: false })}
                                >
                                    ✗ Out of Stock
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="image">Image URL (optional)</label>
                        <input
                            id="image"
                            type="url"
                            value={formData.image_url || ''}
                            onChange={(e) => setFormData({ ...formData, image_url: e.target.value || null })}
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" className="cancel-btn" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? (
                                <span className="loading-spinner"></span>
                            ) : product ? (
                                'Update Product'
                            ) : (
                                'Add Product'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
