import React, { useEffect, useState } from "react";
import { Edit, PlusCircle, Trash2 } from "lucide-react";
import Button from "../../components/ui/Button";
import client from "../../services";
import { toast } from "react-toastify";
import { AddEventModal } from "./Modals.tsx/AddEventModel";
import { EditEventModal } from "./Modals.tsx/EditEventModal";


interface Event {
  id: number;
  book_date: string;
  category: number;
  booker_first_name: string;
  booker_last_name: string;
  phone_number: string;
  number_of_guests: number;
  price: number;
  additional_info?: string;
}

interface Category {
  id: number;
  name: string;
}

interface EventsTabProps {
  onAddEvent: () => void;
}

const EventsTab: React.FC<EventsTabProps> = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [editEvent, setEditEvent] = useState<Event | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [eventsResponse, categoriesResponse] = await Promise.all([
          client.get<Event[]>("/api/v1/dashboard/get_all_events/"),
          client.get<Category[]>("/api/v1/dashboard/get_all_categories/"),
        ]);
        setEvents(eventsResponse.data);
        setCategories(categoriesResponse.data);
        setError(null);
      } catch (err) {
        setError("Ma'lumotlarni yuklashda xatolik yuz berdi.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await client.delete(`/api/v1/dashboard/delete_event/${id}/`);
      setEvents((prev) => prev.filter((event) => event.id !== id));
      toast.success("Tadbir o‘chirildi");
    } catch (error) {
      toast.error("O‘chirishda xatolik");
      console.error("Delete error:", error);
    }
  };

  // const getCategoryName = (categoryId: number) => {
  //   const category = categories.find((cat) => cat.id === categoryId);
  //   return category ? category.name : `ID: ${categoryId}`;
  // };

  const handleRefresh = () => {
    const fetchEvents = async () => {
      try {
        const response = await client.get<Event[]>("/api/v1/dashboard/get_all_events/");
        setEvents(response.data);
      } catch (err) {
        toast.error("Tadbirlar ro'yxatini yangilashda xatolik");
        console.error("Refresh error:", err);
      }
    };
    fetchEvents();
  };

  return (
    <div>
      <div className="md:flex justify-between items-center mb-6">
        <h2 className="text-xl md:pb-0 pb-2 font-serif">Tadbirlar ro'yxati</h2>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-orange-400 hover:bg-orange-500 text-white"
        >
          <PlusCircle size={18} className="mr-2" />
          Yangi tadbir qo'shish
        </Button>
      </div>

      {loading && <p className="text-gray-600">Yuklanmoqda...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-2 text-center">Sana</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Tadbir turi</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Mijoz</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Telefon</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Mehmonlar soni</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Narxi</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Amallar</th>
              </tr>
            </thead>
            <tbody>
              {events.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-4">
                    Tadbirlar topilmadi
                  </td>
                </tr>
              )}
              {events.map((event) => (
                <tr key={event.id} className="border-t">
                  <td className="border border-gray-300 px-4 py-2">{event.book_date}</td>
                  <td className="border border-gray-300 px-4 py-2">{event.category}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {event.booker_first_name} {event.booker_last_name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{event.phone_number}</td>
                  <td className="border border-gray-300 px-4 py-2">{event.number_of_guests}</td>
                  <td className="border border-gray-300 px-4 py-2">{event.price.toLocaleString()} so'm</td>
                  <td className="border border-gray-300 px-4 py-2 flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-orange-600 hover:text-whiter"
                      onClick={() => setEditEvent(event)}
                    >
                      <Edit size={14} className="mr-1" />
                      Tahrirlash
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-500 hover:bg-red-600 hover:text-white"
                      onClick={() => handleDelete(event.id)}
                    >
                      <Trash2 size={14} className="mr-1" />
                      O'chirish
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isAddModalOpen && (
        <AddEventModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onCreated={handleRefresh}
        />
      )}

      {editEvent && (
        <EditEventModal
          isOpen={!!editEvent}
          onClose={() => setEditEvent(null)}
          onUpdated={handleRefresh}
          event={editEvent}
        />
      )}
    </div>
  );
};

export default EventsTab;