// components/StaffList.tsx
import Button  from "../../components/ui/Button";
import { PlusCircle, Edit, Trash2 } from "lucide-react";

interface StaffListProps {
  onAddStaff: () => void;
}

const StaffList: React.FC<StaffListProps> = ({ onAddStaff }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-serif">Xodimlar ro'yxati</h2>
        <Button onClick={onAddStaff}>
          <PlusCircle size={18} className="mr-2" />
          Yangi xodim qo'shish
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left">Ism</th>
              <th className="px-4 py-2 text-left">Lavozim</th>
              <th className="px-4 py-2 text-left">Ish vaqti</th>
              <th className="px-4 py-2 text-left">Maosh turi</th>
              <th className="px-4 py-2 text-left">Maosh</th>
              <th className="px-4 py-2 text-left">Boshlagan sana</th>
              <th className="px-4 py-2 text-left">Amallar</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2">Ahmedov Bobur</td>
              <td className="px-4 py-2">Director</td>
              <td className="px-4 py-2">09:00 - 18:00</td>
              <td className="px-4 py-2">Oylik</td>
              <td className="px-4 py-2">5,000,000 so'm</td>
              <td className="px-4 py-2">2024-01-15</td>
              <td className="px-4 py-2 space-x-2">
                <Button size="sm" variant="outline">
                  <Edit size={14} className="mr-1" />
                  O'zgartirish
                </Button>
                <Button size="sm" variant="outline" className="text-red-500 hover:text-red-600">
                  <Trash2 size={14} className="mr-1" />
                  O'chirish
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffList;
