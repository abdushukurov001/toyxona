import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import client from '../../../services';
import Button from '../../../components/ui/Button';
import { toast } from 'react-toastify';

interface Staff {
  id: number;
  first_name: string;
  last_name: string;
  position: string | number; // string yoki number bo'lishi mumkin
  from_working_hours: string;
  to_working_hours: string;
  salary_type: string;
  salary: number;
  work_start_data: string;
  image?: string | File | null;
}

interface Position {
  id: number;
  name: string;
}

interface EditStaffModalProps {
  staff: Staff;
  onClose: () => void;
  onUpdated: () => void;
  isAdding: boolean;
}

const isFile = (value: string | File | null | undefined): value is File => {
  return value instanceof File;
};

const EditStaffModal: React.FC<EditStaffModalProps> = ({
  staff,
  onClose,
  onUpdated,
  isAdding,
}) => {
  const [formData, setFormData] = useState<Staff>({
    ...staff,
    position: parseInt(String(staff.position)) || 0, // position ni number ga aylantirish
  });
  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await client.get('/uz/api/v1/dashboard/get_all_positions/');
        const allPositions = response.data as Position[];
        setPositions(allPositions);

        // Agar string name kelayotgan bo‘lsa:
        const matchedPosition = allPositions.find(
          (pos) => pos.name === staff.position
        );

        setFormData({
          ...staff,
          position: matchedPosition?.id || 0, // id bo‘yicha moslashtiramiz
        });
      } catch (error) {
        console.error('Pozitsiyalarni olishda xatolik:', error);
        toast.error('Pozitsiyalarni yuklashda xatolik');
      }
    };

    fetchPositions();
  }, [staff]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'salary' ? Number(value) : name === 'position' ? parseInt(value) || 0 : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.position ||
      !formData.from_working_hours ||
      !formData.to_working_hours ||
      !formData.salary ||
      !formData.work_start_data
    ) {
      toast.error("Iltimos, barcha majburiy maydonlarni to‘ldiring");
      return;
    }


    try {
      const url = isAdding
        ? '/uz/api/v1/dashboard/create_our_team/'
        : `/uz/api/v1/dashboard/update_our_team/${formData.id}/`;
      const method = isAdding ? client.post : client.patch;

      const formDataToSend = new FormData();
      formDataToSend.append('first_name', formData.first_name.trim());
      formDataToSend.append('last_name', formData.last_name.trim());
      formDataToSend.append('position', String(formData.position));
      formDataToSend.append('from_working_hours', formData.from_working_hours);
      formDataToSend.append('to_working_hours', formData.to_working_hours);
      formDataToSend.append(
        'salary_type',
        formData.salary_type === 'Monthly' ? '1' :
          formData.salary_type === 'Daily' ? '2' : ''
      );
      formDataToSend.append('salary', formData.salary.toString());
      formDataToSend.append('work_start_data', formData.work_start_data);

      if (isFile(formData.image)) {
        formDataToSend.append('image', formData.image);
      } else if (typeof formData.image === 'string') {
        formDataToSend.append('image_url', formData.image);
      }

      await method(url, formDataToSend);
      toast.success(isAdding ? "Xodim qo‘shildi" : "Xodim yangilandi");
      onUpdated();
      onClose();
    } catch (error: any) {
      console.error("Submit error:", error.response?.data || error);
      toast.error(error.response?.data?.position?.[0] || "Saqlashda xatolik");
    }

  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 space-y-6"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-serif font-bold text-gray-800">
            {isAdding ? "Yangi xodim qo‘shish" : "Xodimni tahrirlash"}
          </h2>
          <Button
            type="button"
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-300 text-gray-800 p-2 rounded-full transition-colors duration-200"
            aria-label="Yopish"
          >
            <X size={20} />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Ism"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
            placeholder="Ismni kiriting"
          />
          <Input
            label="Familiya"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
            placeholder="Familiyani kiriting"
          />
          <div>
            <label className="block">
              <span className="text-gray-700 font-medium text-sm">Pozitsiya</span>
              <select
                name="position"
                value={formData.position.toString()}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-3 text-gray-700 bg-white focus:ring focus:ring-orange-200 focus:border-orange-500 transition-colors duration-200"
                required
              >
                <option value="0">Pozitsiyani tanlang</option>
                {positions.map((pos) => (
                  <option key={pos.id} value={pos.id.toString()}>
                    {pos.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <Input
            label="Ish boshlanish vaqti"
            name="from_working_hours"
            type="time"
            value={formData.from_working_hours}
            onChange={handleChange}
            required
          />
          <Input
            label="Ish tugash vaqti"
            name="to_working_hours"
            type="time"
            value={formData.to_working_hours}
            onChange={handleChange}
            required
          />
          <div>
            <label className="block">
              <span className="text-gray-700 font-medium text-sm">Maosh turi</span>
              <select
                name="salary_type"
                value={formData.salary_type}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-3 text-gray-700 bg-white focus:ring focus:ring-orange-200 focus:border-orange-500 transition-colors duration-200"
                required
              >
                <option value="">Maosh turini tanlang</option>
                <option value="Monthly">Oylik</option>
                <option value="Daily">Kunlik</option>
              </select>
            </label>
          </div>
          <Input
            label="Maosh (so‘m)"
            name="salary"
            type="number"
            value={formData.salary.toString()}
            onChange={handleChange}
            required
            placeholder="Maoshni kiriting"
          />
          <Input
            label="Ish boshlangan sana"
            name="work_start_data"
            type="date"
            value={formData.work_start_data}
            onChange={handleChange}
            required
          />
          <div className="md:col-span-2">
            <label className="block">
              <span className="text-gray-700 font-medium text-sm">Rasm tanlash</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-orange-50 file:text-orange-700 file:font-medium hover:file:bg-orange-100 transition-colors duration-200"
              />
            </label>
            {formData.image && typeof formData.image === 'string' && (
              <div className="mt-4">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full max-w-[200px] h-auto rounded-lg shadow-sm object-cover"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <Button
            type="button"
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            Bekor qilish
          </Button>
          <Button
            type="submit"
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            Saqlash
          </Button>
        </div>
      </form>
    </div>
  );
};

const Input = ({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
  <label className="block">
    <span className="text-gray-700 font-medium text-sm">{label}</span>
    <input
      {...props}
      className="mt-1 block w-full rounded-md border border-gray-300 p-3 text-gray-700 bg-white focus:ring focus:ring-orange-200 focus:border-orange-500 transition-colors duration-200"
    />
  </label>
);

export default EditStaffModal;