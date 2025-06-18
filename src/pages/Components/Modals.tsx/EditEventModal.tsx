/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { FormInput, FormSelect, FormActions } from './FormComponents';
import client from '../../../services';
import { toast } from 'react-toastify';
import Button from '../../../components/ui/Button';

interface Event {
  id: number;
  book_date: string;
  category: string; // Kategoriya ID raqam bo'lishi kerak
  booker_first_name: string;
  booker_last_name: string;
  phone_number: string;
  number_of_guests: number;
  price: number;
  additional_info?: string;
}

interface Category {
  id: number;
  name: string;
  description?: string;
  image?: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdated?: () => void;
  event: Event;
}

interface FormErrors {
  [key: string]: string[];
}

export const EditEventModal: React.FC<ModalProps> = ({ isOpen, onClose, onUpdated, event }) => {
  const [formData, setFormData] = useState({
    book_date: event.book_date,
    category: event.category, // ID ni saqlash, stringga o'tkazmaslik
    booker_first_name: event.booker_first_name,
    booker_last_name: event.booker_last_name,
    phone_number: event.phone_number,
    number_of_guests: event.number_of_guests,
    price: event.price,
    additional_info: event.additional_info || '',
  });
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [, setIsLoading] = useState(false);

useEffect(() => {
  const fetchCategories = async () => {
    try {
      const res = await client.get('/api/v1/dashboard/get_all_categories/');
      setCategories(res.data);

      // formData.category ni ID qilib yangilash (kategoriya nomidan topib)
      const matchedCategory = res.data.find(
        (cat: Category) => cat.name === event.category
      );

      setFormData({
        book_date: event.book_date,
        category: matchedCategory ? matchedCategory.id : '', // ID bo'lishi kerak
        booker_first_name: event.booker_first_name,
        booker_last_name: event.booker_last_name,
        phone_number: event.phone_number,
        number_of_guests: event.number_of_guests,
        price: event.price,
        additional_info: event.additional_info || '',
      });
    } catch (error) {
      toast.error("Kategoriyalar ro'yxatini olishda xatolik");
      console.error('Fetch categories error:', error);
    }
  };

  fetchCategories();
}, [event]);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    // Kategoriya tanlanganda, qiymatni numberga o'tkazish
    const newValue = name === 'category' ? Number(value) : value;

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
    setIsLoading(true);

    // Validatsiya
    if (
      !formData.book_date ||
      !formData.category ||
      !formData.booker_first_name ||
      !formData.phone_number ||
      !formData.number_of_guests ||
      !formData.price
    ) {
      toast.error("Iltimos, barcha majburiy maydonlarni to'ldiring");
      setIsLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('book_date', formData.book_date);
      formDataToSend.append('category', String(formData.category)); // ID ni stringga o'tkazib yuborish
      formDataToSend.append('booker_first_name', formData.booker_first_name);
      formDataToSend.append('booker_last_name', formData.booker_last_name);
      formDataToSend.append('phone_number', formData.phone_number);
      formDataToSend.append('number_of_guests', String(formData.number_of_guests));
      formDataToSend.append('price', String(formData.price));
      formDataToSend.append('additional_info', formData.additional_info);

      await client.patch(`/api/v1/dashboard/update_event/${event.id}/`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success("Tadbir muvaffaqiyatli yangilandi");
      onUpdated?.();
      onClose();
    } catch (error: unknown) {
  console.error("API error:", error);

  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    (error as any).response?.data
  ) {
    const responseData = (error as any).response.data;

    setErrors(responseData);

    Object.values(responseData).forEach((errArray) => {
      if (Array.isArray(errArray)) {
        (errArray as string[]).forEach((err) => toast.error(err));
      }
    });
  } else {
    toast.error("Tadbirni yangilashda xatolik");
  }
} finally {
  setIsLoading(false);
}

  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between items-center">
            <Dialog.Title className="text-2xl font-serif font-bold text-gray-800">
              Tadbirni tahrirlash
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

            {/* Qolgan form elementlari... */}
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
              value={String(formData.number_of_guests)}
              onChange={handleChange}
              required
              error={errors.number_of_guests?.[0]}
            />
            <FormInput
              label="Narxi (so'm)"
              name="price"
              type="number"
              value={String(formData.price)}
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