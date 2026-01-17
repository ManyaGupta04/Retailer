// Hardcoded catalog of products for retailers with images
export interface CatalogProduct {
    id: string;
    name: string;
    name_hi: string;
    category: string;
    defaultUnit: string;
    defaultPrice: number;
    image: string;
}

export const catalogProducts: CatalogProduct[] = [
    // Vegetables (15 products)
    { id: 'veg-001', name: 'Onion', name_hi: 'प्याज', category: 'vegetables', defaultUnit: 'kg', defaultPrice: 40, image: 'https://images.pexels.com/photos/4197444/pexels-photo-4197444.jpeg?w=100&h=100&fit=crop' },
    { id: 'veg-002', name: 'Tomato', name_hi: 'टमाटर', category: 'vegetables', defaultUnit: 'kg', defaultPrice: 30, image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?w=100&h=100&fit=crop' },
    { id: 'veg-003', name: 'Potato', name_hi: 'आलू', category: 'vegetables', defaultUnit: 'kg', defaultPrice: 25, image: 'https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?w=100&h=100&fit=crop' },
    { id: 'veg-004', name: 'Cauliflower', name_hi: 'फूलगोभी', category: 'vegetables', defaultUnit: 'piece', defaultPrice: 30, image: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=100&h=100&fit=crop' },
    { id: 'veg-005', name: 'Cabbage', name_hi: 'पत्तागोभी', category: 'vegetables', defaultUnit: 'piece', defaultPrice: 25, image: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=100&h=100&fit=crop' },
    { id: 'veg-006', name: 'Spinach', name_hi: 'पालक', category: 'vegetables', defaultUnit: 'pack', defaultPrice: 20, image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=100&h=100&fit=crop' },
    { id: 'veg-007', name: 'Green Chilli', name_hi: 'हरी मिर्च', category: 'vegetables', defaultUnit: 'kg', defaultPrice: 80, image: 'https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=100&h=100&fit=crop' },
    { id: 'veg-008', name: 'Ginger', name_hi: 'अदरक', category: 'vegetables', defaultUnit: 'kg', defaultPrice: 120, image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=100&h=100&fit=crop' },
    { id: 'veg-009', name: 'Garlic', name_hi: 'लहसुन', category: 'vegetables', defaultUnit: 'kg', defaultPrice: 150, image: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2f83?w=100&h=100&fit=crop' },
    { id: 'veg-010', name: 'Carrot', name_hi: 'गाजर', category: 'vegetables', defaultUnit: 'kg', defaultPrice: 40, image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=100&h=100&fit=crop' },
    { id: 'veg-011', name: 'Bitter Gourd', name_hi: 'करेला', category: 'vegetables', defaultUnit: 'kg', defaultPrice: 50, image: 'https://images.unsplash.com/photo-1604145559206-e3bce0040e2d?w=100&h=100&fit=crop' },
    { id: 'veg-012', name: 'Bottle Gourd', name_hi: 'लौकी', category: 'vegetables', defaultUnit: 'piece', defaultPrice: 25, image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=100&h=100&fit=crop' },
    { id: 'veg-013', name: 'Brinjal', name_hi: 'बैंगन', category: 'vegetables', defaultUnit: 'kg', defaultPrice: 35, image: 'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=100&h=100&fit=crop' },
    { id: 'veg-014', name: 'Lady Finger', name_hi: 'भिंडी', category: 'vegetables', defaultUnit: 'kg', defaultPrice: 50, image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=100&h=100&fit=crop' },
    { id: 'veg-015', name: 'Coriander Leaves', name_hi: 'धनिया पत्ता', category: 'vegetables', defaultUnit: 'pack', defaultPrice: 10, image: 'https://images.unsplash.com/photo-1506073881649-4eb74f61e6dd?w=100&h=100&fit=crop' },

    // Fruits (10 products)
    { id: 'fruit-001', name: 'Apple', name_hi: 'सेब', category: 'fruits', defaultUnit: 'kg', defaultPrice: 150, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=100&h=100&fit=crop' },
    { id: 'fruit-002', name: 'Banana', name_hi: 'केला', category: 'fruits', defaultUnit: 'dozen', defaultPrice: 50, image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=100&h=100&fit=crop' },
    { id: 'fruit-003', name: 'Orange', name_hi: 'संतरा', category: 'fruits', defaultUnit: 'kg', defaultPrice: 80, image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=100&h=100&fit=crop' },
    { id: 'fruit-004', name: 'Mango', name_hi: 'आम', category: 'fruits', defaultUnit: 'kg', defaultPrice: 100, image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=100&h=100&fit=crop' },
    { id: 'fruit-005', name: 'Grapes', name_hi: 'अंगूर', category: 'fruits', defaultUnit: 'kg', defaultPrice: 80, image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=100&h=100&fit=crop' },
    { id: 'fruit-006', name: 'Papaya', name_hi: 'पपीता', category: 'fruits', defaultUnit: 'piece', defaultPrice: 40, image: 'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?w=100&h=100&fit=crop' },
    { id: 'fruit-007', name: 'Watermelon', name_hi: 'तरबूज', category: 'fruits', defaultUnit: 'piece', defaultPrice: 50, image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=100&h=100&fit=crop' },
    { id: 'fruit-008', name: 'Pomegranate', name_hi: 'अनार', category: 'fruits', defaultUnit: 'kg', defaultPrice: 120, image: 'https://images.unsplash.com/photo-1541344999736-4a22984ab576?w=100&h=100&fit=crop' },
    { id: 'fruit-009', name: 'Guava', name_hi: 'अमरूद', category: 'fruits', defaultUnit: 'kg', defaultPrice: 60, image: 'https://images.unsplash.com/photo-1536511132770-e5058c7e8c46?w=100&h=100&fit=crop' },
    { id: 'fruit-010', name: 'Lemon', name_hi: 'नींबू', category: 'fruits', defaultUnit: 'kg', defaultPrice: 80, image: 'https://images.unsplash.com/photo-1590502593747-42a996133562?w=100&h=100&fit=crop' },

    // Dairy (10 products)
    { id: 'dairy-001', name: 'Milk', name_hi: 'दूध', category: 'dairy', defaultUnit: 'L', defaultPrice: 60, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=100&h=100&fit=crop' },
    { id: 'dairy-002', name: 'Curd', name_hi: 'दही', category: 'dairy', defaultUnit: 'kg', defaultPrice: 50, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=100&h=100&fit=crop' },
    { id: 'dairy-003', name: 'Paneer', name_hi: 'पनीर', category: 'dairy', defaultUnit: 'kg', defaultPrice: 320, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=100&h=100&fit=crop' },
    { id: 'dairy-004', name: 'Butter', name_hi: 'मक्खन', category: 'dairy', defaultUnit: 'g', defaultPrice: 55, image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=100&h=100&fit=crop' },
    { id: 'dairy-005', name: 'Ghee', name_hi: 'घी', category: 'dairy', defaultUnit: 'L', defaultPrice: 600, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=100&h=100&fit=crop' },
    { id: 'dairy-006', name: 'Cheese', name_hi: 'चीज़', category: 'dairy', defaultUnit: 'g', defaultPrice: 120, image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=100&h=100&fit=crop' },
    { id: 'dairy-007', name: 'Cream', name_hi: 'क्रीम', category: 'dairy', defaultUnit: 'mL', defaultPrice: 40, image: 'https://images.unsplash.com/photo-1457217619704-f30177c6d1e8?w=100&h=100&fit=crop' },
    { id: 'dairy-008', name: 'Lassi', name_hi: 'लस्सी', category: 'dairy', defaultUnit: 'mL', defaultPrice: 25, image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=100&h=100&fit=crop' },
    { id: 'dairy-009', name: 'Buttermilk', name_hi: 'छाछ', category: 'dairy', defaultUnit: 'L', defaultPrice: 30, image: 'https://images.unsplash.com/photo-1523473827533-2a64d0d36748?w=100&h=100&fit=crop' },
    { id: 'dairy-010', name: 'Ice Cream', name_hi: 'आइसक्रीम', category: 'dairy', defaultUnit: 'pack', defaultPrice: 80, image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=100&h=100&fit=crop' },

    // Grains & Pulses (15 products)
    { id: 'grain-001', name: 'Rice', name_hi: 'चावल', category: 'grains', defaultUnit: 'kg', defaultPrice: 60, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100&h=100&fit=crop' },
    { id: 'grain-002', name: 'Wheat Flour', name_hi: 'गेहूं आटा', category: 'grains', defaultUnit: 'kg', defaultPrice: 40, image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=100&h=100&fit=crop' },
    { id: 'grain-003', name: 'Basmati Rice', name_hi: 'बासमती चावल', category: 'grains', defaultUnit: 'kg', defaultPrice: 120, image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=100&h=100&fit=crop' },
    { id: 'grain-004', name: 'Toor Dal', name_hi: 'तूर दाल', category: 'grains', defaultUnit: 'kg', defaultPrice: 140, image: 'https://images.unsplash.com/photo-1585996746446-306df4c0cca7?w=100&h=100&fit=crop' },
    { id: 'grain-005', name: 'Moong Dal', name_hi: 'मूंग दाल', category: 'grains', defaultUnit: 'kg', defaultPrice: 130, image: 'https://images.unsplash.com/photo-1612257416648-ee7a6c533b4f?w=100&h=100&fit=crop' },
    { id: 'grain-006', name: 'Chana Dal', name_hi: 'चना दाल', category: 'grains', defaultUnit: 'kg', defaultPrice: 100, image: 'https://images.unsplash.com/photo-1613743983303-b3e89f8a2b80?w=100&h=100&fit=crop' },
    { id: 'grain-007', name: 'Urad Dal', name_hi: 'उड़द दाल', category: 'grains', defaultUnit: 'kg', defaultPrice: 140, image: 'https://images.unsplash.com/photo-1612257998531-35f5c6303a1c?w=100&h=100&fit=crop' },
    { id: 'grain-008', name: 'Masoor Dal', name_hi: 'मसूर दाल', category: 'grains', defaultUnit: 'kg', defaultPrice: 110, image: 'https://images.unsplash.com/photo-1585147388451-a86ee4f2c9a1?w=100&h=100&fit=crop' },
    { id: 'grain-009', name: 'Besan', name_hi: 'बेसन', category: 'grains', defaultUnit: 'kg', defaultPrice: 80, image: 'https://images.unsplash.com/photo-1631448374573-2c5c48c6b68d?w=100&h=100&fit=crop' },
    { id: 'grain-010', name: 'Poha', name_hi: 'पोहा', category: 'grains', defaultUnit: 'kg', defaultPrice: 50, image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=100&h=100&fit=crop' },
    { id: 'grain-011', name: 'Suji', name_hi: 'सूजी', category: 'grains', defaultUnit: 'kg', defaultPrice: 45, image: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=100&h=100&fit=crop' },
    { id: 'grain-012', name: 'Maida', name_hi: 'मैदा', category: 'grains', defaultUnit: 'kg', defaultPrice: 45, image: 'https://images.unsplash.com/photo-1547714190-3a2c4c343c67?w=100&h=100&fit=crop' },
    { id: 'grain-013', name: 'Oats', name_hi: 'ओट्स', category: 'grains', defaultUnit: 'pack', defaultPrice: 120, image: 'https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?w=100&h=100&fit=crop' },
    { id: 'grain-014', name: 'Rajma', name_hi: 'राजमा', category: 'grains', defaultUnit: 'kg', defaultPrice: 140, image: 'https://images.unsplash.com/photo-1585668377888-5c6e3ed3d08e?w=100&h=100&fit=crop' },
    { id: 'grain-015', name: 'Kabuli Chana', name_hi: 'काबुली चना', category: 'grains', defaultUnit: 'kg', defaultPrice: 120, image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=100&h=100&fit=crop' },

    // Spices (15 products)
    { id: 'spice-001', name: 'Turmeric Powder', name_hi: 'हल्दी पाउडर', category: 'spices', defaultUnit: 'g', defaultPrice: 30, image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=100&h=100&fit=crop' },
    { id: 'spice-002', name: 'Red Chilli Powder', name_hi: 'लाल मिर्च पाउडर', category: 'spices', defaultUnit: 'g', defaultPrice: 40, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=100&h=100&fit=crop' },
    { id: 'spice-003', name: 'Coriander Powder', name_hi: 'धनिया पाउडर', category: 'spices', defaultUnit: 'g', defaultPrice: 35, image: 'https://images.unsplash.com/photo-1599909533402-1cf2f1c4a8f5?w=100&h=100&fit=crop' },
    { id: 'spice-004', name: 'Cumin Seeds', name_hi: 'जीरा', category: 'spices', defaultUnit: 'g', defaultPrice: 50, image: 'https://images.unsplash.com/photo-1599909533402-1cf2f1c4a8f5?w=100&h=100&fit=crop' },
    { id: 'spice-005', name: 'Mustard Seeds', name_hi: 'राई', category: 'spices', defaultUnit: 'g', defaultPrice: 25, image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=100&h=100&fit=crop' },
    { id: 'spice-006', name: 'Garam Masala', name_hi: 'गरम मसाला', category: 'spices', defaultUnit: 'g', defaultPrice: 60, image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8c56c8b?w=100&h=100&fit=crop' },
    { id: 'spice-007', name: 'Black Pepper', name_hi: 'काली मिर्च', category: 'spices', defaultUnit: 'g', defaultPrice: 80, image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=100&h=100&fit=crop' },
    { id: 'spice-008', name: 'Cardamom', name_hi: 'इलायची', category: 'spices', defaultUnit: 'g', defaultPrice: 200, image: 'https://images.unsplash.com/photo-1599921817968-2b7a7fef4a17?w=100&h=100&fit=crop' },
    { id: 'spice-009', name: 'Cinnamon', name_hi: 'दालचीनी', category: 'spices', defaultUnit: 'g', defaultPrice: 100, image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=100&h=100&fit=crop' },
    { id: 'spice-010', name: 'Cloves', name_hi: 'लौंग', category: 'spices', defaultUnit: 'g', defaultPrice: 150, image: 'https://images.unsplash.com/photo-1596040033165-c10a9dc5f78f?w=100&h=100&fit=crop' },
    { id: 'spice-011', name: 'Salt', name_hi: 'नमक', category: 'spices', defaultUnit: 'kg', defaultPrice: 25, image: 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=100&h=100&fit=crop' },
    { id: 'spice-012', name: 'Sugar', name_hi: 'चीनी', category: 'spices', defaultUnit: 'kg', defaultPrice: 50, image: 'https://images.unsplash.com/photo-1581268386142-0ac0c5ebedd3?w=100&h=100&fit=crop' },
    { id: 'spice-013', name: 'Jaggery', name_hi: 'गुड़', category: 'spices', defaultUnit: 'kg', defaultPrice: 60, image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=100&h=100&fit=crop' },
    { id: 'spice-014', name: 'Fennel Seeds', name_hi: 'सौंफ', category: 'spices', defaultUnit: 'g', defaultPrice: 40, image: 'https://images.unsplash.com/photo-1596040033165-c10a9dc5f78f?w=100&h=100&fit=crop' },
    { id: 'spice-015', name: 'Ajwain', name_hi: 'अजवाइन', category: 'spices', defaultUnit: 'g', defaultPrice: 35, image: 'https://images.unsplash.com/photo-1596040033165-c10a9dc5f78f?w=100&h=100&fit=crop' },

    // Oils & Ghee (8 products)
    { id: 'oil-001', name: 'Mustard Oil', name_hi: 'सरसों का तेल', category: 'oils', defaultUnit: 'L', defaultPrice: 180, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=100&h=100&fit=crop' },
    { id: 'oil-002', name: 'Sunflower Oil', name_hi: 'सूरजमुखी तेल', category: 'oils', defaultUnit: 'L', defaultPrice: 150, image: 'https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=100&h=100&fit=crop' },
    { id: 'oil-003', name: 'Groundnut Oil', name_hi: 'मूंगफली तेल', category: 'oils', defaultUnit: 'L', defaultPrice: 200, image: 'https://images.unsplash.com/photo-1593351799227-75df2026356b?w=100&h=100&fit=crop' },
    { id: 'oil-004', name: 'Coconut Oil', name_hi: 'नारियल तेल', category: 'oils', defaultUnit: 'L', defaultPrice: 220, image: 'https://images.unsplash.com/photo-1608611697109-d4d1a6e9b6f7?w=100&h=100&fit=crop' },
    { id: 'oil-005', name: 'Soybean Oil', name_hi: 'सोयाबीन तेल', category: 'oils', defaultUnit: 'L', defaultPrice: 140, image: 'https://images.unsplash.com/photo-1593351799227-75df2026356b?w=100&h=100&fit=crop' },
    { id: 'oil-006', name: 'Olive Oil', name_hi: 'जैतून का तेल', category: 'oils', defaultUnit: 'mL', defaultPrice: 400, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=100&h=100&fit=crop' },
    { id: 'oil-007', name: 'Refined Oil', name_hi: 'रिफाइंड तेल', category: 'oils', defaultUnit: 'L', defaultPrice: 130, image: 'https://images.unsplash.com/photo-1593351799227-75df2026356b?w=100&h=100&fit=crop' },
    { id: 'oil-008', name: 'Vanaspati Ghee', name_hi: 'वनस्पति घी', category: 'oils', defaultUnit: 'kg', defaultPrice: 150, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=100&h=100&fit=crop' },

    // Snacks (10 products)
    { id: 'snack-001', name: 'Namkeen Mix', name_hi: 'नमकीन मिक्स', category: 'snacks', defaultUnit: 'pack', defaultPrice: 30, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=100&h=100&fit=crop' },
    { id: 'snack-002', name: 'Biscuits', name_hi: 'बिस्कुट', category: 'snacks', defaultUnit: 'pack', defaultPrice: 25, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=100&h=100&fit=crop' },
    { id: 'snack-003', name: 'Chips', name_hi: 'चिप्स', category: 'snacks', defaultUnit: 'pack', defaultPrice: 20, image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=100&h=100&fit=crop' },
    { id: 'snack-004', name: 'Maggi', name_hi: 'मैगी', category: 'snacks', defaultUnit: 'pack', defaultPrice: 14, image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=100&h=100&fit=crop' },
    { id: 'snack-005', name: 'Bread', name_hi: 'ब्रेड', category: 'snacks', defaultUnit: 'pack', defaultPrice: 40, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100&h=100&fit=crop' },
    { id: 'snack-006', name: 'Rusk', name_hi: 'रस्क', category: 'snacks', defaultUnit: 'pack', defaultPrice: 35, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=100&h=100&fit=crop' },
    { id: 'snack-007', name: 'Mathri', name_hi: 'मठरी', category: 'snacks', defaultUnit: 'kg', defaultPrice: 150, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=100&h=100&fit=crop' },
    { id: 'snack-008', name: 'Papad', name_hi: 'पापड़', category: 'snacks', defaultUnit: 'pack', defaultPrice: 50, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=100&h=100&fit=crop' },
    { id: 'snack-009', name: 'Pickle', name_hi: 'अचार', category: 'snacks', defaultUnit: 'kg', defaultPrice: 120, image: 'https://images.unsplash.com/photo-1589135716294-6353f2f4c987?w=100&h=100&fit=crop' },
    { id: 'snack-010', name: 'Jam', name_hi: 'जैम', category: 'snacks', defaultUnit: 'pack', defaultPrice: 80, image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=100&h=100&fit=crop' },

    // Beverages (7 products)
    { id: 'bev-001', name: 'Tea', name_hi: 'चाय', category: 'beverages', defaultUnit: 'g', defaultPrice: 40, image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=100&h=100&fit=crop' },
    { id: 'bev-002', name: 'Coffee', name_hi: 'कॉफ़ी', category: 'beverages', defaultUnit: 'g', defaultPrice: 80, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=100&h=100&fit=crop' },
    { id: 'bev-003', name: 'Soft Drink', name_hi: 'कोल्ड ड्रिंक', category: 'beverages', defaultUnit: 'mL', defaultPrice: 40, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=100&h=100&fit=crop' },
    { id: 'bev-004', name: 'Juice', name_hi: 'जूस', category: 'beverages', defaultUnit: 'L', defaultPrice: 100, image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=100&h=100&fit=crop' },
    { id: 'bev-005', name: 'Mineral Water', name_hi: 'मिनरल वाटर', category: 'beverages', defaultUnit: 'L', defaultPrice: 20, image: 'https://images.unsplash.com/photo-1560023907-5f339617ea30?w=100&h=100&fit=crop' },
    { id: 'bev-006', name: 'Energy Drink', name_hi: 'एनर्जी ड्रिंक', category: 'beverages', defaultUnit: 'mL', defaultPrice: 100, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=100&h=100&fit=crop' },
    { id: 'bev-007', name: 'Bournvita', name_hi: 'बॉर्नविटा', category: 'beverages', defaultUnit: 'g', defaultPrice: 250, image: 'https://images.unsplash.com/photo-1571942676516-bcab84649e44?w=100&h=100&fit=crop' },

    // Personal Care (5 products)
    { id: 'care-001', name: 'Soap', name_hi: 'साबुन', category: 'personal_care', defaultUnit: 'piece', defaultPrice: 40, image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=100&h=100&fit=crop' },
    { id: 'care-002', name: 'Shampoo', name_hi: 'शैम्पू', category: 'personal_care', defaultUnit: 'mL', defaultPrice: 120, image: 'https://images.unsplash.com/photo-1594997756806-df59ffaae1ea?w=100&h=100&fit=crop' },
    { id: 'care-003', name: 'Toothpaste', name_hi: 'टूथपेस्ट', category: 'personal_care', defaultUnit: 'g', defaultPrice: 60, image: 'https://images.unsplash.com/photo-1628258334105-2a0b3d6efee1?w=100&h=100&fit=crop' },
    { id: 'care-004', name: 'Hair Oil', name_hi: 'बालों का तेल', category: 'personal_care', defaultUnit: 'mL', defaultPrice: 80, image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=100&h=100&fit=crop' },
    { id: 'care-005', name: 'Face Cream', name_hi: 'फेस क्रीम', category: 'personal_care', defaultUnit: 'g', defaultPrice: 100, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&h=100&fit=crop' },

    // Household (5 products)
    { id: 'house-001', name: 'Detergent', name_hi: 'डिटर्जेंट', category: 'household', defaultUnit: 'kg', defaultPrice: 100, image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=100&h=100&fit=crop' },
    { id: 'house-002', name: 'Dish Wash', name_hi: 'बर्तन धोने का साबुन', category: 'household', defaultUnit: 'mL', defaultPrice: 50, image: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=100&h=100&fit=crop' },
    { id: 'house-003', name: 'Floor Cleaner', name_hi: 'फ्लोर क्लीनर', category: 'household', defaultUnit: 'L', defaultPrice: 80, image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=100&h=100&fit=crop' },
    { id: 'house-004', name: 'Toilet Cleaner', name_hi: 'टॉयलेट क्लीनर', category: 'household', defaultUnit: 'mL', defaultPrice: 60, image: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=100&h=100&fit=crop' },
    { id: 'house-005', name: 'Matchbox', name_hi: 'माचिस', category: 'household', defaultUnit: 'pack', defaultPrice: 5, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop' },
];

// Helper to get products by category
export const getProductsByCategory = (category: string): CatalogProduct[] => {
    return catalogProducts.filter(p => p.category === category);
};

// Helper to get all unique categories
export const getCategories = (): string[] => {
    return [...new Set(catalogProducts.map(p => p.category))];
};

// Helper to get product by ID
export const getProductById = (id: string): CatalogProduct | undefined => {
    return catalogProducts.find(p => p.id === id);
};
