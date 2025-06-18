import React, { useEffect, useState } from "react";
import client from "../../services";
import Button from "../../components/ui/Button";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { AddSocialMediaModal } from "./Modals.tsx/AddSocialModel";
import { EditSocialMediaModal } from "./Modals.tsx/EditSocialModal";

interface SocialMediaItem {
  id: number;
  name: string;
  url: string;
  social_media_image?: string | null;
}

const SocialMediaManager: React.FC = () => {
  const [socialItems, setSocialItems] = useState<SocialMediaItem[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<SocialMediaItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLinks = async () => {
    setLoading(true);
    try {
      const res = await client.get<SocialMediaItem[]>("/api/v1/dashboard/get_all_social_medias/");
      setSocialItems(res.data);
      setError(null);
    } catch (err) {
      setError("Ijtimoiy tarmoqlar ro'yxatini yuklashda xatolik yuz berdi.");
      console.error("Error fetching links:", err);
      toast.error("Ma'lumotlarni yuklashda xatolik");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await client.delete(`/api/v1/dashboard/delete_social_media/${id}/`);
      setSocialItems((prev) => prev.filter((item) => item.id !== id));
      toast.success("Ijtimoiy tarmoq o'chirildi");
    } catch (err) {
      console.error("Error deleting link:", err);
      toast.error("O'chirishda xatolik");
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-lg sm:text-xl font-serif">Ijtimoiy tarmoqlar</h2>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="w-full sm:w-auto min-h-[40px] bg-orange-400 hover:bg-orange-500 text-white text-sm sm:text-base"
        >
          <PlusCircle size={16} className="mr-2" />
          Yangi tarmoq qo'shish
        </Button>
      </div>

      {loading && <p className="text-gray-600 text-center text-sm sm:text-base">Yuklanmoqda...</p>}
      {error && <p className="text-red-500 text-center text-sm sm:text-base">{error}</p>}

      {!loading && !error && socialItems.length === 0 && (
        <p className="text-center text-gray-500 text-sm sm:text-base">Ijtimoiy tarmoqlar topilmadi</p>
      )}

      <div className="space-y-4">
        {socialItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between border p-3 rounded-md shadow-sm gap-4"
          >
            <div className="flex items-center gap-3 flex-1">
              {item.social_media_image && (
                <img
                  src={item.social_media_image}
                  alt={item.name}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded object-cover"
                />
              )}
              <div>
                <p className="font-medium capitalize text-sm sm:text-base">{item.name}</p>
                <a
                  href={item.url}
                  className="text-blue-600 underline break-words text-xs sm:text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.url}
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button
                type="button"
                onClick={() => setEditItem(item)}
                className="min-h-[40px] bg--500 text-white text-xs sm:text-sm flex-1 sm:flex-none"
              >
                <Edit size={14} className="mr-1" />
                Tahrirlash
              </Button>
              <Button
                type="button"
                className="min-h-[40px] bg-red-500 hover:bg-red-600 text-white text-xs sm:text-sm flex-1 sm:flex-none"
                onClick={() => handleDelete(item.id)}
              >
                <Trash2 size={14} className="mr-1" />
                O'chirish
              </Button>
            </div>
          </div>
        ))}
      </div>

      {isAddModalOpen && (
        <AddSocialMediaModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onCreated={fetchLinks}
        />
      )}

      {editItem && (
        <EditSocialMediaModal
          isOpen={!!editItem}
          onClose={() => setEditItem(null)}
          onUpdated={fetchLinks}
          item={editItem}
        />
      )}
    </div>
  );
};

export default SocialMediaManager;