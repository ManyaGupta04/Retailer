import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { catalogProducts, type CatalogProduct } from '../lib/products';
import { categories } from '../lib/categories';
import { speakPriceSet, speakProductPublished, speakProductUnpublished } from '../lib/speech';
import { fetchCompetitorPrices, type CompetitorPricesMap } from '../lib/competitorPriceService';
import Sidebar from '../components/Sidebar';
import './Products.css';

interface RetailerProduct {
    id: string;
    catalog_id: string;
    name: string;
    category: string;
    price: number;
    unit: string;
    in_stock: boolean;
}

export default function Products() {
    const { retailer } = useAuth();
    const [searchParams] = useSearchParams();
    const [retailerProducts, setRetailerProducts] = useState<RetailerProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [stockFilter, setStockFilter] = useState<'all' | 'selected' | 'instock' | 'outofstock'>('all');
    // Store custom prices for each product (keyed by catalog product id)
    const [customPrices, setCustomPrices] = useState<{ [key: string]: string }>({});
    // Store competitor prices for products
    const [competitorPrices, setCompetitorPrices] = useState<CompetitorPricesMap>({});

    // Create a map of catalog_id to retailer product for quick lookup
    const retailerProductMap = useMemo(() => {
        const map = new Map<string, RetailerProduct>();
        retailerProducts.forEach(product => {
            map.set(product.catalog_id, product);
        });
        return map;
    }, [retailerProducts]);

    // Read filter from URL on mount
    useEffect(() => {
        const filter = searchParams.get('filter');
        const category = searchParams.get('category');

        // Handle stock filter
        if (filter === 'instock') {
            setStockFilter('instock');
        } else if (filter === 'outofstock') {
            setStockFilter('outofstock');
        } else if (filter === 'all' || filter === 'categories') {
            setStockFilter('selected');
        }

        // Handle category filter
        if (category) {
            setSelectedCategory(category);
            setStockFilter('selected'); // Show only retailer's products when filtering by category
        }
    }, [searchParams]);

    useEffect(() => {
        if (retailer) {
            fetchRetailerProducts();
        } else {
            setLoading(false);
        }
    }, [retailer]);

    // Initialize custom prices from retailer products when they load
    useEffect(() => {
        const prices: { [key: string]: string } = {};
        // First, load prices from retailer's saved products
        retailerProducts.forEach(product => {
            prices[product.catalog_id] = product.price.toString();
        });
        // Set default prices for products that haven't been selected yet
        catalogProducts.forEach(cp => {
            if (prices[cp.id] === undefined) {
                prices[cp.id] = cp.defaultPrice.toString();
            }
        });
        setCustomPrices(prices);
    }, [retailerProducts]);

    const fetchRetailerProducts = async () => {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('id, name, category, price, unit, in_stock, catalog_id')
                .eq('retailer_id', retailer?.id);

            if (error) throw error;
            setRetailerProducts(data || []);

            // Fetch competitor prices for the retailer's products
            if (data && data.length > 0 && retailer) {
                const catalogIds = data.map(p => p.catalog_id);
                const prices = await fetchCompetitorPrices(catalogIds, retailer.id);
                setCompetitorPrices(prices);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePriceChange = (catalogId: string, value: string) => {
        // Only allow numbers and decimal point
        // Remove any non-numeric characters except decimal point
        const sanitizedValue = value.replace(/[^0-9.]/g, '');
        // Prevent multiple decimal points
        const parts = sanitizedValue.split('.');
        const cleanValue = parts.length > 2
            ? parts[0] + '.' + parts.slice(1).join('')
            : sanitizedValue;

        setCustomPrices(prev => ({
            ...prev,
            [catalogId]: cleanValue
        }));
    };

    const handleCheckProduct = async (catalogProduct: CatalogProduct, isChecked: boolean) => {
        if (!retailer) return;

        const priceValue = parseFloat(customPrices[catalogProduct.id] || catalogProduct.defaultPrice.toString());
        if (isChecked && (isNaN(priceValue) || priceValue <= 0)) {
            alert('Please enter a valid price');
            return;
        }

        setSaving(catalogProduct.id);

        try {
            if (isChecked) {
                // Add product to retailer's inventory with custom price
                const { error } = await supabase.from('products').insert({
                    retailer_id: retailer.id,
                    catalog_id: catalogProduct.id,
                    name: catalogProduct.name,
                    category: catalogProduct.category,
                    price: priceValue,
                    unit: catalogProduct.defaultUnit,
                    in_stock: true,
                });

                if (error) throw error;
            } else {
                // Remove product from retailer's inventory
                const { error } = await supabase
                    .from('products')
                    .delete()
                    .eq('retailer_id', retailer.id)
                    .eq('catalog_id', catalogProduct.id);

                if (error) throw error;
            }

            await fetchRetailerProducts();
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Failed to update product');
        } finally {
            setSaving(null);
        }
    };

    const handleUpdatePrice = async (catalogProduct: CatalogProduct) => {
        const retailerProduct = retailerProductMap.get(catalogProduct.id);
        if (!retailerProduct || !retailer) return;

        const priceValue = parseFloat(customPrices[catalogProduct.id] || '0');
        if (isNaN(priceValue) || priceValue <= 0) {
            alert('Please enter a valid price');
            return;
        }

        setSaving(catalogProduct.id);

        try {
            const { error } = await supabase
                .from('products')
                .update({ price: priceValue, updated_at: new Date().toISOString() })
                .eq('id', retailerProduct.id);

            if (error) throw error;

            setRetailerProducts(prev =>
                prev.map(p =>
                    p.id === retailerProduct.id ? { ...p, price: priceValue } : p
                )
            );

            // Speak the price update announcement in Hindi
            speakPriceSet(catalogProduct.name_hi || catalogProduct.name, priceValue);
        } catch (error) {
            console.error('Error updating price:', error);
            alert('Failed to update price');
        } finally {
            setSaving(null);
        }
    };

    const togglePublish = async (catalogProduct: CatalogProduct) => {
        const retailerProduct = retailerProductMap.get(catalogProduct.id);
        if (!retailerProduct) return;

        const willBePublished = !retailerProduct.in_stock;
        setSaving(catalogProduct.id);

        try {
            const { error } = await supabase
                .from('products')
                .update({ in_stock: willBePublished, updated_at: new Date().toISOString() })
                .eq('id', retailerProduct.id);

            if (error) throw error;

            setRetailerProducts(prev =>
                prev.map(p =>
                    p.id === retailerProduct.id ? { ...p, in_stock: willBePublished } : p
                )
            );

            // Speak the publish/unpublish announcement
            const productName = catalogProduct.name_hi || catalogProduct.name;
            if (willBePublished) {
                speakProductPublished(productName);
            } else {
                speakProductUnpublished(productName);
            }
        } catch (error) {
            console.error('Error toggling publish:', error);
        } finally {
            setSaving(null);
        }
    };

    // Filter catalog products
    const filteredProducts = catalogProducts.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.name_hi.includes(searchQuery);
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

        // Apply stock filter
        const retailerProduct = retailerProductMap.get(product.id);
        let matchesStockFilter = true;

        if (stockFilter === 'selected') {
            // Show only products that retailer has selected
            matchesStockFilter = !!retailerProduct;
        } else if (stockFilter === 'instock') {
            // Show only products that are in stock
            matchesStockFilter = !!retailerProduct && retailerProduct.in_stock;
        } else if (stockFilter === 'outofstock') {
            // Show only products that are selected but out of stock
            matchesStockFilter = !!retailerProduct && !retailerProduct.in_stock;
        }

        return matchesSearch && matchesCategory && matchesStockFilter;
    });

    // Group products by category
    const groupedProducts = useMemo(() => {
        const groups: { [key: string]: CatalogProduct[] } = {};
        filteredProducts.forEach(product => {
            if (!groups[product.category]) {
                groups[product.category] = [];
            }
            groups[product.category].push(product);
        });
        return groups;
    }, [filteredProducts]);

    const getCategoryInfo = (categoryId: string) => {
        return categories.find(c => c.id === categoryId) || { name: categoryId, icon: '📦' };
    };

    return (
        <div className="app-layout">
            <Sidebar />
            <main className="main-content">
                <header className="page-header products-header">
                    <div>
                        <h1>Products</h1>
                        <p>Select products you have in stock and set your prices</p>
                    </div>
                    <div className="products-stats">
                        <span className="stat-badge">
                            ✓ {retailerProducts.length} selected
                        </span>
                        <span className="stat-badge published">
                            📢 {retailerProducts.filter(p => p.in_stock).length} published
                        </span>
                    </div>
                </header>

                <div className="products-toolbar">
                    <div className="search-box">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <select
                        className="category-filter"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="all">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                        ))}
                    </select>

                    <select
                        className="category-filter"
                        value={stockFilter}
                        onChange={(e) => setStockFilter(e.target.value as 'all' | 'selected' | 'instock' | 'outofstock')}
                    >
                        <option value="all">📋 All Products</option>
                        <option value="selected">✓ Selected Only</option>
                        <option value="instock">📢 In Stock</option>
                        <option value="outofstock">🔇 Out of Stock</option>
                    </select>
                </div>

                {loading ? (
                    <div className="loading-container">
                        <div className="loading-spinner large"></div>
                    </div>
                ) : (
                    <div className="products-catalog">
                        {Object.entries(groupedProducts).map(([categoryId, products]) => {
                            const categoryInfo = getCategoryInfo(categoryId);
                            return (
                                <div key={categoryId} className="category-section">
                                    <h2 className="category-header">
                                        <span className="category-icon">{categoryInfo.icon}</span>
                                        {categoryInfo.name}
                                        <span className="category-count">{products.length} items</span>
                                    </h2>
                                    <div className="products-list">
                                        {products.map(catalogProduct => {
                                            const retailerProduct = retailerProductMap.get(catalogProduct.id);
                                            const isSelected = !!retailerProduct;
                                            const isPublished = retailerProduct?.in_stock ?? false;
                                            const isSaving = saving === catalogProduct.id;
                                            const currentPrice = customPrices[catalogProduct.id] !== undefined
                                                ? customPrices[catalogProduct.id]
                                                : catalogProduct.defaultPrice.toString();
                                            const currentPriceNum = parseFloat(currentPrice) || 0;
                                            const savedPrice = retailerProduct?.price || 0;
                                            // Compare with precision to avoid floating-point issues
                                            const priceChanged = isSelected && retailerProduct &&
                                                Math.abs(currentPriceNum - savedPrice) > 0.001 &&
                                                currentPriceNum > 0;

                                            return (
                                                <div
                                                    key={catalogProduct.id}
                                                    className={`product-row ${isSelected ? 'selected' : ''} ${isSaving ? 'saving' : ''}`}
                                                >
                                                    <label className="product-checkbox">
                                                        <input
                                                            type="checkbox"
                                                            checked={isSelected}
                                                            onChange={(e) => handleCheckProduct(catalogProduct, e.target.checked)}
                                                            disabled={isSaving}
                                                        />
                                                        <span className="checkmark"></span>
                                                    </label>

                                                    <div className="product-image">
                                                        <img
                                                            src={catalogProduct.image}
                                                            alt={catalogProduct.name}
                                                            loading="lazy"
                                                        />
                                                    </div>

                                                    <div className="product-info">
                                                        <span className="product-name">{catalogProduct.name}</span>
                                                        <span className="product-name-hi">{catalogProduct.name_hi}</span>
                                                        {/* Show competitor prices for selected products */}
                                                        {isSelected && competitorPrices[catalogProduct.id] && competitorPrices[catalogProduct.id].length > 0 && (
                                                            <div className="competitor-prices">
                                                                <span className="competitor-label">🏪 Others:</span>
                                                                {competitorPrices[catalogProduct.id].slice(0, 3).map((cp, index) => (
                                                                    <span
                                                                        key={cp.retailer_id}
                                                                        className={`competitor-price ${cp.price < currentPriceNum ? 'lower' : cp.price > currentPriceNum ? 'higher' : 'same'}`}
                                                                    >
                                                                        {cp.shop_name}: ₹{cp.price}
                                                                        {index < Math.min(competitorPrices[catalogProduct.id].length, 3) - 1 && ', '}
                                                                    </span>
                                                                ))}
                                                                {competitorPrices[catalogProduct.id].length > 3 && (
                                                                    <span className="competitor-more">+{competitorPrices[catalogProduct.id].length - 3} more</span>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="product-price-input">
                                                        <span className="currency-symbol">₹</span>
                                                        <input
                                                            type="text"
                                                            inputMode="decimal"
                                                            pattern="[0-9]*\.?[0-9]*"
                                                            className="price-input"
                                                            value={currentPrice}
                                                            onChange={(e) => handlePriceChange(catalogProduct.id, e.target.value)}
                                                            placeholder={catalogProduct.defaultPrice.toString()}
                                                            disabled={isSaving}
                                                        />
                                                        <span className="product-unit">/{catalogProduct.defaultUnit}</span>
                                                        {priceChanged && (
                                                            <button
                                                                className="update-price-btn"
                                                                onClick={() => handleUpdatePrice(catalogProduct)}
                                                                disabled={isSaving}
                                                            >
                                                                Update
                                                            </button>
                                                        )}
                                                    </div>

                                                    <div className="product-actions">
                                                        {isSelected && (
                                                            <button
                                                                className={`publish-toggle ${isPublished ? 'published' : 'unpublished'}`}
                                                                onClick={() => togglePublish(catalogProduct)}
                                                                disabled={isSaving}
                                                            >
                                                                {isPublished ? '📢 Published' : '🔇 Unpublished'}
                                                            </button>
                                                        )}
                                                    </div>

                                                    {isSaving && (
                                                        <div className="saving-indicator">
                                                            <div className="loading-spinner small"></div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}

                        {Object.keys(groupedProducts).length === 0 && (
                            <div className="empty-state">
                                <span className="empty-icon">🔍</span>
                                <h3>No products found</h3>
                                <p>Try adjusting your search or category filter</p>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}

