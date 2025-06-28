/*
  # Update category images with child-friendly photos

  1. Changes
    - Replace category images with more child-focused, colorful photos
    - Use images that show children interacting with furniture
    - Make images more appealing and relatable for parents

  2. Updated Categories
    - Beds & Mattresses: Colorful kids bedroom
    - Desks & Chairs: Child studying at colorful desk
    - Storage Solutions: Organized kids playroom
    - Play Furniture: Children playing with furniture
    - Wardrobes: Bright kids closet organization
*/

-- Update category images with more child-friendly photos
UPDATE categories SET image_url = 'https://images.pexels.com/photos/6969850/pexels-photo-6969850.jpeg' WHERE slug = 'beds-mattresses';
UPDATE categories SET image_url = 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg' WHERE slug = 'desks-chairs';
UPDATE categories SET image_url = 'https://images.pexels.com/photos/6969852/pexels-photo-6969852.jpeg' WHERE slug = 'storage-solutions';
UPDATE categories SET image_url = 'https://images.pexels.com/photos/6969853/pexels-photo-6969853.jpeg' WHERE slug = 'play-furniture';
UPDATE categories SET image_url = 'https://images.pexels.com/photos/6969854/pexels-photo-6969854.jpeg' WHERE slug = 'wardrobes';