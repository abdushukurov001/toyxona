import React, { useState, useEffect } from 'react';
import { Edit, Plus, Trash2 } from 'lucide-react';
import Button from '../../components/ui/Button';
import client from '../../services';
import { toast } from 'react-toastify';
import { Dialog } from '@headlessui/react';

interface Highlight {
  id: number;
  title: string;
  description: string;
}

const AboutUsHighlights = () => {
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentHighlight, setCurrentHighlight] = useState<Highlight | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  // Fetch highlights
  const fetchHighlights = async () => {
    setLoading(true);
    try {
      const response = await client.get('/uz/api/v1/dashboard/get_about_us_highlight/');
      setHighlights(response.data);
    } catch (err) {
      setError('Maʼlumotlarni yuklashda xatolik yuz berdi');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHighlights();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Reset form and modal state
  const resetForm = () => {
    setFormData({ title: '', description: '' });
    setCurrentHighlight(null);
    setIsModalOpen(false);
  };

  // Submit form (create or update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      toast.error('Iltimos, barcha maydonlarni toʻldiring');
      return;
    }

    try {
      if (currentHighlight) {
        // Update existing highlight
        await client.patch(
          `/uz/api/v1/dashboard/update_about_us_highlight/${currentHighlight.id}/`,
          formData
        );
        toast.success('Maʼlumot muvaffaqiyatli yangilandi');
      } else {
        // Create new highlight
        await client.post(
          '/uz/api/v1/dashboard/create_about_us_highlight/',
          formData
        );
        toast.success('Yangi maʼlumot qoʻshildi');
      }
      fetchHighlights();
      resetForm();
    } catch (error) {
      toast.error('Amalni bajarishda xatolik yuz berdi');
      console.error('Submit error:', error);
    }
  };

  // Delete highlight
  const handleDelete = async (id: number) => {
    try {
      await client.delete(`/uz/api/v1/dashboard/delete_about_us_highlight/${id}/`);
      toast.success('Maʼlumot oʻchirildi');
      fetchHighlights();
    } catch (error) {
      toast.error('Oʻchirishda xatolik yuz berdi');
      console.error('Delete error:', error);
    }
  };

  // Open modal for editing
  const openEditModal = (highlight: Highlight) => {
    setCurrentHighlight(highlight);
    setFormData({
      title: highlight.title,
      description: highlight.description
    });
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow mx-auto max-w-4xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-lg sm:text-xl font-semibold">Biz haqimizda bo'limlari</h2>
        <Button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto min-h-[44px]">
          <Plus size={16} className="mr-2" />
          Yangi qo'shish
        </Button>
      </div>

      {loading && <p className="text-center">Yuklanmoqda...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="space-y-4">
        {highlights.length === 0 && !loading ? (
          <p className="text-gray-500 text-center">Maʼlumotlar topilmadi</p>
        ) : (
          highlights.map((highlight) => (
            <div key={highlight.id} className="p-4 border rounded-lg hover:bg-gray-50 flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="flex-1">
                <h3 className="font-medium text-base sm:text-lg">{highlight.title}</h3>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">{highlight.description}</p>
              </div>
              <div className="flex space-x-2 w-full sm:w-auto">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openEditModal(highlight)}
                  className="flex-1 sm:flex-none min-h-[40px] text-sm"
                >
                  <Edit size={14} className="mr-1" />
                  Tahrirlash
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 sm:flex-none min-h-[40px] hover:bg-red-500 text-red-500  text-sm"
                  onClick={() => handleDelete(highlight.id)}
                >
                  <Trash2 size={14} className="mr-1" />
                  O'chirish
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onClose={resetForm} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
          <Dialog.Panel className="w-full max-w-md rounded bg-white p-4 sm:p-6">
            <Dialog.Title className="text-lg sm:text-xl font-semibold mb-4">
              {currentHighlight ? 'Tahrirlash' : 'Yangi qoʻshish'}
            </Dialog.Title>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sarlavha *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                  maxLength={300}
                  required
                />
                <span className="text-red-500 text-xs mt-1 hidden peer-invalid:block">Majburiy</span>
              </div>

              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tavsif *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                  rows={4}
                  required
                />
                <span className="text-red-500 text-xs mt-1 hidden peer-invalid:block">Majburiy</span>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  className="min-h-[40px] text-sm"
                >
                  Bekor qilish
                </Button>
                <Button type="submit" className="min-h-[40px] text-sm">
                  {currentHighlight ? 'Saqlash' : 'Qoʻshish'}
                </Button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default AboutUsHighlights;