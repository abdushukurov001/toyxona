import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { FormInput, FormSelect, FormActions } from './FormComponents';
import client from '../../../services';
import { toast } from 'react-toastify';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Position {
  id: number;
  name: string;
}

export const AddStaffModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    from_working_hours: '',
    to_working_hours: '',
    salary_type: '',
    salary: '',
    work_start_data: '',
    position: 0,
  });

  const [image, setImage] = useState<File | null>(null);
  const [positions, setPositions] = useState<Position[]>([]);
  const [, setLoading] = useState(false);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await client.get('/uz/api/v1/dashboard/get_all_positions/');
        setPositions(response.data);
      } catch (error) {
        console.error('Pozitsiyalarni olishda xatolik:', error);
        toast.error('Pozitsiyalarni yuklashda xatolik');
      }
    };
    fetchPositions();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(`Change: ${name} = ${value}`); // Debug: Log input changes
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'position' ? parseInt(value) || 0 : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log('Selected Image:', file); // Debug: Log selected file
      setImage(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.first_name || !formData.last_name) {
      toast.error("Ism va familiya majburiy");
      return;
    }

    if (!formData.position) {
      toast.error("Iltimos, pozitsiyani tanlang");
      return;
    }

    if (!formData.salary_type) {
      toast.error("Iltimos, maosh turini tanlang");
      return;
    }

    if (!formData.from_working_hours || !formData.to_working_hours) {
      toast.error("Ish vaqtlarini kiriting");
      return;
    }

    if (!formData.work_start_data) {
      toast.error("Ish boshlash sanasini kiriting");
      return;
    }

    setLoading(true);
    const form = new FormData();
    form.append('first_name', formData.first_name.trim());
    form.append('last_name', formData.last_name.trim());
    form.append('from_working_hours', formData.from_working_hours);
    form.append('to_working_hours', formData.to_working_hours);
    form.append('salary_type', formData.salary_type);
    form.append('salary', formData.salary || '0');
    form.append('work_start_data', formData.work_start_data);
    form.append('position', formData.position.toString());
    if (image) {
      form.append('image', image);
    }

    // Debug: Log FormData contents
    for (const [key, value] of form.entries()) {
      console.log(`FormData: ${key} = ${value}`);
    }

    try {
      const response = await client.post('/uz/api/v1/dashboard/create_our_team/', form);
      console.log('API Response:', response.data);
      toast.success("Xodim muvaffaqiyatli qo'shildi");
      onClose();
      setFormData({
        first_name: '',
        last_name: '',
        from_working_hours: '',
        to_working_hours: '',
        salary_type: '',
        salary: '',
        work_start_data: '',
        position: 0,
      });
      setImage(null);
    } catch (error: any) {
      console.error('API Error:', {
        data: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers,
        config: error.config,
      });
      toast.error(error.response?.data?.detail || "Xodim qo'shishda xatolik");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="relative bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <Dialog.Title className="text-lg font-medium mb-4">Yangi xodim qo'shish</Dialog.Title>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
              label="Ism"
              name="first_name"
              type="text"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Familiya"
              name="last_name"
              type="text"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="Ish boshlash vaqti"
                name="from_working_hours"
                type="time"
                value={formData.from_working_hours}
                onChange={handleChange}
                required
              />
              <FormInput
                label="Ish tugash vaqti"
                name="to_working_hours"
                type="time"
                value={formData.to_working_hours}
                onChange={handleChange}
                required
              />
            </div>

            <FormSelect
              label="Pozitsiya"
              name="position"
              value={formData.position.toString()}
              onChange={handleChange}
              required
              options={[
                { value: '0', label: 'Pozitsiyani tanlang' },
                ...positions.map((pos) => ({ value: pos.id.toString(), label: pos.name })),
              ]}
            />

            <FormSelect
              label="Maosh turi"
              name="salary_type"
              value={formData.salary_type}
              onChange={handleChange}
              required
              options={[
                { value: '', label: 'Maosh turini tanlang' },
                { value: '1', label: 'Oylik' },
                { value: '2', label: 'Kunlik' },
              ]}
            />

            <FormInput
              label="Maosh miqdori"
              name="salary"
              type="number"
              value={formData.salary}
              onChange={handleChange}
            />
            <FormInput
              label="Ish boshlash sanasi"
              name="work_start_data"
              type="date"
              value={formData.work_start_data}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Rasm yuklash"
              name="image"
              type="file"
              onChange={handleImageChange}
              accept="image/*"
            />
            <FormActions onClose={onClose} />
          </form>
        </div>
      </div>
    </Dialog>
  );
};