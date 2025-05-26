// TypeScript type definitions for the USF Honors Inventory Management System
// These types ensure type safety across the frontend application

// Building types are restricted to these three specific values
// This matches the database constraint and ensures data consistency
export type BuildingType = 'Warehouse' | 'Classroom' | 'Office';

// Location interface represents a physical location where equipment can be stored
// Maps directly to the locations table in the database
export interface Location {
  id: number;                    // Primary key from database
  room_name: string;             // Human-readable room identifier (e.g., "HON 4015B")
  building_type: BuildingType;   // Type of location (Warehouse, Classroom, or Office)
}

// Equipment interface represents an individual piece of equipment in the inventory
// Includes optional location details from JOIN queries
export interface Equipment {
  id: number;                    // Primary key from database
  model: string;                 // Equipment model/name (e.g., "Dell Elite8 Laptop")
  equipment_type: string;        // Category of equipment (e.g., "Laptop", "Printer")
  location_id: number;           // Foreign key reference to locations table
  
  // Optional fields populated when joining with locations table
  room_name?: string;            // Room name from the associated location
  building_type?: BuildingType;  // Building type from the associated location
}

// Transfer request interface for moving equipment between locations
// Used when transferring equipment from one location to another
export interface TransferRequest {
  equipmentId: number;           // ID of equipment to transfer
  destinationLocationId: number; // ID of destination location
}

// Generic API response wrapper used by all backend endpoints
// Provides consistent response structure across the application
export interface ApiResponse<T> {
  success: boolean;              // Indicates if the operation was successful
  data: T;                       // The actual response data (type varies by endpoint)
  message?: string;              // Optional error or success message
} 