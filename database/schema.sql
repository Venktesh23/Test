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

-- Insert sample locations
INSERT INTO locations (room_name, building_type) VALUES
  ('HON 4015B', 'Office'),
  ('HON 4020', 'Classroom'),
  ('HON Storage', 'Warehouse'),
  ('HON 3010', 'Office'),
  ('HON Lab', 'Classroom');

-- Insert sample equipment
INSERT INTO equipment (model, equipment_type, location_id) VALUES
  ('Dell XPS 15', 'Laptop', 1),
  ('HP LaserJet Pro', 'Printer', 1),
  ('Epson Projector', 'Projector', 2),
  ('MacBook Pro M1', 'Laptop', 3),
  ('Canon Scanner', 'Scanner', 1),
  ('Dell Monitor 24"', 'Monitor', 4),
  ('Logitech Webcam', 'Camera', 2),
  ('HP Desktop', 'Desktop', 4); 