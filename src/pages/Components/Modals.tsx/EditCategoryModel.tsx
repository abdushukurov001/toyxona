import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { FormInput, FormTextarea, FormActions } from './FormComponents';
import client from '../../../services';
import { toast } from 'react-toastify';
import Button from '../../../components/ui/Button';

interface Category {
  id: number;
  name: string;
  description: string;
  image?: string | null;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdated?: () => void;
  category: Category;
}

interface FormErrors {
  [key: string]: string[];
}

export const EditCategoryModal: React.FC<ModalProps> = ({ isOpen, onClose, onUpdated, category }) => {
  const [formData, setFormData] = useState({
    name: category.name,
    description: category.description,
  });
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: [] }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setErrors((prev) => ({ ...prev, image: [] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name) {
      toast.error("Iltimos, nomni kiriting");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      if (image) {
        formDataToSend.append('image', image);
      }

      await client.patch(`/api/v1/dashboard/update_category/${category.id}/`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success("Kategoriya yangilandi");
      onUpdated?.();
      onClose();
    } catch (error: unknown) {
      if (error instanceof Error && 'response' in error) {
        const axiosError = error as { response?: { data?: FormErrors } };
        if (axiosError.response?.data) {
          setErrors(axiosError.response.data);
          Object.values(axiosError.response.data).forEach((errArray) => {
            errArray.forEach((err) => toast.error(err));
          });
        } else {
          toast.error("Yangilashda xatolik");
        }
      } else {
        toast.error("Yangilashda xatolik");
      }
      console.error("Submit error:", error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between items-center">
            <Dialog.Title className="text-2xl font-serif font-bold text-gray-800">
              Tadbir turini tahrirlash
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
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              error={errors.name?.[0]}
            />
            <FormTextarea
              label="Tavsif"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              error={errors.description?.[0]}
            />
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Joriy rasm
              </label>
              {category.image ? (
                <img
                  src={category.image}
                  alt={formData.name}
                  className="w-32 h-32 object-cover rounded border border-gray-300"
                />
              ) : (
                <span className="text-gray-500">Rasm yo'q</span>
              )}
              <FormInput
                label="Yangi rasm"
                name="image"
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                error={errors.image?.[0]}
              />
            </div>
          </div>
          <FormActions onClose={onClose} submitText={''} isSubmitting={false} />
        </form>
      </div>
    </Dialog>
  );
};