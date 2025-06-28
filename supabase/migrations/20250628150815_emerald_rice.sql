/*
  # Add J001 Product Showcase

  1. New Product
    - Add J001 product with local image
    - Set as featured to appear prominently
    - Use appropriate category and details

  2. Updates
    - Ensure product appears in featured listings
    - Set proper pricing and details
*/

-- Insert J001 product
INSERT INTO products (code_name, name, description, price, category_id, images, dimensions, age_range, featured, in_stock) VALUES
  ('J001', 'Rainbow Learning Chair', 'Colorful ergonomic chair designed for young learners with adjustable height and vibrant rainbow design that sparks creativity', 89.99, (SELECT id FROM categories WHERE slug = 'desks-chairs'), '["/k001.jpg"]', '{"length": "45cm", "width": "40cm", "height": "60-75cm"}', '3-8 years', true, true);