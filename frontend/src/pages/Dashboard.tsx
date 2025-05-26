// Dashboard page - provides an overview of all equipment organized by location
// This is the main landing page that shows inventory statistics and equipment distribution

import { useState, useEffect } from 'react';
import { Equipment, Location } from '../types';
import { getEquipment, getLocations } from '../services/api';
import { useInventory } from '../context/InventoryContext';

const Dashboard = () => {
  // State for storing fetched data
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get refresh trigger from global context to re-fetch data when changes occur
  const { refreshTrigger } = useInventory();

  // Function to fetch all data from the API
  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch both equipment and locations data in parallel for better performance
      const [equipmentData, locationsData] = await Promise.all([
        getEquipment(),
        getLocations(),
      ]);
      setEquipment(equipmentData);
      setLocations(locationsData);
      setError(null); // Clear any previous errors
    } catch (err) {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch data when component mounts or when refresh is triggered
  useEffect(() => {
    fetchData();
  }, [refreshTrigger]); // Dependency on refreshTrigger ensures updates when data changes

  // Helper function to filter equipment by location
  // Returns all equipment items that belong to a specific location
  const getEquipmentByLocation = (locationId: number) => {
    return equipment.filter(item => item.location_id === locationId);
  };

  // Loading state - show spinner while data is being fetched
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-usf-green-600"></div>
      </div>
    );
  }

  // Error state - show error message if data fetch failed
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="text-red-700 font-medium">Error</div>
        <div className="text-red-600 mt-1">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-usf-gray-900">Inventory Dashboard</h1>
        <p className="text-usf-gray-600 mt-1">
          Overview of all equipment and locations
        </p>
      </div>

      {/* Total Equipment Summary Card */}
      <div className="bg-white rounded-lg shadow-sm border border-usf-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-usf-gray-900">Total Equipment</h2>
            <p className="text-usf-gray-600">All items in inventory</p>
          </div>
          <div className="text-right">
            {/* Display total count with prominent styling */}
            <div className="text-3xl font-bold text-usf-green-600">{equipment.length}</div>
            <div className="text-sm text-usf-gray-500">Items</div>
          </div>
        </div>
      </div>

      {/* Equipment by Location Section */}
      <div className="bg-white rounded-lg shadow-sm border border-usf-gray-200 p-6">
        <h2 className="text-lg font-semibold text-usf-gray-900 mb-4">Equipment by Location</h2>
        
        <div className="space-y-4">
          {/* Loop through each location and display its equipment */}
          {locations.map((location) => {
            const locationEquipment = getEquipmentByLocation(location.id);
            
            return (
              <div key={location.id} className="border border-usf-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {/* Location name as header */}
                    <h3 className="text-lg font-medium text-usf-gray-900">
                      {location.room_name}
                    </h3>
                  </div>
                  {/* Equipment count for this location */}
                  <div className="text-sm text-usf-gray-500">
                    {locationEquipment.length} item{locationEquipment.length !== 1 ? 's' : ''}
                  </div>
                </div>
                
                {/* Show equipment grid if there are items, otherwise show empty state message */}
                {locationEquipment.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {/* Display each equipment item as a card */}
                    {locationEquipment.map((item) => (
                      <div key={item.id} className="bg-usf-gray-50 rounded-md p-3">
                        <div className="font-medium text-usf-gray-900">{item.model}</div>
                        <div className="text-sm text-usf-gray-600">{item.equipment_type}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-usf-gray-500 text-sm italic">
                    No equipment in this location
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 