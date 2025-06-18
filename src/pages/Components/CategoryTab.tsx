import { Edit, PlusCircle, Trash2 } from "lucide-react";
import Button from "../../components/ui/Button";
import React, { useEffect, useState } from "react";
import client from "../../services";
import { toast } from "react-toastify";
import { EditCategoryModal } from "./Modals.tsx/EditCategoryModel";
import { AddCategoryModal } from "./Modals.tsx/AddCategoryModel";


interface Category {
  id: number;
  name: string; // Changed back to name
  description: string;
  image?: string | null;
}

interface CategoryTabProps {
  onAddCategory: () => void;
}

const CategoryTab: React.FC<CategoryTabProps> = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await client.get<Category[]>("/api/v1/dashboard/get_all_categories/");
        setCategories(res.data);
      } catch (err) {
        setError("Kategoriyalarni yuklashda xatolik yuz berdi.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await client.delete(`/api/v1/dashboard/delete_category/${id}/`);
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
      toast.success("Kategoriya o‘chirildi");
    } catch (error) {
      toast.error("O‘chirishda xatolik");
      console.error("Delete error:", error);
    }
  };

  const handleRefresh = () => {
    const fetchCategories = async () => {
      try {
        const res = await client.get<Category[]>("/api/v1/dashboard/get_all_categories/");
        setCategories(res.data);
      } catch (err) {
        toast.error("Kategoriyalar ro'yxatini yangilashda xatolik");
        console.error("Refresh error:", err);
      }
    };
    fetchCategories();
  };

  return (
    <div>
      <div className="md:flex justify-between items-center mb-6">
        <h2 className="text-xl  md:pb-0 pb-2 font-serif">Tadbir turlari</h2>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-orange-400 hover:bg-orange-500 text-white"
        >
          <PlusCircle size={18} className="mr-2" />
          Yangi tur qo'shish
        </Button>
      </div>

      {loading && <p>Yuklanmoqda...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-center border border-gray-300">Nomi</th>
              <th className="px-4 py-2 text-center border border-gray-300">Tavsif</th>
              <th className="px-4 py-2 text-center border border-gray-300">Rasm</th>
              <th className="px-4 py-2 text-center border border-gray-300">Amallar</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  Kategoriyalar topilmadi
                </td>
              </tr>
            ) : (
              categories.map((cat) => (
                <tr key={cat.id} className="border-t">
                  <td className="px-4 py-2 border border-gray-300">{cat.name}</td>
                  <td className="px-4 py-2 border border-gray-300">{cat.description}</td>
                  <td className="px-4 py-2 border border-gray-300">
                    {cat.image ? (
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <span>Rasm yo'q</span>
                    )}
                  </td>
                  <td className="px-4 py-2   flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-orange-600 hover:text-orange-700"
                      onClick={() => setEditCategory(cat)}
                    >
                      <Edit size={14} className="mr-1" />
                     Tahrirlash
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-500 hover:bg-red-500 hover:text-white"
                      onClick={() => handleDelete(cat.id)}
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

      {isAddModalOpen && (
        <AddCategoryModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onCreated={handleRefresh}
        />
      )}

      {editCategory && (
        <EditCategoryModal
          isOpen={!!editCategory}
          onClose={() => setEditCategory(null)}
          onUpdated={handleRefresh}
          category={editCategory}
        />
      )}
    </div>
  );
};

export default CategoryTab;