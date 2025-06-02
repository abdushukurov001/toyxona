import { useEffect, useState } from "react";
import Button from "../../components/ui/Button";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import client from "../../services";

interface Staff {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
  from_working_hours: string;
  to_working_hours: string;
  salary_type: number;
  salary: number;
  work_start_data: string;
  image?: string | null;
}

interface StaffListProps {
  onAddStaff: () => void;
}

const StaffList: React.FC<StaffListProps> = ({ onAddStaff }) => {
  const [staffs, setStaffs] = useState<Staff[]>([]);

  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        const res = await client.get("/api/v1/dashboard/get_all_our_team/");
        console.log(res)
        setStaffs(res.data);
      } catch (error) {
        console.error("Xodimlar ro'yxatini olishda xatolik:", error);
      }
    };
    fetchStaffs();
  }, []);

  const getSalaryType = (type: number) => {
    if (type === 1) return "Soatlik";
    if (type === 2) return "Oylik";
    return "Nomaʼlum";
  };

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
            {staffs.map((staff) => (
              <tr key={staff.id} className="border-t">
                <td className="px-4 py-2">{staff.first_name} {staff.last_name}</td>
                <td className="px-4 py-2">{staff.position}</td>
                <td className="px-4 py-2">{staff.from_working_hours} - {staff.to_working_hours}</td>
                <td className="px-4 py-2">{getSalaryType(staff.salary_type)}</td>
                <td className="px-4 py-2">{staff.salary.toLocaleString()} so'm</td>
                <td className="px-4 py-2">{staff.work_start_data}</td>
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffList;
