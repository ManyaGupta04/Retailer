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
    { id: 'veg-001', name: 'Onion', name_hi: 'प्याज', category: 'vegetables', defaultUnit: 'kg', defaultPrice: 40, image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=200&h=200&fit=crop' },
    { id: 'veg-002', name: 'Tomato', name_hi: 'टमाटर', category: 'vegetables', defaultUnit: 'kg', defaultPrice: 30, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/1280px-Tomato_je.jpg' },
    { id: 'veg-003', name: 'Potato', name_hi: 'आलू', category: 'vegetables', defaultUnit: 'kg', defaultPrice: 25, image: 'https://m.media-amazon.com/images/I/41QKCkQ2A5L._AC_UF894,1000_QL80_.jpg' },
    { id: 'veg-004', name: 'Cauliflower', name_hi: 'फूलगोभी', category: 'vegetables', defaultUnit: 'piece', defaultPrice: 30, image: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=200&h=200&fit=crop' },
    { id: 'veg-005', name: 'Cabbage', name_hi: 'पत्तागोभी', category: 'vegetables', defaultUnit: 'piece', defaultPrice: 25, image: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=200&h=200&fit=crop' },
    { id: 'veg-006', name: 'Spinach', name_hi: 'पालक', category: 'vegetables', defaultUnit: 'pack', defaultPrice: 20, image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=200&h=200&fit=crop' },
    { id: 'veg-007', name: 'Green Chilli', name_hi: 'हरी मिर्च', category: 'vegetables', defaultUnit: 'kg', defaultPrice: 80, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA5cvq8kDZlGCGNoc9RDA-8ZumtyoiVPw-Gw&s' },
    { id: 'veg-008', name: 'Ginger', name_hi: 'अदरक', category: 'vegetables', defaultUnit: 'kg', defaultPrice: 120, image: 'https://dailybuyys.com/cdn/shop/products/DBROYALGINGERADDA.jpg' },
    { id: 'veg-009', name: 'Garlic', name_hi: 'लहसुन', category: 'vegetables', defaultUnit: 'kg', defaultPrice: 150, image: 'https://m.media-amazon.com/images/I/71vpJSiNYeL._AC_UF894,1000_QL80_.jpg' },
    { id: 'veg-010', name: 'Carrot', name_hi: 'गाजर', category: 'vegetables', defaultUnit: 'kg', defaultPrice: 40, image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=200&h=200&fit=crop' },
    { id: 'veg-011', name: 'Bitter Gourd', name_hi: 'करेला', category: 'vegetables', defaultUnit: 'kg', defaultPrice: 50, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDMU14v-kSc1M3e0p8rL6EdetdOZNrUSQ0Aw&s' },
    { id: 'veg-012', name: 'Bottle Gourd', name_hi: 'लौकी', category: 'vegetables', defaultUnit: 'piece', defaultPrice: 25, image: 'https://fruitique.in/cdn/shop/products/doodhi_1500_x_1500_750x810.jpg?v=1632308903' },
    { id: 'veg-013', name: 'Brinjal', name_hi: 'बैंगन', category: 'vegetables', defaultUnit: 'kg', defaultPrice: 35, image: 'https://freshclub.co.in/cdn/shop/products/Brinjal_roundblack_500g.jpg?v=1660188982' },
    { id: 'veg-014', name: 'Lady Finger', name_hi: 'भिंडी', category: 'vegetables', defaultUnit: 'kg', defaultPrice: 50, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNhfaqk_nfPG5p8oD4Q3hKU-VbjorbUzbSXw&s' },
    { id: 'veg-015', name: 'Coriander Leaves', name_hi: 'धनिया पत्ता', category: 'vegetables', defaultUnit: 'pack', defaultPrice: 10, image: 'https://storage.googleapis.com/shy-pub/224989/1660982911511_SKU-0186_0.jpg' },

    // Fruits (10 products)
    { id: 'fruit-001', name: 'Apple', name_hi: 'सेब', category: 'fruits', defaultUnit: 'kg', defaultPrice: 150, image: 'https://images.unsplash.com/photo-1584306670957-acf935f5033c?w=200&h=200&fit=crop' },
    { id: 'fruit-002', name: 'Banana', name_hi: 'केला', category: 'fruits', defaultUnit: 'dozen', defaultPrice: 50, image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=200&h=200&fit=crop' },
    { id: 'fruit-003', name: 'Orange', name_hi: 'संतरा', category: 'fruits', defaultUnit: 'kg', defaultPrice: 80, image: 'https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?w=200&h=200&fit=crop' },
    { id: 'fruit-004', name: 'Mango', name_hi: 'आम', category: 'fruits', defaultUnit: 'kg', defaultPrice: 100, image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=200&h=200&fit=crop' },
    { id: 'fruit-005', name: 'Grapes', name_hi: 'अंगूर', category: 'fruits', defaultUnit: 'kg', defaultPrice: 80, image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=200&h=200&fit=crop' },
    { id: 'fruit-006', name: 'Papaya', name_hi: 'पपीता', category: 'fruits', defaultUnit: 'piece', defaultPrice: 40, image: 'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?w=200&h=200&fit=crop' },
    { id: 'fruit-007', name: 'Watermelon', name_hi: 'तरबूज', category: 'fruits', defaultUnit: 'piece', defaultPrice: 50, image: 'https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?w=200&h=200&fit=crop' },
    { id: 'fruit-008', name: 'Pomegranate', name_hi: 'अनार', category: 'fruits', defaultUnit: 'kg', defaultPrice: 120, image: 'https://m.media-amazon.com/images/I/611a1wD9ZGL._AC_UF894,1000_QL80_.jpg' },
    { id: 'fruit-009', name: 'Guava', name_hi: 'अमरूद', category: 'fruits', defaultUnit: 'kg', defaultPrice: 60, image: 'https://png.pngtree.com/png-clipart/20241114/original/pngtree-green-guava-fruit-png-image_17014056.png' },
    { id: 'fruit-010', name: 'Lemon', name_hi: 'नींबू', category: 'fruits', defaultUnit: 'kg', defaultPrice: 80, image: 'https://images.unsplash.com/photo-1590502593747-42a996133562?w=200&h=200&fit=crop' },

    // Dairy (10 products)
    { id: 'dairy-001', name: 'Milk', name_hi: 'दूध', category: 'dairy', defaultUnit: 'L', defaultPrice: 60, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=200&fit=crop' },
    { id: 'dairy-002', name: 'Curd', name_hi: 'दही', category: 'dairy', defaultUnit: 'kg', defaultPrice: 50, image: 'https://dodladairy.com/wp-content/uploads/2024/01/Curd-cup.png.webp' },
    { id: 'dairy-003', name: 'Paneer', name_hi: 'पनीर', category: 'dairy', defaultUnit: 'kg', defaultPrice: 320, image: 'https://www.sharmispassions.com/wp-content/uploads/2012/09/homemade-paneer.jpg' },
    { id: 'dairy-004', name: 'Butter', name_hi: 'मक्खन', category: 'dairy', defaultUnit: 'g', defaultPrice: 55, image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=200&h=200&fit=crop' },
    { id: 'dairy-005', name: 'Ghee', name_hi: 'घी', category: 'dairy', defaultUnit: 'L', defaultPrice: 600, image: 'https://himalayannatives.com/storage/ProductGroup_67f4fca0ab376-4.webp' },
    { id: 'dairy-006', name: 'Cheese', name_hi: 'चीज़', category: 'dairy', defaultUnit: 'g', defaultPrice: 120, image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=200&h=200&fit=crop' },
    { id: 'dairy-007', name: 'Cream', name_hi: 'क्रीम', category: 'dairy', defaultUnit: 'mL', defaultPrice: 40, image: 'https://www.bbassets.com/media/uploads/p/l/30009314_3-amul-whipping-cream.jpg' },
    { id: 'dairy-008', name: 'Lassi', name_hi: 'लस्सी', category: 'dairy', defaultUnit: 'mL', defaultPrice: 25, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiu6Q8FY7IdI1OIPo-Us3H5DiLvpzKo8xDHA&s' },
    { id: 'dairy-009', name: 'Buttermilk', name_hi: 'छाछ', category: 'dairy', defaultUnit: 'L', defaultPrice: 30, image: 'https://m.media-amazon.com/images/I/71WnRjJeV0L.jpg' },
    { id: 'dairy-010', name: 'Ice Cream', name_hi: 'आइसक्रीम', category: 'dairy', defaultUnit: 'pack', defaultPrice: 80, image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=200&h=200&fit=crop' },

    // Grains & Pulses (15 products)
    { id: 'grain-001', name: 'Rice', name_hi: 'चावल', category: 'grains', defaultUnit: 'kg', defaultPrice: 60, image: 'https://gropharm.in/wp-content/uploads/2022/04/sugandha-steem-basmati-rice.jpeg' },
    { id: 'grain-002', name: 'Wheat Flour', name_hi: 'गेहूं आटा', category: 'grains', defaultUnit: 'kg', defaultPrice: 40, image: 'https://vaerorganic.com/wp-content/uploads/2021/01/Whole-Wheat-Flour.jpg' },
    { id: 'grain-003', name: 'Basmati Rice', name_hi: 'बासमती चावल', category: 'grains', defaultUnit: 'kg', defaultPrice: 120, image: 'https://m.media-amazon.com/images/I/81RRE6YAeaL.jpg' },
    { id: 'grain-004', name: 'Toor Dal', name_hi: 'तूर दाल', category: 'grains', defaultUnit: 'kg', defaultPrice: 140, image: 'https://rentiofoods.com/cdn/shop/products/dal1.jpg?v=1717518780&width=1445' },
    { id: 'grain-005', name: 'Moong Dal', name_hi: 'मूंग दाल', category: 'grains', defaultUnit: 'kg', defaultPrice: 130, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShPY5tc2RzS4HGqiiTPZQs1y7mCNLWIdEZGQ&s' },
    { id: 'grain-006', name: 'Chana Dal', name_hi: 'चना दाल', category: 'grains', defaultUnit: 'kg', defaultPrice: 100, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI0O1fYNWy92wpm1ynS4H15NgSWwzVxIYtIA&s' },
    { id: 'grain-007', name: 'Urad Dal', name_hi: 'उड़द दाल', category: 'grains', defaultUnit: 'kg', defaultPrice: 140, image: 'https://c.ndtvimg.com/2023-09/a9ubmmd8_urad-dal_625x300_06_September_23.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=886' },
    { id: 'grain-008', name: 'Masoor Dal', name_hi: 'मसूर दाल', category: 'grains', defaultUnit: 'kg', defaultPrice: 110, image: 'https://www.mamtaskitchen.com/images/recipes/10379-1703762841.jpg' },
    { id: 'grain-009', name: 'Besan', name_hi: 'बेसन', category: 'grains', defaultUnit: 'kg', defaultPrice: 80, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLHuZC25FS4IlV9nm9QP4tri7XiSwx0aa2pw&s' },
    { id: 'grain-010', name: 'Poha', name_hi: 'पोहा', category: 'grains', defaultUnit: 'kg', defaultPrice: 50, image: 'https://twobrothersindiashop.com/cdn/shop/articles/poha-raw-puffed-rice-calories-nutritional-value-benefits.png' },
    { id: 'grain-011', name: 'Suji', name_hi: 'सूजी', category: 'grains', defaultUnit: 'kg', defaultPrice: 45, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXn04k5wN3S9lyVlBUDJGVgxiuOKYPgg0HBA&s' },
    { id: 'grain-012', name: 'Maida', name_hi: 'मैदा', category: 'grains', defaultUnit: 'kg', defaultPrice: 45, image: 'https://m.media-amazon.com/images/I/41S7HM0DRFL._AC_UF894,1000_QL80_.jpg' },
    { id: 'grain-013', name: 'Oats', name_hi: 'ओट्स', category: 'grains', defaultUnit: 'pack', defaultPrice: 120, image: 'https://nutritionsource.hsph.harvard.edu/wp-content/uploads/2018/03/oats-701299_1920.jpg' },
    { id: 'grain-014', name: 'Rajma', name_hi: 'राजमा', category: 'grains', defaultUnit: 'kg', defaultPrice: 140, image: 'https://vibrantliving.in/cdn/shop/files/RedRajma.jpg?v=1731059712&width=2048' },
    { id: 'grain-015', name: 'Kabuli Chana', name_hi: 'काबुली चना', category: 'grains', defaultUnit: 'kg', defaultPrice: 120, image: 'https://cdn.shopaccino.com/edible-smart/products/645081_l.jpg?v=651' },

    // Spices (15 products)
    { id: 'spice-001', name: 'Turmeric Powder', name_hi: 'हल्दी पाउडर', category: 'spices', defaultUnit: 'g', defaultPrice: 30, image: 'https://www.viralspices.com/wp-content/uploads/2024/11/Untitled-1.jpg' },
    { id: 'spice-002', name: 'Red Chilli Powder', name_hi: 'लाल मिर्च पाउडर', category: 'spices', defaultUnit: 'g', defaultPrice: 40, image: 'https://www.neonaturalindustries.com/wp-content/uploads/2022/06/red-chillies.jpg' },
    { id: 'spice-003', name: 'Coriander Powder', name_hi: 'धनिया पाउडर', category: 'spices', defaultUnit: 'g', defaultPrice: 35, image: 'https://www.terraearthfood.com/cdn/shop/products/TerraCorianderPowder_1_1024x1024.jpg?v=1626012510' },
    { id: 'spice-004', name: 'Cumin Seeds', name_hi: 'जीरा', category: 'spices', defaultUnit: 'g', defaultPrice: 50, image: 'https://img1.exportersindia.com/product_images/bc-small/2025/1/13883721/watermark/dried-cumin-seeds-1728043785-7628016.jpeg' },
    { id: 'spice-005', name: 'Mustard Seeds', name_hi: 'राई', category: 'spices', defaultUnit: 'g', defaultPrice: 25, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnx04-6Sn_F4DtKCWi3UVFwnntJA2cGvhcKA&s' },
    { id: 'spice-006', name: 'Garam Masala', name_hi: 'गरम मसाला', category: 'spices', defaultUnit: 'g', defaultPrice: 60, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnUn6eCPVG6T-FAQ6gWn37UClwUj4grSyj3w&s' },
    { id: 'spice-007', name: 'Black Pepper', name_hi: 'काली मिर्च', category: 'spices', defaultUnit: 'g', defaultPrice: 80, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtAlZgZYdRKngmr89PaTPtGXl43Zk5Lq5_Cw&s' },
    { id: 'spice-008', name: 'Cardamom', name_hi: 'इलायची', category: 'spices', defaultUnit: 'g', defaultPrice: 200, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD93WNkscM7cnR7N0D6Z_KKegu6ayFIkP1ZA&s' },
    { id: 'spice-009', name: 'Cinnamon', name_hi: 'दालचीनी', category: 'spices', defaultUnit: 'g', defaultPrice: 100, image: 'https://cdn.britannica.com/07/123107-050-1520881F/bark-Cinnamomum-cassia-plant-spice.jpg' },
    { id: 'spice-010', name: 'Cloves', name_hi: 'लौंग', category: 'spices', defaultUnit: 'g', defaultPrice: 150, image: 'https://www.kushaspices.com/wp-content/uploads/2021/01/Cloves-1024x924.jpeg' },
    { id: 'spice-011', name: 'Salt', name_hi: 'नमक', category: 'spices', defaultUnit: 'kg', defaultPrice: 25, image: 'https://www.gomataseva.org/wp-content/uploads/2023/10/Namak-2.webp' },
    { id: 'spice-012', name: 'Sugar', name_hi: 'चीनी', category: 'spices', defaultUnit: 'kg', defaultPrice: 50, image: 'https://vrmshoppe.com/wp-content/uploads/2021/05/white-sugar-500x500-1.jpg' },
    { id: 'spice-013', name: 'Jaggery', name_hi: 'गुड़', category: 'spices', defaultUnit: 'kg', defaultPrice: 60, image: 'https://m.media-amazon.com/images/I/61uErQ+hStL.jpg' },
    { id: 'spice-014', name: 'Fennel Seeds', name_hi: 'सौंफ', category: 'spices', defaultUnit: 'g', defaultPrice: 40, image: 'https://vibrantliving.in/cdn/shop/files/FennelSeeds.png?v=1731060016&width=2048' },
    { id: 'spice-015', name: 'Carom Seeds', name_hi: 'अजवाइन', category: 'spices', defaultUnit: 'g', defaultPrice: 35, image: 'https://www.indianasapplepie.com/cdn/shop/articles/IMG-1246_1_7a29cb04-6c1d-4529-9292-0f6b264d61a0_2000x.jpg?v=1748286425' },

    // Oils & Ghee (8 products)
    { id: 'oil-001', name: 'Mustard Oil', name_hi: 'सरसों का तेल', category: 'oils', defaultUnit: 'L', defaultPrice: 180, image: 'https://blsmart.in/wp-content/uploads/2022/02/WhatsApp-Image-2021-09-03-at-5.18.12-PM.jpeg' },
    { id: 'oil-002', name: 'Sunflower Oil', name_hi: 'सूरजमुखी तेल', category: 'oils', defaultUnit: 'L', defaultPrice: 150, image: 'https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_600/NI_CATALOG/IMAGES/CIW/2025/8/8/f1a45371-e3a0-40bc-a00e-ea5e408dfd55_1766_1.png' },
    { id: 'oil-003', name: 'Groundnut Oil', name_hi: 'मूंगफली तेल', category: 'oils', defaultUnit: 'L', defaultPrice: 200, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtPo6co1iPCwsWQDSdeU7xFwhXa0L_nxQNrw&s' },
    { id: 'oil-004', name: 'Coconut Oil', name_hi: 'नारियल तेल', category: 'oils', defaultUnit: 'L', defaultPrice: 220, image: 'https://m.media-amazon.com/images/I/51yzcfI2TfL._SY300_SX300_QL70_FMwebp_.jpg' },
    { id: 'oil-005', name: 'Soybean Oil', name_hi: 'सोयाबीन तेल', category: 'oils', defaultUnit: 'L', defaultPrice: 140, image: 'https://rukminim2.flixcart.com/image/480/640/xif0q/edible-oil/k/p/c/-original-imahadwr8ketn3du.jpeg?q=20' },
    { id: 'oil-006', name: 'Olive Oil', name_hi: 'जैतून का तेल', category: 'oils', defaultUnit: 'mL', defaultPrice: 400, image: 'https://m.media-amazon.com/images/I/61q7gMCVw8L._SL1500_.jpg' },
    { id: 'oil-008', name: 'Ghee', name_hi: 'घी', category: 'oils', defaultUnit: 'kg', defaultPrice: 150, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRObjfTR7r3rj0A1QmAxXQiD5rxHXFvbocElQ&s' },

    // Snacks (10 products)
    { id: 'snack-001', name: 'Namkeen Mix', name_hi: 'नमकीन मिक्स', category: 'snacks', defaultUnit: 'pack', defaultPrice: 30, image: 'https://www.godavarivantillu.com/cdn/shop/files/AndhraMixture.png?v=1709701174' },
    { id: 'snack-002', name: 'Biscuits', name_hi: 'बिस्कुट', category: 'snacks', defaultUnit: 'pack', defaultPrice: 25, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcf-2Uzpi3Ks3G1tFsvem-f4ZvihQRYDLIWA&s' },
    { id: 'snack-003', name: 'Chips', name_hi: 'चिप्स', category: 'snacks', defaultUnit: 'pack', defaultPrice: 20, image: 'https://cdn.jwplayer.com/v2/media/nMl8eZUh/thumbnails/BB7Ik4b4.jpg?width=1280' },
    { id: 'snack-004', name: 'Maggi', name_hi: 'मैगी', category: 'snacks', defaultUnit: 'pack', defaultPrice: 14, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5B8ybYTVnOK6LUpbJy12YFt-Qn8M5_F_dGw&s' },
    { id: 'snack-005', name: 'Bread', name_hi: 'ब्रेड', category: 'snacks', defaultUnit: 'pack', defaultPrice: 40, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0rv_WYWixSRRSfTKvNgYiqfmxaeqQfFf4bg&s' },
    { id: 'snack-006', name: 'Rusk', name_hi: 'रस्क', category: 'snacks', defaultUnit: 'pack', defaultPrice: 35, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCUK0eywWKwcjMiPoa94UEJltjkp091Ixk9Q&s' },
    { id: 'snack-007', name: 'Mathri', name_hi: 'मठरी', category: 'snacks', defaultUnit: 'kg', defaultPrice: 150, image: 'https://c.ndtvimg.com/2024-07/lmjq4vko_mathri_625x300_04_July_24.jpg' },
    { id: 'snack-008', name: 'Papad', name_hi: 'पापड़', category: 'snacks', defaultUnit: 'pack', defaultPrice: 50, image: 'https://bajarhaat.com/wp-content/uploads/2024/06/Masala-Papad.webp' },
    { id: 'snack-009', name: 'Pickle', name_hi: 'अचार', category: 'snacks', defaultUnit: 'kg', defaultPrice: 120, image: 'https://www.foodriteindia.com/admin/assets/sub_product/2304201254336440e8b14931d.jpg' },
    { id: 'snack-010', name: 'Jam', name_hi: 'जैम', category: 'snacks', defaultUnit: 'pack', defaultPrice: 80, image: 'https://gropharm.in/wp-content/uploads/2021/01/441.jpg' },

    // Beverages (9 products)
    { id: 'bev-001', name: 'Tea', name_hi: 'चाय', category: 'beverages', defaultUnit: 'g', defaultPrice: 40, image: 'https://tiimg.tistatic.com/fp/1/006/458/dark-brown-tea-leaves-088.jpg' },
    { id: 'bev-002', name: 'Coffee', name_hi: 'कॉफ़ी', category: 'beverages', defaultUnit: 'g', defaultPrice: 80, image: 'https://m.media-amazon.com/images/I/41vtbfRizqL._SY300_SX300_QL70_FMwebp_.jpg' },
    { id: 'bev-003', name: 'Soft Drink', name_hi: 'कोल्ड ड्रिंक', category: 'beverages', defaultUnit: 'mL', defaultPrice: 40, image: 'https://5.imimg.com/data5/SELLER/Default/2020/10/FP/GL/OA/521830/soft-drinks.jpg' },
    { id: 'bev-004', name: 'Juice', name_hi: 'जूस', category: 'beverages', defaultUnit: 'L', defaultPrice: 100, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9q_aMi6kNd72BsuNhcUj-mvmV2k9q64Nzhg&s' },
    { id: 'bev-006', name: 'Energy Drink', name_hi: 'एनर्जी ड्रिंक', category: 'beverages', defaultUnit: 'mL', defaultPrice: 100, image: 'https://m.media-amazon.com/images/I/51Bp30CR3IL.jpg' },
    { id: 'bev-007', name: 'Bournvita', name_hi: 'बॉर्नविटा', category: 'beverages', defaultUnit: 'g', defaultPrice: 250, image: 'https://m.media-amazon.com/images/I/51kx5lYakhL._AC_UF1000,1000_QL80_.jpg' },
    { id: 'bev-008', name: 'Complan', name_hi: 'कॉम्प्लान', category: 'beverages', defaultUnit: 'g', defaultPrice: 280, image: 'https://m.media-amazon.com/images/I/814MOiOm53L._AC_UF1000,1000_QL80_.jpg' },
    { id: 'bev-009', name: 'Horlicks', name_hi: 'हॉर्लिक्स', category: 'beverages', defaultUnit: 'g', defaultPrice: 300, image: 'https://gropharm.in/wp-content/uploads/2023/05/610lrPcJvfL._SL1000_.jpg' },

    // Personal Care (5 products)
    { id: 'care-001', name: 'Soap', name_hi: 'साबुन', category: 'personal_care', defaultUnit: 'piece', defaultPrice: 40, image: 'https://satopradhan.com/cdn/shop/files/Preview-1Almond_SheaSoap_1200x1200.jpg?v=1713608647' },
    { id: 'care-002', name: 'Shampoo', name_hi: 'शैम्पू', category: 'personal_care', defaultUnit: 'mL', defaultPrice: 120, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA9Iqthxv2ZOSN4yZ3J_0K1iCn2hYVfNfURg&s' },
    { id: 'care-003', name: 'Toothpaste', name_hi: 'टूथपेस्ट', category: 'personal_care', defaultUnit: 'g', defaultPrice: 60, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7yY6ehCULxunCGwUre4_lCVjGeLI-w57kTQ&s' },
    { id: 'care-004', name: 'Hair Oil', name_hi: 'बालों का तेल', category: 'personal_care', defaultUnit: 'mL', defaultPrice: 80, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThRuezA0ge5SStT07uNPtim8sQq-eoBI-Exw&s' },
    { id: 'care-005', name: 'Face Cream', name_hi: 'फेस क्रीम', category: 'personal_care', defaultUnit: 'g', defaultPrice: 100, image: 'https://images-static.nykaa.com/media/catalog/product/6/a/6a9866c8901138504519.jpg?tr=w-500' },

    // Household (5 products)
    { id: 'house-001', name: 'Detergent', name_hi: 'डिटर्जेंट', category: 'household', defaultUnit: 'kg', defaultPrice: 100, image: 'https://www.rossari.com/wp-content/uploads/2019/12/Detergent-Powder-prod.jpg' },
    { id: 'house-002', name: 'Dish Wash', name_hi: 'बर्तन धोने का साबुन', category: 'household', defaultUnit: 'mL', defaultPrice: 50, image: 'https://www.vishalmegamart.com/dw/image/v2/BGHT_PRD/on/demandware.static/-/Sites-vmm-fmcg-master-catalog/default/dwe5934c51/images/large/1311003244.jpg?sw=900&sh=900' },
    { id: 'house-003', name: 'Floor Cleaner', name_hi: 'फ्लोर क्लीनर', category: 'household', defaultUnit: 'L', defaultPrice: 80, image: 'https://www.bbassets.com/media/uploads/p/l/263839_17-lizol-disinfectant-surface-floor-cleaner-liquid-citrus-kills-999-germs.jpg' },
    { id: 'house-004', name: 'Toilet Cleaner', name_hi: 'टॉयलेट क्लीनर', category: 'household', defaultUnit: 'mL', defaultPrice: 60, image: 'https://www.harpic.co.in/static/290f937bae5d0064c964d0120b232c58/83a9c/Harpic_-_IN_-_en-IN-harpic_power_plus_original_toilet_cleaner.webp' },
    { id: 'house-005', name: 'Matchbox', name_hi: 'माचिस', category: 'household', defaultUnit: 'pack', defaultPrice: 5, image: 'https://m.media-amazon.com/images/I/71+bZHbiPIL._AC_UF1000,1000_QL80_.jpg' },
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
