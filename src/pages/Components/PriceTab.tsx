import { Edit, PlusCircle, Trash2 } from "lucide-react";
import Button from "../../components/ui/Button";
import React, { useEffect, useState } from "react";
import client from "../../services";
import { toast } from "react-toastify";
import { AddPriceModal } from "./Modals.tsx/AddPriceModal";
import { EditPriceModal } from "./Modals.tsx/EditPriceModal";

// Define the Highlight interface to match the API response
interface Highlight {
  id: number;
  description: string;
  price: number;
}

interface Price {
  id: number;
  type: string;
  price: number;
  description: string;
  highlight: Highlight[]; // Updated to match API response (array of Highlight objects)
}

interface PriceTabProps {
  onAddPricePackage: () => void;
}

const PriceTab: React.FC<PriceTabProps> = () => {
  const [prices, setPrices] = useState<Price[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editPrice, setEditPrice] = useState<Price | null>(null);

  const fetchPrices = async () => {
    setLoading(true);
    try {
      const response = await client.get<Price[]>("/uz/api/v1/dashboard/get_all_prices/");
      setPrices(response.data);
      setError(null);
    } catch (err) {
      setError("Narxlarni yuklashda xatolik yuz berdi");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  const handleDeletePrice = async (id: number) => {
    if (window.confirm("Ushbu narxni rostdan ham o'chirmoqchimisiz?")) {
      try {
        await client.delete(`/uz/api/v1/dashboard/delete_price/${id}/`);
        setPrices((prev) => prev.filter((price) => price.id !== id));
        toast.success("Narx o'chirildi");
      } catch (error) {
        toast.error("O'chirishda xatolik");
      }
    }
  };

  return (
    <div>
      <div className="md:flex justify-between items-center mb-6">
        <h2 className="text-xl md:pb-0 pb-2 font-serif">Narxlar</h2>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-orange-400 hover:bg-orange-500 text-white"
        >
          <PlusCircle size={18} className="mr-2" />
          Yangi tarif qo'shish
        </Button>
      </div>

      {loading && <p className="text-gray-600">Yuklanmoqda...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-center border border-gray-300">Nomi</th>
                <th className="px-4 py-2 text-center border border-gray-300">Narxi</th>
                <th className="px-4 py-2 text-center border border-gray-300">Tavsif</th>
                <th className="px-4 py-2 text-center border border-gray-300">Xizmatlar</th>
                <th className="px-4 py-2 text-center border border-gray-300">Amallar</th>
              </tr>
            </thead>
            <tbody>
              {prices.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    Narxlar topilmadi
                  </td>
                </tr>
              ) : (
                prices.map((price) => (
                  <tr key={price.id} className="border-t">
                    <td className="px-4 py-2 border border-gray-300">{price.type}</td>
                    <td className="px-4 py-2 border border-gray-300">
                      {price.price.toLocaleString()} so'm
                    </td>
                    <td className="px-4 py-2 border border-gray-300">{price.description}</td>
                    <td className="px-4 py-2 border border-gray-300">
                      <ul className="list-disc list-inside">
                        {price.highlight?.map((highlight, index) => (
                          <li key={index}>{highlight.description}</li> // Render the description field
                        ))}
                      </ul>
                    </td>
                    <td className="px-4 py-2  flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-orange-600 hover:text-orange-700"
                        onClick={() => setEditPrice(price)}
                      >
                        <Edit size={14} className="mr-1" />
                        O'zgartirish
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-500 hover:bg-red-500 hover:text-white"
                        onClick={() => handleDeletePrice(price.id)}
                      >
                        <Trash2 size={14} className="mr-1" />
                        O'chirish
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {isAddModalOpen && (
        <AddPriceModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onCreated={fetchPrices}
        />
      )}

      {editPrice && (
        <EditPriceModal
          isOpen={!!editPrice}
          onClose={() => setEditPrice(null)}
          onUpdated={fetchPrices}
          price={editPrice}
        />
      )}
    </div>
  );
};

export default PriceTab;