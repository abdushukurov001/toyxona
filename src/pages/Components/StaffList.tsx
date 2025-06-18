/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import client from "../../services";
import Button from "../../components/ui/Button";
import { toast } from "react-toastify";
import EditStaffModal from "../Components/Modals.tsx/EditStaff";
import PositionManager from "./PositionManager";

interface Staff {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
  from_working_hours: string;
  to_working_hours: string;
  salary_type: string;
  salary: number;
  work_start_data: string;
  image?: string | File | null;
}

const StaffList: React.FC = () => {
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [editStaff, setEditStaff] = useState<Staff | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchStaffs = async () => {
    try {
      const res = await client.get("/api/v1/dashboard/get_all_our_team/");
      console.log("API Response:", res.data);
      setStaffs(res.data);
    } catch (error) {
      toast.error("Xodimlar ro'yxatini olishda xatolik");
      console.error("Xodimlar ro'yxatini olishda xatolik:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaffs();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Xodimni o‘chirishni xohlaysizmi?")) return;

    try {
      await client.delete(`/api/v1/dashboard/delete_our_team/${id}/`);
      setStaffs((prev) => prev.filter((staff) => staff.id !== id));
      toast.success("Xodim o‘chirildi");
    } catch (error: unknown) {
      toast.error("O‘chirishda xatolik");
      console.error("Delete error:", error);
    }
  };

  const salaryTypeText = (type: string) => {
    switch (type) {
      case "Monthly":
      case "1":
        return "Oylik";
      case "Daily":
      case "2":
        return "Kunlik";
      default:
        return "Noma'lum";
    }
  };

  const handleModalClose = () => {
    setEditStaff(null);
    setIsAdding(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-gray-600 animate-pulse">Yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <section className="space-y-8 p-6 bg-white rounded-lg shadow-md">
      <div className="md:flex   justify-between  items-center">
        <h2 className="text-2xl md:pb-0 pb-2 font-serif font-bold text-gray-800">
          Xodimlar ro'yxati
        </h2>
        <Button
          onClick={() => {
            setEditStaff({
              id: 0,
              first_name: "",
              last_name: "",
              position: "",
              from_working_hours: "",
              to_working_hours: "",
              salary_type: "1", // Default to Oylik for new staff
              salary: 0,
              work_start_data: "",
              image: null,
            });
            setIsAdding(true);
          }}
          className="flex items-center  hover:bg-orange-500 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          <PlusCircle size={18} className="mr-2" /> Yangi xodim qo‘shish
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-300">
              <th className="px-4 py-2 text-left border-r border-gray-300">Ism</th>
              <th className="px-4 py-2 text-left border-r border-gray-300">Lavozim</th>
              <th className="px-4 py-2 text-left border-r border-gray-300">Ish vaqti</th>
              <th className="px-4 py-2 text-left border-r border-gray-300">Maosh turi</th>
              <th className="px-4 py-2 text-left border-r border-gray-300">Maosh</th>
              <th className="px-4 py-2 text-left border-r border-gray-300">Boshlagan sana</th>
              <th className="px-4 py-2 text-left border-r border-gray-300">Rasm</th>
              <th className="px-4 py-2 text-left border-r border-gray-300">Amallar</th>
            </tr>
          </thead>
          <tbody>
            {staffs.map((staff) => (
              <tr key={staff.id} className="border-b border-gray-300">
                <td className="px-4 py-2 border-r border-gray-300">
                  {staff.first_name} {staff.last_name}
                </td>
                <td className="px-4 py-2 border-r border-gray-300">{staff.position}</td>
                <td className="px-4 py-2 border-r border-gray-300">
                  {staff.from_working_hours} - {staff.to_working_hours}
                </td>
                <td className="px-4 py-2 border-r border-gray-300">{salaryTypeText(staff.salary_type)}</td>
                <td className="px-4 py-2 border-r border-gray-300">
                  {staff.salary.toLocaleString()} so‘m
                </td>
                <td className="px-4 py-2 border-r border-gray-300">{staff.work_start_data}</td>
                <td className="px-4 py-2 border-r border-gray-300">
                  {staff.image && typeof staff.image === "string" && (
                    <img
                      src={staff.image}
                      alt={`${staff.first_name} ${staff.last_name}`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                </td>
                <td className="px-4 py-2 border-r border-gray-300 space-x-2 flex">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditStaff(staff)}
                    className="text-orange-600 hover:text-orange-700"
                  >
                    <Edit size={14} className="mr-1" /> Tahrirlash
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(staff.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={14} className="mr-1" /> O‘chirish
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PositionManager />

      {(editStaff || isAdding) && (
        <EditStaffModal
          staff={editStaff!}
          onClose={handleModalClose}
          onUpdated={fetchStaffs}
          isAdding={isAdding}
        />
      )}
    </section>
  );
};

export default StaffList;