import React, { useEffect, useState } from "react";
import { Trash2, Check, X } from "lucide-react";
import Button from "../../components/ui/Button";
import client from "../../services";
import { toast } from "react-toastify";
import { Dialog } from "@headlessui/react";

interface Message {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  message: string;
  answered: boolean;
}

const MessagesTab: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await client.get<Message[]>("/api/v1/dashboard/get_all_messages/");
      setMessages(response.data);
      setError(null);
    } catch (error) {
      setError("Xabarlarni olishda xatolik yuz berdi.");
      console.error("Xabarlarni olishda xatolik:", error);
      toast.error("Xabarlarni yuklashda xatolik");
    } finally {
      setLoading(false);
    }
  };

  const toggleAnsweredStatus = async (id: number, currentStatus: boolean) => {
    try {
      const newStatus = !currentStatus;
      await client.patch(`/api/v1/dashboard/update_message/${id}/`, { answered: newStatus });
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, answered: newStatus } : msg))
      );
      toast.success(`Xabar "${newStatus ? 'Javob berilgan' : 'Kutilmoqda'}" deb belgilandi`);
    } catch (error) {
      console.error("Xabarni yangilashda xatolik:", error);
      toast.error("Javob holatini o‘zgartirishda xatolik");
    }
  };

  const deleteMessage = async (id: number) => {
    try {
      await client.delete(`/api/v1/dashboard/delete_message/${id}/`);
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
      toast.success("Xabar o‘chirildi");
    } catch (error) {
      console.error("Xabarni o‘chirishda xatolik:", error);
      toast.error("Xabarni o‘chirishda xatolik");
    }
  };

  const openMessageModal = (message: Message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  const closeMessageModal = () => {
    setSelectedMessage(null);
    setIsModalOpen(false);
  };

  const truncateMessage = (text: string, maxLength: number = 50) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <h2 className="text-lg sm:text-xl font-serif mb-6">Xabarlar</h2>
      {loading && <p className="text-gray-600 text-center">Yuklanmoqda...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-2 sm:px-4 py-2 text-center border border-gray-300">Ism</th>
              <th className="px-2 sm:px-4 py-2 text-center border border-gray-300">Familiya</th>
              <th className="px-2 sm:px-4 py-2 text-center border border-gray-300">Telefon</th>
              <th className="px-2 sm:px-4 py-2 text-center border border-gray-300">Xabar</th>
              <th className="px-2 sm:px-4 py-2 text-center border border-gray-300">Holat</th>
              <th className="px-2 sm:px-4 py-2 text-center border border-gray-300">Amallar</th>
            </tr>
          </thead>
          <tbody>
            {messages.length === 0 && !loading && !error ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500 border border-gray-300">
                  Hech qanday xabar topilmadi.
                </td>
              </tr>
            ) : (
              messages.map((msg) => (
                <tr className="border-t" key={msg.id}>
                  <td className="px-2 sm:px-4 py-2 border border-gray-300">{msg.first_name}</td>
                  <td className="px-2 sm:px-4 py-2 border border-gray-300">{msg.last_name}</td>
                  <td className="px-2 sm:px-4 py-2 border border-gray-300">{msg.phone_number}</td>
                  <td className="px-2 sm:px-4 py-2 border border-gray-300">
                    <div className="flex items-center space-x-2">
                      <span>{truncateMessage(msg.message)}</span>
                      {msg.message.length > 50 && (
                        <button
                          onClick={() => openMessageModal(msg)}
                          className="text-blue-500 hover:text-blue-600 text-xs sm:text-sm"
                        >
                          Ko'proq
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-2 sm:px-4 py-2 border border-gray-300">
                    <span
                      className={`px-2 py-1 rounded-full text-xs sm:text-sm ${
                        msg.answered ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {msg.answered ? "Javob berilgan" : "Kutilmoqda"}
                    </span>
                  </td>
                  <td className="px-2 sm:px-4 py-2 border border-gray-300">
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="min-h-[40px] text-orange-600 hover:text-white text-xs sm:text-sm"
                        onClick={() => toggleAnsweredStatus(msg.id, msg.answered)}
                      >
                        {msg.answered ? (
                          <>
                            <X size={14} className="mr-1" />
                            Javob berilmadi
                          </>
                        ) : (
                          <>
                            <Check size={14} className="mr-1" />
                            Javob berildi
                          </>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="min-h-[40px] text-red-500 hover:bg-red-500 hover:text-white text-xs sm:text-sm"
                        onClick={() => deleteMessage(msg.id)}
                      >
                        <Trash2 size={14} className="mr-1" />
                        O'chirish
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Message Modal */}
      <Dialog open={isModalOpen} onClose={closeMessageModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
          <Dialog.Panel className="w-full max-w-md rounded bg-white p-4 sm:p-6">
            <Dialog.Title className="text-lg sm:text-xl font-semibold mb-4">
              To'liq xabar
            </Dialog.Title>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Ism:</p>
                <p className="text-sm sm:text-base">{selectedMessage?.first_name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Familiya:</p>
                <p className="text-sm sm:text-base">{selectedMessage?.last_name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Telefon:</p>
                <p className="text-sm sm:text-base">{selectedMessage?.phone_number}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Xabar:</p>
                <p className="text-sm sm:text-base max-h-48 overflow-y-auto">
                  {selectedMessage?.message}
                </p>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={closeMessageModal}
                className="min-h-[40px] text-sm sm:text-base"
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

export default MessagesTab;