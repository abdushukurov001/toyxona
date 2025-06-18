/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import Button from "../../components/ui/Button";
import client from "../../services";
import { toast } from "react-toastify";
import { Dialog } from "@headlessui/react";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  image?: string | null;
}

const NewsManager: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<NewsItem | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all news
  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await client.get<NewsItem[]>("/uz/api/v1/dashboard/get_all_news/");
      setNewsItems(res.data);
      setError(null);
    } catch (err) {
      setError("Yangiliklarni yuklashda xatolik yuz berdi.");
      console.error("Error fetching news:", err);
      toast.error("Ma'lumotlarni yuklashda xatolik");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image file change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  // Handle create news
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      toast.error("Iltimos, barcha majburiy maydonlarni to‘ldiring");
      return;
    }
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      if (imageFile) {
        data.append("image", imageFile);
      }

      await client.post("/uz/api/v1/dashboard/create_news/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Yangilik qo‘shildi");
      fetchNews();
      setIsAddModalOpen(false);
      setFormData({ title: "", description: "" });
      setImageFile(null);
      setImagePreview(null);
    } catch (err: any) {
      console.error("Error creating news:", err);
      const errorMessage =
        err.response?.status === 415
          ? "Server faqat multipart/form-data so‘rovlarini qabul qiladi"
          : "Yangilik qo‘shishda xatolik";
      toast.error(errorMessage);
    }
  };

  // Handle update news
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editItem || !formData.title || !formData.description) {
      toast.error("Iltimos, barcha majburiy maydonlarni to‘ldiring");
      return;
    }
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      if (imageFile) {
        data.append("image", imageFile);
      }

      await client.patch(`/uz/api/v1/dashboard/update_news/${editItem.id}/`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Yangilik yangilandi");
      fetchNews();
      setEditItem(null);
      setFormData({ title: "", description: "" });
      setImageFile(null);
      setImagePreview(null);
    } catch (err: any) {
      console.error("Error updating news:", err);
      const errorMessage =
        err.response?.status === 415
          ? "Server faqat multipart/form-data so‘rovlarini qabul qiladi"
          : "Yangilikni yangilashda xatolik";
      toast.error(errorMessage);
    }
  };

  // Handle delete news
  const handleDelete = async (id: number) => {
    try {
      await client.delete(`/uz/api/v1/dashboard/delete_news/${id}/`);
      setNewsItems((prev) => prev.filter((item) => item.id !== id));
      toast.success("Yangilik o‘chirildi");
    } catch (err) {
      console.error("Error deleting news:", err);
      toast.error("O‘chirishda xatolik");
    }
  };

  // Open view modal for full description
  const openViewModal = (item: NewsItem) => {
    setSelectedNews(item);
    setIsViewModalOpen(true);
  };

  // Close view modal
  const closeViewModal = () => {
    setSelectedNews(null);
    setIsViewModalOpen(false);
  };

  // Open edit modal with pre-filled data
  const openEditModal = (item: NewsItem) => {
    setEditItem(item);
    setFormData({ title: item.title, description: item.description });
    setImagePreview(item.image || null);
    setImageFile(null);
  };

  // Truncate description
  const truncateDescription = (text: string, maxLength: number = 50) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <div className="p-4 sm:p-6 mx-auto space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-lg sm:text-xl font-serif">Yangiliklar</h2>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="w-full sm:w-auto min-h-[40px] bg-orange-400 hover:bg-orange-500 text-white text-sm sm:text-base"
        >
          <PlusCircle size={16} className="mr-2" />
          Yangi yangilik qo'shish
        </Button>
      </div>

      {loading && <p className="text-gray-600 text-center text-sm sm:text-base">Yuklanmoqda...</p>}
      {error && <p className="text-red-500 text-center text-sm sm:text-base">{error}</p>}

      {!loading && !error && newsItems.length === 0 && (
        <p className="text-center text-gray-500 text-sm sm:text-base">Yangiliklar topilmadi</p>
      )}

      <div className="space-y-4">
        {newsItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between border p-3 rounded-md shadow-sm gap-4"
          >
            <div className="flex items-center gap-3 flex-1">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded object-cover"
                />
              )}
              <div>
                <p className="font-medium text-sm sm:text-base">{item.title}</p>
                <div className="flex items-center gap-2">
                  <p className="text-gray-600 text-xs sm:text-sm">
                    {truncateDescription(item.description)}
                  </p>
                  {item.description.length > 50 && (
                    <button
                      onClick={() => openViewModal(item)}
                      className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm"
                    >
                      Ko'proq
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button
                onClick={() => openEditModal(item)}
                className="min-h-[40px] text-white text-xs sm:text-sm flex-1 sm:flex-none"
              >
                <Edit size={14} className="mr-1" />
                Tahrirlash
              </Button>
              <Button
                onClick={() => handleDelete(item.id)}
                className="min-h-[40px] bg-red-500 hover:bg-red-600 text-white text-xs sm:text-sm flex-1 sm:flex-none"
              >
                <Trash2 size={14} className="mr-1" />
                O'chirish
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add News Modal */}
      <Dialog open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
          <Dialog.Panel className="w-full max-w-md rounded bg-white p-4 sm:p-6">
            <Dialog.Title className="text-lg sm:text-xl font-semibold mb-4">
              Yangi yangilik qo'shish
            </Dialog.Title>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sarlavha *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                  maxLength={300}
                  required
                />
                <span className="text-red-500 text-xs mt-1 hidden peer-invalid:block">Majburiy</span>
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tavsif *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                  rows={4}
                  required
                />
                <span className="text-red-500 text-xs mt-1 hidden peer-invalid:block">Majburiy</span>
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rasm (ixtiyoriy)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-2 w-full max-w-xs h-auto rounded"
                  />
                )}
              </div>
              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setFormData({ title: "", description: "" });
                    setImageFile(null);
                    setImagePreview(null);
                  }}
                  className="min-h-[40px] bg-gray-500  text-sm sm:text-base"
                >
                  Bekor qilish
                </Button>
                <Button
                  type="submit"
                  className="min-h-[40px] bg-orange-500 hover:bg-orange-600 text-white text-sm sm:text-base"
                >
                  Qo‘shish
                </Button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Edit News Modal */}
      <Dialog open={!!editItem} onClose={() => setEditItem(null)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
          <Dialog.Panel className="w-full max-w-md rounded bg-white p-4 sm:p-6">
            <Dialog.Title className="text-lg sm:text-xl font-semibold mb-4">
              Yangilikni tahrirlash
            </Dialog.Title>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sarlavha *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                  maxLength={300}
                  required
                />
                <span className="text-red-500 text-xs mt-1 hidden peer-invalid:block">Majburiy</span>
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tavsif *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                  rows={4}
                  required
                />
                <span className="text-red-500 text-xs mt-1 hidden peer-invalid:block">Majburiy</span>
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rasm (ixtiyoriy)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-2 w-full max-w-xs h-auto rounded"
                  />
                )}
              </div>
              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditItem(null);
                    setFormData({ title: "", description: "" });
                    setImageFile(null);
                    setImagePreview(null);
                  }}
                  className="min-h-[40px] bg-gray-500   text-sm sm:text-base"
                >
                  Bekor qilish
                </Button>
                <Button
                  type="submit"
                  className="min-h-[40px]  text-white text-sm sm:text-base"
                >
                  Saqlash
                </Button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* View News Modal */}
      <Dialog open={isViewModalOpen} onClose={closeViewModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
          <Dialog.Panel className="w-full max-w-md rounded bg-white p-4 sm:p-6">
            <Dialog.Title className="text-lg sm:text-xl font-semibold mb-4">
              To'liq yangilik
            </Dialog.Title>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Sarlavha:</p>
                <p className="text-sm sm:text-base">{selectedNews?.title}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Tavsif:</p>
                <p className="text-sm sm:text-base max-h-48 overflow-y-auto">{selectedNews?.description}</p>
              </div>
              {selectedNews?.image && (
                <div>
                  <p className="text-sm font-medium text-gray-700">Rasm:</p>
                  <img
                    src={selectedNews.image}
                    alt={selectedNews.title}
                    className="w-full max-w-xs h-auto rounded"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-end mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={closeViewModal}
                className="min-h-[40px] bg-gray-500 hover:bg-gray-600 text-white text-sm sm:text-base"
              >
                Yopish
              </Button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default NewsManager;