import { useState, useEffect } from 'react';
import { Equipment, Location } from '../types';
import { getEquipment, getLocations, createEquipment, updateEquipment, deleteEquipment } from '../services/api';
import Table from '../components/Table';
import Modal from '../components/Modal';
import { useInventory } from '../context/InventoryContext';

interface FormData {
  model: string;
  equipment_type: string;
  location_id: string;
}

const EquipmentPage = () => {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { triggerRefresh } = useInventory();
  const [formData, setFormData] = useState<FormData>({
    model: '',
    equipment_type: '',
    location_id: '',
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [equipmentData, locationsData] = await Promise.all([
        getEquipment(),
        getLocations(),
      ]);
      setEquipment(equipmentData);
      setLocations(locationsData);
      setError(null);
    } catch (err) {
      setError('Failed to load equipment data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (!formData.model || !formData.equipment_type || !formData.location_id) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      if (editingEquipment) {
        const updated = await updateEquipment(editingEquipment.id, {
          ...formData,
          location_id: parseInt(formData.location_id),
        });
        setEquipment(equipment.map(e => e.id === updated.id ? updated : e));
      } else {
        const created = await createEquipment({
          ...formData,
          location_id: parseInt(formData.location_id),
        });
        setEquipment([...equipment, created]);
      }
      handleCloseModal();
      triggerRefresh(); // Refresh dashboard
    } catch (err) {
      setError('Failed to save equipment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (item: Equipment) => {
    setEditingEquipment(item);
    setFormData({
      model: item.model,
      equipment_type: item.equipment_type,
      location_id: String(item.location_id),
    });
    setError(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (item: Equipment) => {
    if (window.confirm(`Are you sure you want to delete "${item.model}"?`)) {
      try {
        await deleteEquipment(item.id);
        setEquipment(equipment.filter(e => e.id !== item.id));
        triggerRefresh(); // Refresh dashboard
      } catch (err) {
        setError('Failed to delete equipment');
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEquipment(null);
    setFormData({
      model: '',
      equipment_type: '',
      location_id: '',
    });
    setError(null);
  };

  const columns = [
    { header: 'Model', accessor: (item: Equipment) => item.model },
    { header: 'Type', accessor: (item: Equipment) => item.equipment_type },
    {
      header: 'Location',
      accessor: (item: Equipment) => {
        const location = locations.find(l => l.id === item.location_id);
        return location ? `${location.room_name} (${location.building_type})` : 'Unknown';
      },
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-sm border border-usf-gray-200 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-usf-gray-900">Equipment Management</h1>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-usf-green-600 text-white px-6 py-3 rounded-lg hover:bg-usf-green-700 transition-colors duration-150 font-medium"
          >
            Add Equipment
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

      {/* Equipment Table */}
      <Table
        columns={columns}
        data={equipment}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={loading}
      />

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingEquipment ? 'Edit Equipment' : 'Add New Equipment'}
        onSubmit={handleSubmit}
        submitLabel={editingEquipment ? 'Update Equipment' : 'Add Equipment'}
        isSubmitting={isSubmitting}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-usf-gray-700 mb-2">
              Model
            </label>
            <input
              type="text"
              value={formData.model}
              onChange={e => setFormData({ ...formData, model: e.target.value })}
              className="w-full px-3 py-2 border border-usf-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-usf-green-500 focus:border-usf-green-500"
              placeholder="e.g., Dell XPS 15"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-usf-gray-700 mb-2">
              Equipment Type
            </label>
            <input
              type="text"
              value={formData.equipment_type}
              onChange={e => setFormData({ ...formData, equipment_type: e.target.value })}
              className="w-full px-3 py-2 border border-usf-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-usf-green-500 focus:border-usf-green-500"
              placeholder="e.g., Laptop, Desktop, Printer"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-usf-gray-700 mb-2">
              Location
            </label>
            <select
              value={formData.location_id}
              onChange={e => setFormData({ ...formData, location_id: e.target.value })}
              className="w-full px-3 py-2 border border-usf-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-usf-green-500 focus:border-usf-green-500"
            >
              <option value="">Select a location</option>
              {locations.map(location => (
                <option key={location.id} value={location.id}>
                  {location.room_name} ({location.building_type})
                </option>
              ))}
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EquipmentPage; 