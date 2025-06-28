import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Category = {
  id: string;
  name: string;
  description: string;
  image_url: string;
  slug: string;
  created_at: string;
};

export type Product = {
  id: string;
  code_name: string;
  name: string;
  description: string;
  price: number;
  category_id: string;
  images: string[];
  dimensions: {
    length?: string;
    width?: string;
    height?: string;
  };
  age_range: string;
  in_stock: boolean;
  featured: boolean;
  created_at: string;
  category?: Category;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Order = {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  shipping_address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  total_amount: number;
  status: string;
  created_at: string;
};