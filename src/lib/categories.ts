import type { Category } from '../types';

export const categories: Category[] = [
    { id: 'vegetables', name: 'Vegetables', name_hi: 'सब्जियां', icon: '🥬' },
    { id: 'fruits', name: 'Fruits', name_hi: 'फल', icon: '🍎' },
    { id: 'dairy', name: 'Dairy', name_hi: 'डेयरी', icon: '🥛' },
    { id: 'grains', name: 'Grains & Pulses', name_hi: 'अनाज और दालें', icon: '🌾' },
    { id: 'spices', name: 'Spices', name_hi: 'मसाले', icon: '🌶️' },
    { id: 'oils', name: 'Oils & Ghee', name_hi: 'तेल और घी', icon: '🫒' },
    { id: 'snacks', name: 'Snacks', name_hi: 'नाश्ता', icon: '🍿' },
    { id: 'beverages', name: 'Beverages', name_hi: 'पेय पदार्थ', icon: '🥤' },
    { id: 'personal_care', name: 'Personal Care', name_hi: 'व्यक्तिगत देखभाल', icon: '🧴' },
    { id: 'household', name: 'Household', name_hi: 'घरेलू सामान', icon: '🧹' },
];

export const units = [
    { value: 'kg', label: 'Kilogram (kg)' },
    { value: 'g', label: 'Gram (g)' },
    { value: 'L', label: 'Litre (L)' },
    { value: 'mL', label: 'Millilitre (mL)' },
    { value: 'piece', label: 'Piece' },
    { value: 'pack', label: 'Pack' },
    { value: 'dozen', label: 'Dozen' },
];
