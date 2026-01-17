export type Retailer = {
  id: string;
  shop_name: string;
  shop_address: string | null;
  phone: string | null;
  email: string;
  created_at: string;
  google_maps_link?: string;
  opening_time?: string;
  closing_time?: string;
  allows_pickup?: boolean;
  allows_delivery?: boolean;
};

export type Product = {
  id: string;
  retailer_id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  in_stock: boolean;
  image_url: string | null;
  created_at: string;
  updated_at: string;
};

export type Category = {
  id: string;
  name: string;
  name_hi: string;
  icon: string;
};

export type ProductFormData = Omit<Product, 'id' | 'retailer_id' | 'created_at' | 'updated_at'>;

// Order item interface
export type OrderItem = {
  id: string;
  name: string;
  nameHi?: string;
  quantity: number;
  price: number;
  image_url?: string;
};

// Order interface matching Supabase schema
export type Order = {
  id: string;
  order_number: string;
  otp_code: string;

  // Customer Info
  customer_name: string;
  customer_phone: string;
  customer_address?: string;

  // Retailer Info
  retailer_id: string;
  shop_name: string;
  shop_phone?: string;
  shop_address?: string;

  // Order Details
  items: OrderItem[];
  subtotal: number;
  delivery_fee: number;
  total: number;
  mode: 'pickup' | 'delivery';

  // Status
  status: 'pending' | 'ongoing' | 'completed' | 'cancelled';
  cancelled_reason?: string;

  // Timestamps
  created_at: string;
  accepted_at?: string;
  completed_at?: string;
  expires_at?: string;
};
