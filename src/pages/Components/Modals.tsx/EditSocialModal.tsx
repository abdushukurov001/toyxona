import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { FormInput, FormActions } from './FormComponents';
import client from '../../../services';
import { toast } from 'react-toastify';
import Button from '../../../components/ui/Button';

interface SocialMediaItem {
  id: number;
  name: string;
  url: string;
  social_media_image?: string | null;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdated?: () => void;
  item: SocialMediaItem;
}

interface FormErrors {
  [key: string]: string[];
}

export const EditSocialMediaModal: React.FC<ModalProps> = ({ isOpen, onClose, onUpdated, item }) => {
  const [formData, setFormData] = useState({
    name: item.name,
    url: item.url,
  });
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: [] }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith('image/')) {
        setErrors((prev) => ({
          ...prev,
          social_media_image: ["Iltimos, faqat rasm faylini yuklang"],
        }));
        toast.error("Iltimos, faqat rasm faylini yuklang");
        return;
      }
      setImage(file);
      setErrors((prev) => ({ ...prev, social_media_image: [] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.url.trim()) {
      toast.error("Iltimos, nom va URL maydonlarini to‘ldiring");
      return;
    }

    // Basic URI validation
    try {
      new URL(formData.url);
    } catch {
      setErrors((prev) => ({
        ...prev,
        url: ["Iltimos, to‘g‘ri URL kiriting"],
      }));
      toast.error("Iltimos, to‘g‘ri URL kiriting");
      return;
    }

    try {
      const data = new FormData();
      data.append('name', formData.name.trim());
      data.append('url', formData.url.trim());
      if (image) {
        data.append('social_media_image', image);
      }

      const response = await client.patch(`/api/v1/dashboard/update_social_media/${item.id}/`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Update response:', response.data); // Debug log

      toast.success("Ijtimoiy tarmoq yangilandi");
      onUpdated?.();
      onClose();
    } catch (error: unknown) {
      console.error('Submit error:', error); // Debug log
      if (error instanceof Error && 'response' in error) {
        const axiosError = error as { response?: { data?: FormErrors | { detail?: string } } };
        if (axiosError.response?.data) {
          if ('detail' in axiosError.response.data) {
            toast.error(axiosError.response.data.detail || "Yangilashda xatolik");
          } else {
            const translatedErrors: FormErrors = {};
            for (const [key, messages] of Object.entries(axiosError.response.data)) {
              translatedErrors[key] = (messages as string[]).map((msg) => {
                if (msg.includes("is not a valid URL")) {
                  return "URL noto‘g‘ri formatda";
                }
                if (msg.includes("maximum length")) {
                  return key === 'name'
                    ? "Nomi 250 belgidan oshmasligi kerak"
                    : "URL 200 belgidan oshmasligi kerak";
                }
                if (msg.includes("minimum length")) {
                  return "Maydon bo‘sh bo‘lmasligi kerak";
                }
                if (key === 'social_media_image') {
                  return "Rasm yuklashda xatolik: " + msg;
                }
                return msg;
              });
            }
            setErrors(translatedErrors);
            Object.values(translatedErrors).forEach((errArray) => {
              errArray.forEach((err) => toast.error(err));
            });
          }
        } else {
          toast.error("Yangilashda xatolik");
        }
      } else {
        toast.error("Yangilashda xatolik");
      }
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between items-center">
            <Dialog.Title className="text-2xl font-serif font-bold text-gray-800">
              Ijtimoiy tarmoqni tahrirlash
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
            <FormInput
              label="URL"
              name="url"
              type="url"
              value={formData.url}
              onChange={handleChange}
              required
              error={errors.url?.[0]}
            />
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Joriy rasm</label>
              {item.social_media_image ? (
                <img
                  src={item.social_media_image}
                  alt={formData.name}
                  className="w-32 h-32 object-cover rounded border border-gray-300"
                />
              ) : (
                <span className="text-gray-500">Rasm yo'q</span>
              )}
              <FormInput
                label="Yangi rasm"
                name="social_media_image"
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                error={errors.social_media_image?.[0]}
              />
            </div>
          </div>
          <FormActions onClose={onClose} submitText={''} isSubmitting={false} />
        </form>
      </div>
    </Dialog>
  );
};