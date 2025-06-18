/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X, Trash2 } from 'lucide-react';
import { FormInput, FormTextarea, FormActions } from './FormComponents';
import client from '../../../services';
import { toast } from 'react-toastify';
import Button from '../../../components/ui/Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: () => void;
}

interface FormErrors {
  [key: string]: string[];
}

export const AddPriceModal: React.FC<ModalProps> = ({ isOpen, onClose, onCreated }) => {
  const [formData, setFormData] = useState({
    type: '',
    price: '',
    description: '',
  });
  const [highlights, setHighlights] = useState<string[]>([]);
  const [newHighlight, setNewHighlight] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: [] }));
  };

  const handleAddHighlight = () => {
    if (!newHighlight.trim()) {
      toast.error("Iltimos, xizmat tavsifini kiriting");
      return;
    }
    setHighlights((prev) => [...prev, newHighlight.trim()]);
    setNewHighlight('');
  };

  const handleRemoveHighlight = (index: number) => {
    setHighlights((prev) => prev.filter((_, i) => i !== index));
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
      await client.post('/uz/api/v1/dashboard/create_price/', {
        type: formData.type,
        price: priceValue,
        description: formData.description,
        highlights: highlights
      });

      toast.success("Narx muvaffaqiyatli qo'shildi");
      onCreated?.();
      onClose();
      setFormData({ type: '', price: '', description: '' });
      setHighlights([]);
    } catch (error: any) {
      if (error.response?.data) {
        setErrors(error.response.data);
        Object.values(error.response.data).forEach((errArray: any) => {
          errArray.forEach((err: string) => toast.error(err));
        });
      } else {
        toast.error("Saqlashda xatolik yuz berdi");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between items-center">
            <Dialog.Title className="text-2xl font-serif font-bold text-gray-800">
              Yangi tarif qo'shish
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
                  onClick={handleAddHighlight}
                  className="bg-orange-400 hover:bg-orange-500 text-white h-10"
                >
                  Qo'shish
                </Button>
              </div>
              {highlights.length > 0 && (
                <ul className="list-disc list-inside mt-2">
                  {highlights.map((highlight, index) => (
                    <li key={index} className="flex justify-between  items-center">
                      <span>{highlight}</span>
                      <Button
                        type="button"
                        onClick={() => handleRemoveHighlight(index)}
                        className="text-red-500 mt-2 bg-red-500 hover:bg-red-600"
                        aria-label="O'chirish"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <FormActions 
            onClose={onClose} 
            submitText="Saqlash" 
            isSubmitting={isSubmitting}
          />
        </form>
      </div>
    </Dialog>
  );
};