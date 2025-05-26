import React, { useEffect, useState } from 'react';
import Table from '../components/Table';
import Modal from '../components/Modal';
import { Location } from '../types';
import {
  getLocations,
  createLocation,
  updateLocation,
  deleteLocation,
} from '../services/api';
import { useInventory } from '../context/InventoryContext';

interface FormData {
  room_name: string;
}

const LocationsPage = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { triggerRefresh } = useInventory();
  const [formData, setFormData] = useState<FormData>({
    room_name: '',
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getLocations();
      setLocations(data);
      setError(null);
    } catch (err) {
      setError('Failed to load locations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (!formData.room_name.trim()) {
      setError('Please enter a room number');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      if (editingLocation) {
        const updated = await updateLocation(editingLocation.id, {
          room_name: formData.room_name.trim(),
          building_type: editingLocation.building_type, // Keep existing building type
        });
        setLocations(locations.map(l => l.id === updated.id ? updated : l));
      } else {
        const created = await createLocation({
          room_name: formData.room_name.trim(),
          building_type: 'Office', // Default to Office for new locations
        });
        setLocations([...locations, created]);
      }
      handleCloseModal();
      triggerRefresh(); // Refresh dashboard
    } catch (err) {
      setError('Failed to save location');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (item: Location) => {
    setEditingLocation(item);
    setFormData({
      room_name: item.room_name,
    });
    setError(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (item: Location) => {
    if (window.confirm(`Are you sure you want to delete "${item.room_name}"?`)) {
      try {
        await deleteLocation(item.id);
        setLocations(locations.filter(l => l.id !== item.id));
        triggerRefresh(); // Refresh dashboard
      } catch (err) {
        setError('Failed to delete location');
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingLocation(null);
    setFormData({
      room_name: '',
    });
    setError(null);
  };

  const columns = [
    { header: 'Room Number', accessor: (item: Location) => item.room_name },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-sm border border-usf-gray-200 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-usf-gray-900">Locations</h1>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-usf-green-600 text-white px-6 py-3 rounded-lg hover:bg-usf-green-700 transition-colors duration-150 font-medium"
          >
            Add Location
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-red-700 font-medium">Error</div>
          <div className="text-red-600 mt-1">{error}</div>
        </div>
      )}

      {/* Locations Table */}
      <Table
        columns={columns}
        data={locations}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={loading}
      />

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingLocation ? 'Edit Location' : 'Add New Location'}
        onSubmit={handleSubmit}
        submitLabel={editingLocation ? 'Update Location' : 'Add Location'}
        isSubmitting={isSubmitting}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-usf-gray-700 mb-2">
              Room Number
            </label>
            <input
              type="text"
              value={formData.room_name}
              onChange={e => setFormData({ ...formData, room_name: e.target.value })}
              className="w-full px-3 py-2 border border-usf-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-usf-green-500 focus:border-usf-green-500"
              placeholder="e.g., HON 4015B, Room 101, Lab A"
              autoFocus
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LocationsPage; 