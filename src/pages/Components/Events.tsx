import { Edit, PlusCircle, Trash2 } from "lucide-react";
import Button from "../../components/ui/Button"; // yoki sizdagi to'g'ri yo'l bo'yicha
import React from "react";

interface EventsTabProps {
  onAddEvent: () => void;
}

const EventsTab: React.FC<EventsTabProps> = ({ onAddEvent }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-serif">Tadbirlar ro'yxati</h2>
        <Button onClick={onAddEvent}>
          <PlusCircle size={18} className="mr-2" />
          Yangi tadbir qo'shish
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left">Sana</th>
              <th className="px-4 py-2 text-left">Tadbir turi</th>
              <th className="px-4 py-2 text-left">Mijoz</th>
              <th className="px-4 py-2 text-left">Telefon</th>
              <th className="px-4 py-2 text-left">Mehmonlar soni</th>
              <th className="px-4 py-2 text-left">Narxi</th>
              <th className="px-4 py-2 text-left">Amallar</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2">2025-05-15</td>
              <td className="px-4 py-2">To'y marosimi</td>
              <td className="px-4 py-2">Karimov A.</td>
              <td className="px-4 py-2">+998 90 123 45 67</td>
              <td className="px-4 py-2">200</td>
              <td className="px-4 py-2">180,000 so'm</td>
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

export default EventsTab;
