import React, { useState, useEffect } from 'react';
import { Edit, Plus, Trash2 } from 'lucide-react';
import Button from '../../components/ui/Button';
import client from '../../services';
import { toast } from 'react-toastify';
import { Dialog } from '@headlessui/react';

interface Position {
  id: number;
  name: string;
}

const PositionManager = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<Position | null>(null);
  const [positionName, setPositionName] = useState('');

  // Fetch positions
  const fetchPositions = async () => {
    setLoading(true);
    try {
      const response = await client.get('/uz/api/v1/dashboard/get_all_positions/');
      setPositions(response.data);
    } catch (err) {
      setError('Lavozimlarni yuklashda xatolik');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!positionName.trim()) {
      toast.error('Lavozim nomini kiriting');
      return;
    }

    try {
      if (currentPosition) {
        // Update existing position
        await client.patch(
          `/uz/api/v1/dashboard/update_position/${currentPosition.id}/`,
          { name: positionName }
        );
        toast.success('Lavozim muvaffaqiyatli yangilandi');
      } else {
        // Create new position
        await client.post(
          '/uz/api/v1/dashboard/create_position/',
          { name: positionName }
        );
        toast.success('Yangi lavozim qo\'shildi');
      }
      fetchPositions();
      resetForm();
    } catch (error) {
      toast.error('Amalni bajarishda xatolik');
      console.error('Submit error:', error);
    }
  };

  // Delete position
 const handleDelete = async (id: number) => {
  try {
    await client.delete(`/uz/api/v1/dashboard/delete_position/${id}/`);
    toast.success('Lavozim o\'chirildi');
    fetchPositions();
  } catch (error) {
    toast.error('O\'chirishda xatolik');
    console.error('Delete error:', error);
  }
};


  // Open modal for editing
  const openEditModal = (position: Position) => {
    setCurrentPosition(position);
    setPositionName(position.name);
    setIsModalOpen(true);
  };

  // Reset form
  const resetForm = () => {
    setPositionName('');
    setCurrentPosition(null);
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <div className="md:flex justify-between items-center mb-4">
        <h2 className="text-lg md:pb-0 pb-2 font-medium">Lavozimlar boshqaruvi</h2>
        <Button onClick={() => setIsModalOpen(true)} size="sm">
          <Plus size={16} className="mr-1" />
          Yangi lavozim
        </Button>
      </div>

      {loading ? (
        <p>Yuklanmoqda...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : positions.length === 0 ? (
        <p className="text-gray-500">Lavozimlar topilmadi</p>
      ) : (
        <div className="space-y-2">
          {positions.map((position) => (
            <div key={position.id} className="flex justify-between items-center p-2 border-b">
              <span>{position.name}</span>
              <div className="flex space-x-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEditModal(position)}
                >
                  <Edit size={14} />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500 hover:bg-red-50"
                  onClick={() => handleDelete(position.id)}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onClose={resetForm} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded bg-white p-4">
            <Dialog.Title className="text-lg font-medium mb-3">
              {currentPosition ? 'Lavozimni tahrirlash' : 'Yangi lavozim'}
            </Dialog.Title>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lavozim nomi *
                </label>
                <input
                  type="text"
                  value={positionName}
                  onChange={(e) => setPositionName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  required
                  autoFocus
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={resetForm}
                >
                  Bekor qilish
                </Button>
                <Button type="submit" size="sm">
                  {currentPosition ? 'Saqlash' : 'Qo\'shish'}
                </Button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default PositionManager;