import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { FormInput, FormSelect, FormActions } from './FormComponents';
import client from '../../../services';
import { toast } from 'react-toastify';
import Button from '../../../components/ui/Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: () => void;
}

interface Category {
  id: number;
  name: string;
}

interface FormErrors {
  [key: string]: string[];
}

export const AddEventModal: React.FC<ModalProps> = ({ isOpen, onClose, onCreated }) => {
  const [formData, setFormData] = useState({
    book_date: '',
    category: '',
    booker_first_name: '',
    booker_last_name: '',
    phone_number: '',
    number_of_guests: '',
    price: '',
    additional_info: '',
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [, setIsLoadingCategories] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await client.get('/api/v1/dashboard/get_all_categories/');
        setCategories(response.data);
      } catch (error) {
        toast.error("Kategoriyalar ro'yxatini olishda xatolik");
        console.error('Fetch categories error:', error);
      } finally {
        setIsLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const newValue = value;

    if (name === 'phone_number' && value.length > 13) {
      setErrors((prev) => ({
        ...prev,
        phone_number: ["Telefon raqami 13 belgidan oshmasligi kerak"],
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));
    setErrors((prev) => ({ ...prev, [name]: [] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.book_date ||
      !formData.category ||
      !formData.booker_first_name ||
      !formData.phone_number ||
      !formData.number_of_guests ||
      !formData.price
    ) {
      toast.error("Iltimos, barcha majburiy maydonlarni to‘ldiring");
      return;
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(formData.book_date)) {
      setErrors((prev) => ({
        ...prev,
        book_date: ["Sana formati noto‘g‘ri. YYYY-MM-DD formatidan foydalaning (masalan, 2025-06-15)"],
      }));
      toast.error("Sana formati noto‘g‘ri");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('book_date', formData.book_date);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('booker_first_name', formData.booker_first_name);
      formDataToSend.append('booker_last_name', formData.booker_last_name);
      formDataToSend.append('phone_number', formData.phone_number);
      formDataToSend.append('number_of_guests', formData.number_of_guests);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('additional_info', formData.additional_info);

      await client.post('/api/v1/dashboard/create_event/', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success("Tadbir qo‘shildi");
      onCreated?.();
      onClose();
    } catch (error: unknown) {
      if (error instanceof Error && 'response' in error) {
        const axiosError = error as { response?: { data?: FormErrors } };
        if (axiosError.response?.data) {
          const translatedErrors: FormErrors = {};
          for (const [key, messages] of Object.entries(axiosError.response.data)) {
            translatedErrors[key] = messages.map((msg) => {
              if (msg.includes("Ensure this field has no more than 13 characters")) {
                return "Telefon raqami 13 belgidan oshmasligi kerak";
              }
              if (msg.includes("Date has wrong format")) {
                return "Sana formati noto‘g‘ri. YYYY-MM-DD formatidan foydalaning (masalan, 2025-06-15)";
              }
              return msg;
            });
          }
          setErrors(translatedErrors);
          Object.values(translatedErrors).forEach((errArray) => {
            errArray.forEach((err) => toast.error(err));
          });
        } else {
          toast.error("Saqlashda xatolik");
        }
      } else {
        toast.error("Saqlashda xatolik");
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
              Yangi tadbir qo'shish
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
              label="Sana"
              name="book_date"
              type="date"
              value={formData.book_date}
              onChange={handleChange}
              required
              error={errors.book_date?.[0]}
            />
            <FormSelect
              label="Tadbir turi"
              name="category"
              value={String(formData.category)}
              onChange={handleChange}
              required
              options={[
                { value: '', label: 'Tadbir turini tanlang' },
                ...categories.map((cat) => ({
                  value: cat.id.toString(),
                  label: cat.name,
                }))
              ]}
              error={errors.category?.[0]}
            />

            <FormInput
              label="Mijoz ismi"
              name="booker_first_name"
              type="text"
              value={formData.booker_first_name}
              onChange={handleChange}
              required
              error={errors.booker_first_name?.[0]}
            />
            <FormInput
              label="Mijoz familiyasi"
              name="booker_last_name"
              type="text"
              value={formData.booker_last_name}
              onChange={handleChange}
              error={errors.booker_last_name?.[0]}
            />
            <FormInput
              label="Telefon raqami"
              name="phone_number"
              type="tel"
              value={formData.phone_number}
              onChange={handleChange}
              required
              error={errors.phone_number?.[0]}
            />
            <FormInput
              label="Mehmonlar soni"
              name="number_of_guests"
              type="number"
              value={formData.number_of_guests}
              onChange={handleChange}
              required
              error={errors.number_of_guests?.[0]}
            />
            <FormInput
              label="Narxi (kishi boshiga)"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
              error={errors.price?.[0]}
            />
            {/* <FormTextarea
              label="Qo'shimcha ma'lumot"
              name="additional_info"
              rows={3}
              value={formData.additional_info}
              onChange={handleChange}
              error={errors.additional_info?.[0]}
            /> */}
          </div>
          <FormActions onClose={onClose} submitText={''} isSubmitting={false} />
        </form>
      </div>
    </Dialog>
  );
};