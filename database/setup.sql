-- Create database (run this as postgres superuser)
-- CREATE DATABASE usf_honors_inventory;

-- Connect to the database and run the following:
-- \c usf_honors_inventory;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS equipment;
DROP TABLE IF EXISTS locations;

-- Create locations table
CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  room_name VARCHAR NOT NULL,
  building_type VARCHAR CHECK (building_type IN ('Warehouse', 'Classroom', 'Office')) NOT NULL
);

-- Create equipment table  
CREATE TABLE equipment (
  id SERIAL PRIMARY KEY,
  model VARCHAR NOT NULL,
  equipment_type VARCHAR NOT NULL,
  location_id INTEGER REFERENCES locations(id)
);

-- Insert sample locations as mentioned in guidelines
INSERT INTO locations (room_name, building_type) VALUES
  ('HON 4015B', 'Office'),
  ('HON 4020', 'Classroom'), 
  ('HON Storage', 'Warehouse'),
  ('HON 3010', 'Office'),
  ('HON Lab', 'Classroom');

-- Insert sample equipment exactly as shown in guidelines
INSERT INTO equipment (model, equipment_type, location_id) VALUES
  -- HP LaserJet Printer located in Classroom HON 3017 (using HON 4020 as classroom)
  ('HP LaserJet Printer', 'Printer', 2),
  -- Dell Elite8 Laptop located in Office HON 4015B  
  ('Dell Elite8 Laptop', 'Laptop', 1),
  -- All Dell Monitors located in Warehouse HON Warehouse
  ('Dell Monitor', 'Monitor', 3),
  ('Dell Monitor', 'Monitor', 3),
  ('Dell Monitor', 'Monitor', 3); 