-- Seed service categories
INSERT INTO public.service_categories (id, name, description, icon, display_order) VALUES
  ('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'Auto Beauty Services', 'Professional panel beating, painting, and finishing services', 'Sparkles', 1),
  ('b2c3d4e5-f6a7-5b6c-9d0e-1f2a3b4c5d6e', 'Auto Maintenance', 'Complete car maintenance and repair services', 'Wrench', 2),
  ('c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f', 'Car Wash Clinic', 'Professional car washing with modern equipment', 'Droplets', 3),
  ('d4e5f6a7-b8c9-7d8e-1f2a-3b4c5d6e7f8a', 'Tyre Services', 'Complete tyre servicing and maintenance', 'Circle', 4)
ON CONFLICT (id) DO NOTHING;

-- Seed services for Auto Beauty
INSERT INTO public.services (category_id, name, description, base_price, image_url, is_active) VALUES
  ('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'Panel Beating', 'Expert panel beating to restore your vehicle body to perfect condition', 25000.00, 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&q=80', true),
  ('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'Painting & Spraying', 'Professional automotive painting and spraying with premium finishes', 45000.00, 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=800&q=80', true),
  ('a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d', 'Complete Finishing', 'Full vehicle finishing including polishing and detailing', 35000.00, 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=800&q=80', true)
ON CONFLICT DO NOTHING;

-- Seed services for Auto Maintenance
INSERT INTO public.services (category_id, name, description, base_price, image_url, is_active) VALUES
  ('b2c3d4e5-f6a7-5b6c-9d0e-1f2a3b4c5d6e', 'Oil & Filter Change', 'Complete oil and filter replacement with quality products', 8000.00, 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80', true),
  ('b2c3d4e5-f6a7-5b6c-9d0e-1f2a3b4c5d6e', 'General Maintenance', 'Comprehensive vehicle inspection and maintenance service', 15000.00, 'https://images.unsplash.com/photo-1632823469850-1b4942f4d2b5?w=800&q=80', true),
  ('b2c3d4e5-f6a7-5b6c-9d0e-1f2a3b4c5d6e', 'Fault Diagnosis & Repair', 'Professional diagnostic and repair services for all vehicle issues', 20000.00, 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&q=80', true)
ON CONFLICT DO NOTHING;

-- Seed services for Car Wash
INSERT INTO public.services (category_id, name, description, base_price, image_url, is_active) VALUES
  ('c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f', 'Premium Wash', 'Complete car wash with fuel-controlled washing machines', 3000.00, 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800&q=80', true),
  ('c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f', 'Interior Vacuum Clean', 'Thorough interior cleaning with professional vacuum cleaners', 2500.00, 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=800&q=80', true),
  ('c3d4e5f6-a7b8-6c7d-0e1f-2a3b4c5d6e7f', 'Complete Detailing', 'Full interior and exterior detailing service', 8000.00, 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800&q=80', true)
ON CONFLICT DO NOTHING;

-- Seed services for Tyre Services
INSERT INTO public.services (category_id, name, description, base_price, image_url, is_active) VALUES
  ('d4e5f6a7-b8c9-7d8e-1f2a-3b4c5d6e7f8a', 'Tyre Balancing', 'Professional tyre balancing for smooth driving', 4000.00, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', true),
  ('d4e5f6a7-b8c9-7d8e-1f2a-3b4c5d6e7f8a', 'Tyre Change', 'Expert tyre changing service with modern equipment', 3000.00, 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80', true),
  ('d4e5f6a7-b8c9-7d8e-1f2a-3b4c5d6e7f8a', 'Wheel Alignment', 'Precision wheel alignment using alignment gauge', 6000.00, 'https://images.unsplash.com/photo-1449130015084-2dc954a6d51f?w=800&q=80', true),
  ('d4e5f6a7-b8c9-7d8e-1f2a-3b4c5d6e7f8a', 'Complete Tyre Service', 'Full tyre service including balancing, alignment, and inspection', 12000.00, 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80', true)
ON CONFLICT DO NOTHING;
