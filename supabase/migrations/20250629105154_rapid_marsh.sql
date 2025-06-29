/*
  # Add K001 Hardwood Activity Table

  1. New Product
    - `K001` - ECR4Kids Deluxe Hardwood Activity Table
    - Natural hardwood construction
    - Perfect companion to J001 Rainbow Learning Chair
    - Designed for educational and creative activities

  2. Updates
    - Add the K001 table to complement our existing J001 chair
    - Set as featured product alongside J001
*/

-- Insert K001 Hardwood Activity Table
INSERT INTO products (code_name, name, description, price, category_id, images, dimensions, age_range, featured, in_stock) VALUES
  ('K001', 'Deluxe Hardwood Activity Table', 'Premium natural hardwood activity table perfect for learning, crafts, and play. Durable construction with smooth finish and rounded edges for safety. Ideal companion to our Rainbow Learning Chair.', 159.99, (SELECT id FROM categories WHERE slug = 'desks-chairs'), '["https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg", "https://images.pexels.com/photos/6969843/pexels-photo-6969843.jpeg"]', '{"length": "76cm", "width": "61cm", "height": "58cm"}', '3-8 years', true, true);