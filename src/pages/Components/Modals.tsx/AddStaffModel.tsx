import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { FormInput, FormSelect, FormActions } from './FormComponents';
import client from '../../../services';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
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
  });

  const [image, setImage] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const form = new FormData();
  form.append('first_name', formData.first_name);
  form.append('last_name', formData.last_name);
  form.append('from_working_hours', formData.from_working_hours);
  form.append('to_working_hours', formData.to_working_hours);
  form.append('salary_type', formData.salary_type || '0');
  form.append('salary', formData.salary || '0');
  form.append('work_start_data', formData.work_start_data);
  if (image) {
    form.append('image', image);
  }

  try {
    const response = await client.post('/api/v1/dashboard/create_our_team/', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log("API Response:", response);
    onClose();
  } catch (error) {
    console.error("API Error:", error);
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
              label="Maosh turi"
              name="salary_type"
              value={formData.salary_type}
              onChange={handleChange}
              options={[
                { value: '0', label: 'Oylik' },
                { value: '1', label: 'Kunlik' }
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
            />
            <FormActions onClose={onClose} />
          </form>
        </div>
      </div>
    </Dialog>
  );
};
