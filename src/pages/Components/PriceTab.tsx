import { Edit, PlusCircle, Trash2 } from "lucide-react";
import Button from "../../components/ui/Button"; // yoki sizdagi to'g'ri yo'l bo'yicha
import React from "react";

interface PriceTabProps {
  onAddPricePackage: () => void;
}

const PriceTab: React.FC<PriceTabProps> = ({ onAddPricePackage }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-serif">Narxlar</h2>
        <Button onClick={onAddPricePackage}>
          <PlusCircle size={18} className="mr-2" />
          Yangi tarif qo'shish
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left">Nomi</th>
              <th className="px-4 py-2 text-left">Narxi</th>
              <th className="px-4 py-2 text-left">Tavsif</th>
              <th className="px-4 py-2 text-left">Xizmatlar</th>
              <th className="px-4 py-2 text-left">Amallar</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2">Standart</td>
              <td className="px-4 py-2">180,000 so'm</td>
              <td className="px-4 py-2">Asosiy xizmatlar to'plami</td>
              <td className="px-4 py-2">
                <ul className="list-disc list-inside">
                  <li>2 xil taom</li>
                  <li>Ichimliklar</li>
                  <li>Bezatish</li>
                </ul>
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

export default PriceTab;
