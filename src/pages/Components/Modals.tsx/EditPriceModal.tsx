/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X, Trash2, Edit } from 'lucide-react';
import { FormInput, FormTextarea, FormActions } from './FormComponents';
import client from '../../../services';
import { toast } from 'react-toastify';
import Button from '../../../components/ui/Button';

// Define Highlight interface to match API response
interface Highlight {
  id: number;
  description: string;
}

interface Price {
  id: number;
  type: string;
  price: number;
  description: string;
  highlight: Highlight[];
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdated?: () => void;
  price: Price;
}

interface FormErrors {
  [key: string]: string[];
}

export const EditPriceModal: React.FC<ModalProps> = ({ isOpen, onClose, onUpdated, price }) => {
  const [formData, setFormData] = useState({
    type: price.type,
    price: price.price.toString(),
    description: price.description,
  });
  const [highlights, setHighlights] = useState<Highlight[]>(price.highlight || []);
  const [newHighlight, setNewHighlight] = useState('');
  const [editingHighlight, setEditingHighlight] = useState<Highlight | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: [] }));
  };

  const handleAddOrUpdateHighlight = async () => {
    if (!newHighlight.trim()) {
      toast.error("Iltimos, xizmat tavsifini kiriting");
      return;
    }

    try {
      if (editingHighlight) {
        // Update existing highlight
        await client.patch(`/uz/api/v1/dashboard/update_price_highlight/${editingHighlight.id}/`, {
          description: newHighlight.trim(),
        });
        setHighlights((prev) =>
          prev.map((h) =>
            h.id === editingHighlight.id ? { ...h, description: newHighlight.trim() } : h
          )
        );
        toast.success("Xizmat yangilandi");
      } else {
        // Add new highlight using the new endpoint
        const response = await client.post(`/uz/api/v1/dashboard/create_price_highlight/${price.id}/`, {
          description: newHighlight.trim(),
        });
        setHighlights((prev) => [...prev, response.data]);
        toast.success("Xizmat qo'shildi");
      }
      setNewHighlight('');
      setEditingHighlight(null);
    } catch (error) {
      toast.error("Xizmatni qo'shish/yangilashda xatolik");
      console.error(error);
    }
  };

  const handleEditHighlight = (highlight: Highlight) => {
    setEditingHighlight(highlight);
    setNewHighlight(highlight.description);
  };

  const handleRemoveHighlight = async (id: number) => {
    try {
      await client.delete(`/uz/api/v1/dashboard/delete_price_highlight/${id}/`);
      setHighlights((prev) => prev.filter((h) => h.id !== id));
      if (editingHighlight?.id === id) {
        setEditingHighlight(null);
        setNewHighlight('');
      }
      toast.success("Xizmat o'chirildi");
    } catch (error) {
      toast.error("Xizmatni o'chirishda xatolik");
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.type || !formData.price || !formData.description) {
      toast.error("Iltimos, barcha majburiy maydonlarni to'ldiring");
      setIsSubmitting(false);
      return;
    }

    const priceValue = parseFloat(formData.price);
    if (isNaN(priceValue)) {
      setErrors((prev) => ({
        ...prev,
        price: ["Narx raqam bo'lishi kerak"],
      }));
      toast.error("Narx raqam bo'lishi kerak");
      setIsSubmitting(false);
      return;
    }

    try {
      // Update price details
      await client.patch(`/uz/api/v1/dashboard/update_price/${price.id}/`, {
        type: formData.type,
        price: priceValue,
        description: formData.description,
      });

      toast.success("Narx yangilandi");
      onUpdated?.();
      onClose();
    } catch (error: any) {
      if (error.response?.data) {
        setErrors(error.response.data);
        Object.values(error.response.data).forEach((errArray: any) => {
          errArray.forEach((err: string) => toast.error(err));
        });
      } else {
        toast.error("Yangilashda xatolik yuz berdi");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between items-center">
            <Dialog.Title className="text-2xl font-serif font-bold text-gray-800">
              Tarifni tahrirlash
            </Dialog.Title>
            <Button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-300 text-gray-800 p-2 rounded-full"
              aria-label="Yopish"
            >
              <X size={20} />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Nomi"
              name="type"
              type="text"
              value={formData.type}
              onChange={handleChange}
              required
              error={errors.type?.[0]}
            />
            <FormInput
              label="Narxi (so'm)"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
              error={errors.price?.[0]}
            />
            <FormTextarea
              label="Tavsif"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              required
              error={errors.description?.[0]}
            />
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Xizmatlar</label>
              <div className="flex gap-2">
                <FormInput
                  label=""
                  name="newHighlight"
                  type="text"
                  value={newHighlight}
                  onChange={(e) => setNewHighlight(e.target.value)}
                  placeholder="Xizmat tavsifini kiriting"
                />
                <Button
                  type="button"
                  onClick={handleAddOrUpdateHighlight}
                  className="bg-orange-400 hover:bg-orange-500 text-white h-10"
                >
                  {editingHighlight ? 'Yangilash' : "Qo'shish"}
                </Button>
              </div>
              {highlights.length > 0 && (
                <ul className="list-disc list-inside mt-2">
                  {highlights.map((highlight) => (
                    <li key={highlight.id} className="flex justify-between items-center">
                      <span>{highlight.description}</span>
                      <div className="flex mt-2 gap-2">
                        <Button
                          type="button"
                          onClick={() => handleEditHighlight(highlight)}
                          className={
                            editingHighlight?.id === highlight.id
                              ? 'text-blue-600 hover:text-blue-700'
                              : 'text-orange-600 hover:text-orange-700'
                          }
                          aria-label="Tahrirlash"
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          type="button"
                          onClick={() => handleRemoveHighlight(highlight.id)}
                          className="text-red-500 bg-red-500 hover:bg-red-600 "
                          aria-label="O'chirish"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <FormActions onClose={onClose} submitText="Yangilash" isSubmitting={isSubmitting} />
        </form>
      </div>
    </Dialog>
  );
};