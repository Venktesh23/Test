// Main server file for USF Honors Inventory Management System
// This sets up the Express server with all the necessary routes and middleware

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import all equipment-related controller functions
import {
  getAllEquipment,
  createEquipment,
  updateEquipment,
  deleteEquipment,
  transferEquipment
} from './controllers/equipment';

// Import all location-related controller functions
import {
  getAllLocations,
  createLocation,
  updateLocation,
  deleteLocation
} from './controllers/locations';

// Load environment variables from .env file (if it exists)
// This allows us to configure database settings without hardcoding them
dotenv.config();

// Create the main Express application instance
const app = express();

// Configure middleware
// CORS allows our frontend (running on different port) to make requests to this API
app.use(cors());
// Parse JSON request bodies automatically
app.use(express.json());

// Global error handler - catches any unhandled errors and returns a consistent response
// This prevents the server from crashing when something goes wrong
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
};

// Equipment API routes
// These handle all CRUD operations for equipment items
app.get('/equipment', getAllEquipment as express.RequestHandler);           // Get all equipment
app.post('/equipment', createEquipment as express.RequestHandler);          // Create new equipment
app.put('/equipment/:id', updateEquipment as express.RequestHandler);       // Update existing equipment
app.delete('/equipment/:id', deleteEquipment as express.RequestHandler);    // Delete equipment
app.put('/equipment/:id/transfer', transferEquipment as express.RequestHandler); // Transfer equipment to different location

// Location API routes  
// These handle all CRUD operations for location management
app.get('/locations', getAllLocations as express.RequestHandler);           // Get all locations
app.post('/locations', createLocation as express.RequestHandler);           // Create new location
app.put('/locations/:id', updateLocation as express.RequestHandler);        // Update existing location
app.delete('/locations/:id', deleteLocation as express.RequestHandler);     // Delete location

// Apply error handling middleware (must be last)
app.use(errorHandler);

// Start the server
// Use environment variable for port, fallback to 3000 for development
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 