// API service layer - handles all HTTP requests to the backend
// This file centralizes all API calls and provides a clean interface for components

import { Equipment, Location, ApiResponse } from '../types';

// API base URL - uses environment variable for flexibility across environments
// Falls back to localhost:3000 for local development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// ===== EQUIPMENT API FUNCTIONS =====

// Fetch all equipment items with their location details
// Returns equipment with joined location information (room_name, building_type)
export const getEquipment = async (): Promise<Equipment[]> => {
  const response = await fetch(`${API_URL}/equipment`);
  const json = await response.json() as ApiResponse<Equipment[]>;
  if (!json.success) throw new Error(json.message);
  return json.data;
};

// Create a new equipment item
// Omits auto-generated fields (id, timestamps) from the input type
export const createEquipment = async (equipment: Omit<Equipment, 'id' | 'created_at' | 'updated_at'>): Promise<Equipment> => {
  const response = await fetch(`${API_URL}/equipment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(equipment),
  });
  const json = await response.json() as ApiResponse<Equipment>;
  if (!json.success) throw new Error(json.message);
  return json.data;
};

// Update an existing equipment item
// Allows partial updates using Partial<Equipment> type
export const updateEquipment = async (id: number, equipment: Partial<Equipment>): Promise<Equipment> => {
  const response = await fetch(`${API_URL}/equipment/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(equipment),
  });
  const json = await response.json() as ApiResponse<Equipment>;
  if (!json.success) throw new Error(json.message);
  return json.data;
};

// Delete an equipment item from the inventory
// Returns the deleted equipment data for confirmation
export const deleteEquipment = async (id: number): Promise<Equipment> => {
  const response = await fetch(`${API_URL}/equipment/${id}`, {
    method: 'DELETE',
  });
  const json = await response.json() as ApiResponse<Equipment>;
  if (!json.success) throw new Error(json.message);
  return json.data;
};

// Transfer equipment to a different location
// This is a specialized update that only changes the location_id
export const transferEquipment = async (id: number, location_id: number): Promise<Equipment> => {
  const response = await fetch(`${API_URL}/equipment/${id}/transfer`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ location_id }),
  });
  const json = await response.json() as ApiResponse<Equipment>;
  if (!json.success) throw new Error(json.message);
  return json.data;
};

// ===== LOCATIONS API FUNCTIONS =====

// Fetch all available locations sorted by room name
// Used to populate dropdowns and location lists
export const getLocations = async (): Promise<Location[]> => {
  const response = await fetch(`${API_URL}/locations`);
  const json = await response.json() as ApiResponse<Location[]>;
  if (!json.success) throw new Error(json.message);
  return json.data;
};

// Create a new location
// Requires room_name and building_type (validated on backend)
export const createLocation = async (location: Omit<Location, 'id' | 'created_at' | 'updated_at'>): Promise<Location> => {
  const response = await fetch(`${API_URL}/locations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(location),
  });
  const json = await response.json() as ApiResponse<Location>;
  if (!json.success) throw new Error(json.message);
  return json.data;
};

// Update an existing location
// Allows partial updates with validation on building_type
export const updateLocation = async (id: number, location: Partial<Location>): Promise<Location> => {
  const response = await fetch(`${API_URL}/locations/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(location),
  });
  const json = await response.json() as ApiResponse<Location>;
  if (!json.success) throw new Error(json.message);
  return json.data;
};

// Delete a location from the system
// Backend prevents deletion if location contains equipment
export const deleteLocation = async (id: number): Promise<Location> => {
  const response = await fetch(`${API_URL}/locations/${id}`, {
    method: 'DELETE',
  });
  const json = await response.json() as ApiResponse<Location>;
  if (!json.success) throw new Error(json.message);
  return json.data;
}; 