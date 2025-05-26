// Locations controller - handles all location-related API operations
// This file manages the physical locations where equipment can be stored

import { Request, Response } from 'express';
import db from '../models/db';

// GET /locations - Retrieve all locations sorted by room name
// Returns a simple list of all available locations in the system
export const getAllLocations = async (req: Request, res: Response) => {
  try {
    // Order by room_name to make the list easier to navigate in the UI
    const result = await db.query('SELECT * FROM locations ORDER BY room_name');
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// POST /locations - Create a new location
// Requires room_name and building_type with specific validation rules
export const createLocation = async (req: Request, res: Response) => {
  const { room_name, building_type } = req.body;
  
  // Validate that both required fields are provided
  if (!room_name || !building_type) {
    return res.status(400).json({ 
      success: false, 
      message: 'Room name and building type are required' 
    });
  }

  // Enforce business rule: building_type must be one of three specific values
  // This matches the database constraint and ensures data consistency
  if (!['Warehouse', 'Classroom', 'Office'].includes(building_type)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Building type must be Warehouse, Classroom, or Office' 
    });
  }

  try {
    // Insert new location and return the created record
    const result = await db.query(
      'INSERT INTO locations (room_name, building_type) VALUES ($1, $2) RETURNING *',
      [room_name, building_type]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error creating location:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// PUT /locations/:id - Update an existing location
// Allows updating both room name and building type with validation
export const updateLocation = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { room_name, building_type } = req.body;
  
  // Validate building_type if it's being updated
  // Only check if building_type is provided (partial updates allowed)
  if (building_type && !['Warehouse', 'Classroom', 'Office'].includes(building_type)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Building type must be Warehouse, Classroom, or Office' 
    });
  }

  try {
    // Update location record and return the updated data
    const result = await db.query(
      'UPDATE locations SET room_name = $1, building_type = $2 WHERE id = $3 RETURNING *',
      [room_name, building_type, id]
    );
    
    // Check if location was found and updated
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Location not found' });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error updating location:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// DELETE /locations/:id - Remove a location from the system
// Includes business logic to prevent deletion of locations that contain equipment
export const deleteLocation = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    // Business rule: Cannot delete a location that still has equipment in it
    // This prevents orphaned equipment records and maintains data integrity
    const equipmentCheck = await db.query(
      'SELECT COUNT(*) FROM equipment WHERE location_id = $1',
      [id]
    );
    
    // If any equipment exists in this location, prevent deletion
    if (parseInt(equipmentCheck.rows[0].count) > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete location that contains equipment'
      });
    }

    // Safe to delete - no equipment depends on this location
    const result = await db.query('DELETE FROM locations WHERE id = $1 RETURNING *', [id]);
    
    // Check if location existed and was deleted
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Location not found' });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error deleting location:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}; 