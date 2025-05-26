// Equipment controller - handles all equipment-related API operations
// This file contains all the business logic for managing equipment in the inventory

import { Request, Response } from 'express';
import db from '../models/db';

// GET /equipment - Retrieve all equipment with location details
// This joins equipment with locations table to get room names and building types
export const getAllEquipment = async (req: Request, res: Response) => {
  try {
    // SQL query joins equipment table with locations to get complete information
    // LEFT JOIN ensures we get equipment even if location data is missing
    const result = await db.query(`
      SELECT e.*, l.room_name, l.building_type
      FROM equipment e
      LEFT JOIN locations l ON e.location_id = l.id
      ORDER BY e.id
    `);
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error fetching equipment:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// POST /equipment - Create a new equipment item
// Requires model, equipment_type, and location_id in request body
export const createEquipment = async (req: Request, res: Response) => {
  const { model, equipment_type, location_id } = req.body;
  
  // Validate required fields before attempting database operation
  if (!model || !equipment_type || !location_id) {
    return res.status(400).json({ 
      success: false, 
      message: 'Model, equipment type, and location are required' 
    });
  }

  try {
    // Insert new equipment and return the created record
    // RETURNING * gives us back the complete record with auto-generated ID
    const result = await db.query(
      'INSERT INTO equipment (model, equipment_type, location_id) VALUES ($1, $2, $3) RETURNING *',
      [model, equipment_type, location_id]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error creating equipment:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// PUT /equipment/:id - Update an existing equipment item
// Updates all fields for the equipment with the given ID
export const updateEquipment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { model, equipment_type, location_id } = req.body;
  
  try {
    // Update equipment record and return the updated data
    const result = await db.query(
      'UPDATE equipment SET model = $1, equipment_type = $2, location_id = $3 WHERE id = $4 RETURNING *',
      [model, equipment_type, location_id, id]
    );
    
    // Check if equipment was found and updated
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Equipment not found' });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error updating equipment:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// DELETE /equipment/:id - Remove an equipment item from inventory
// Permanently deletes the equipment record
export const deleteEquipment = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    // Delete equipment and return the deleted record for confirmation
    const result = await db.query('DELETE FROM equipment WHERE id = $1 RETURNING *', [id]);
    
    // Check if equipment existed and was deleted
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Equipment not found' });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error deleting equipment:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// PUT /equipment/:id/transfer - Move equipment to a different location
// This is a specialized update operation that only changes the location
export const transferEquipment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { location_id } = req.body;
  
  // Validate that new location ID is provided
  if (!location_id) {
    return res.status(400).json({ 
      success: false, 
      message: 'Location ID is required' 
    });
  }

  try {
    // Update only the location_id field for the equipment
    const result = await db.query(
      'UPDATE equipment SET location_id = $1 WHERE id = $2 RETURNING *',
      [location_id, id]
    );
    
    // Check if equipment was found and transferred
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Equipment not found' });
    }
    
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error transferring equipment:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}; 