import { Edit, PlusCircle, Trash2 } from "lucide-react";
import Button from "../../components/ui/Button"; // yoki sizdagi to'g'ri yo'l bo'yicha
import React from "react";

interface CategoryTabProps {
  onAddCategory: () => void;
}

const CategoryTab: React.FC<CategoryTabProps> = ({ onAddCategory }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-serif">Tadbir turlari</h2>
        <Button onClick={onAddCategory}>
          <PlusCircle size={18} className="mr-2" />
          Yangi tur qo'shish
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left">Nomi</th>
              <th className="px-4 py-2 text-left">Tavsif</th>
              <th className="px-4 py-2 text-left">Rasm</th>
              <th className="px-4 py-2 text-left">Amallar</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2">To'y marosimi</td>
              <td className="px-4 py-2">To'y va nikoh marosimlari</td>
              <td className="px-4 py-2">
                <img
                  src="https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg"
                  alt="To'y"
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="px-4 py-2 space-x-2">
                <Button size="sm" variant="outline">
                  <Edit size={14} className="mr-1" />
                  O'zgartirish
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-500 hover:text-red-600"
                >
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

export default CategoryTab;
