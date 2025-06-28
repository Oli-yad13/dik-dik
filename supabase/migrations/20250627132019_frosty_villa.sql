/*
  # Dik Dik Kids Furniture E-commerce Schema

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `image_url` (text)
      - `slug` (text, unique)
      - `created_at` (timestamp)
    - `products`
      - `id` (uuid, primary key)
      - `code_name` (text, unique)
      - `name` (text)
      - `description` (text)
      - `price` (decimal)
      - `category_id` (uuid, foreign key)
      - `images` (jsonb array)
      - `dimensions` (jsonb)
      - `age_range` (text)
      - `in_stock` (boolean)
      - `featured` (boolean)
      - `created_at` (timestamp)
    - `orders`
      - `id` (uuid, primary key)
      - `customer_name` (text)
      - `customer_email` (text)
      - `customer_phone` (text)
      - `shipping_address` (jsonb)
      - `total_amount` (decimal)
      - `status` (text)
      - `created_at` (timestamp)
    - `order_items`
      - `id` (uuid, primary key)
      - `order_id` (uuid, foreign key)
      - `product_id` (uuid, foreign key)
      - `quantity` (integer)
      - `unit_price` (decimal)
      - `total_price` (decimal)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access on categories and products
    - Add policies for order management
*/

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  image_url text,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code_name text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  price decimal(10,2) NOT NULL,
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  images jsonb DEFAULT '[]'::jsonb,
  dimensions jsonb DEFAULT '{}'::jsonb,
  age_range text DEFAULT '3-12 years',
  in_stock boolean DEFAULT true,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text,
  shipping_address jsonb NOT NULL,
  total_amount decimal(10,2) NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  quantity integer NOT NULL DEFAULT 1,
  unit_price decimal(10,2) NOT NULL,
  total_price decimal(10,2) NOT NULL
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Categories are publicly readable"
  ON categories FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Products are publicly readable"
  ON products FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Orders are publicly insertable"
  ON orders FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Order items are publicly insertable"
  ON order_items FOR INSERT
  TO public
  WITH CHECK (true);

-- Insert sample categories
INSERT INTO categories (name, description, slug, image_url) VALUES
  ('Beds & Mattresses', 'Comfortable and safe sleeping solutions for children', 'beds-mattresses', 'https://images.pexels.com/photos/6969831/pexels-photo-6969831.jpeg'),
  ('Desks & Chairs', 'Study and creative spaces designed for growing minds', 'desks-chairs', 'https://images.pexels.com/photos/6969832/pexels-photo-6969832.jpeg'),
  ('Storage Solutions', 'Organize toys, clothes, and books with style', 'storage-solutions', 'https://images.pexels.com/photos/6969833/pexels-photo-6969833.jpeg'),
  ('Play Furniture', 'Fun and functional furniture for playtime', 'play-furniture', 'https://images.pexels.com/photos/6969834/pexels-photo-6969834.jpeg'),
  ('Wardrobes', 'Stylish storage for growing wardrobes', 'wardrobes', 'https://images.pexels.com/photos/6969835/pexels-photo-6969835.jpeg');

-- Insert sample products
INSERT INTO products (code_name, name, description, price, category_id, images, dimensions, age_range, featured) VALUES
  ('SLEEPY-01', 'Cloud Dream Bed', 'A magical bed that feels like sleeping on a cloud with built-in safety rails', 299.99, (SELECT id FROM categories WHERE slug = 'beds-mattresses'), '["https://images.pexels.com/photos/6969840/pexels-photo-6969840.jpeg", "https://images.pexels.com/photos/6969841/pexels-photo-6969841.jpeg"]', '{"length": "190cm", "width": "90cm", "height": "85cm"}', '3-8 years', true),
  ('DREAM-02', 'Adventure Bunk Bed', 'Double the fun with this sturdy bunk bed featuring a slide', 599.99, (SELECT id FROM categories WHERE slug = 'beds-mattresses'), '["https://images.pexels.com/photos/6969842/pexels-photo-6969842.jpeg"]', '{"length": "200cm", "width": "100cm", "height": "160cm"}', '5-12 years', true),
  ('STUDY-01', 'Growing Desk', 'Height-adjustable desk that grows with your child', 199.99, (SELECT id FROM categories WHERE slug = 'desks-chairs'), '["https://images.pexels.com/photos/6969843/pexels-photo-6969843.jpeg"]', '{"length": "120cm", "width": "60cm", "height": "65-85cm"}', '6-16 years', true),
  ('CREATE-02', 'Art Station Deluxe', 'Complete creative workspace with storage for art supplies', 249.99, (SELECT id FROM categories WHERE slug = 'desks-chairs'), '["https://images.pexels.com/photos/6969844/pexels-photo-6969844.jpeg"]', '{"length": "100cm", "width": "70cm", "height": "75cm"}', '4-12 years', false),
  ('TIDY-01', 'Rainbow Storage Tower', 'Colorful modular storage system for toys and books', 149.99, (SELECT id FROM categories WHERE slug = 'storage-solutions'), '["https://images.pexels.com/photos/6969845/pexels-photo-6969845.jpeg"]', '{"length": "40cm", "width": "40cm", "height": "120cm"}', '2-10 years', true),
  ('ORGANIZE-02', 'Treasure Chest', 'Pirate-themed storage chest for toys and treasures', 89.99, (SELECT id FROM categories WHERE slug = 'storage-solutions'), '["https://images.pexels.com/photos/6969846/pexels-photo-6969846.jpeg"]', '{"length": "80cm", "width": "40cm", "height": "45cm"}', '3-12 years', false),
  ('PLAY-01', 'Castle Playhouse', 'Indoor playhouse that sparks imagination', 399.99, (SELECT id FROM categories WHERE slug = 'play-furniture'), '["https://images.pexels.com/photos/6969847/pexels-photo-6969847.jpeg"]', '{"length": "150cm", "width": "120cm", "height": "140cm"}', '3-10 years', true),
  ('FUN-02', 'Reading Nook Pod', 'Cozy reading space with built-in bookshelf', 179.99, (SELECT id FROM categories WHERE slug = 'play-furniture'), '["https://images.pexels.com/photos/6969848/pexels-photo-6969848.jpeg"]', '{"length": "100cm", "width": "80cm", "height": "120cm"}', '4-12 years', false),
  ('WARDROBE-01', 'Safari Wardrobe', 'Adventure-themed wardrobe with animal handles', 329.99, (SELECT id FROM categories WHERE slug = 'wardrobes'), '["https://images.pexels.com/photos/6969849/pexels-photo-6969849.jpeg"]', '{"length": "100cm", "width": "60cm", "height": "180cm"}', '2-12 years', true);