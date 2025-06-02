import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import SectionHeading from '../components/ui/SectionHeading';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import client from '../services';

interface CalendarEvent {
  id: number;
  book_date: string;
}

interface EventInfo {
  id: number;
  book_date: string;
  additional_info: string;
   category: {
    id: number;
    name: string;
  };
}

const CalendarPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [bookedDates, setBookedDates] = useState<CalendarEvent[]>([]);
  const [eventInfo, setEventInfo] = useState<EventInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // ✅ 1. Komponent yuklanganda bugungi sanani tanlash
  useEffect(() => {
    const today = new Date();
    setSelectedDate(today);
  }, []);

  // 📅 Band qilingan sanalarni olish
  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        setLoading(true);
        const response = await client.get('/api/v1/web/get_calendar_datas/');
        setBookedDates(response.data);
      } catch (err) {
        setError('Failed to fetch booked dates');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookedDates();
  }, []);

  // 📝 Tanlangan sana bo‘yicha tadbir ma’lumotlarini olish
  useEffect(() => {
    const fetchEventInfo = async () => {
      if (selectedDate) {
        try {
          setLoading(true);
          const dateStr = selectedDate.toISOString().split('T')[0];
          const response = await client.get(
            `/api/v1/web/get_calendar_data_info/?date=${dateStr}`
          );
          setEventInfo(response.data);
        } catch (err) {
          setEventInfo(null);
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEventInfo();
  }, [selectedDate]);

  const scrollToContact = () => {
    navigate('/#contact');
  };

  const highlightDates = bookedDates.map(event => new Date(event.book_date));

  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 md:px-6 py-20">
        <SectionHeading
          title="Band qilingan kunlar"
          subtitle="To'yxonamizning band qilingan kunlarini ko'ring"
        />

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="lg:flex justify-between block gap-10">
          {/* 🗓 Calendar */}
          <div className="lg:w-[60%] w-[100%] mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-xl p-4 md:p-8"
            >
              <div className="calendar-wrapper max-w-full overflow-x-auto">
                <style jsx global>{`
                  .react-datepicker {
                    font-size: 1rem !important;
                    width: 100% !important;
                  }
                  .react-datepicker__month-container {
                    width: 100% !important;
                  }
                  .react-datepicker__month {
                    margin: 0.6rem !important;
                  }
                  .react-datepicker__day {
                    margin: 0.3rem !important;
                    line-height: 2.5rem !important;
                    width: 2.5rem !important;
                    border-radius: 50% !important;
                  }
                  .react-datepicker__day--highlighted {
                    background-color: #FBBF24 !important;
                    color: white !important;
                  }
                  .react-datepicker__day--selected {
                    background-color: #F59E0B !important;
                    font-weight: bold !important;
                  }
                  .react-datepicker__header {
                    background-color: #F3F4F6 !important;
                    padding-top: 1rem !important;
                    padding-bottom: 1rem !important;
                  }
                  .react-datepicker__day-name {
                    margin: 0.3rem !important;
                    width: 2.5rem !important;
                    font-weight: bold !important;
                  }
                  .react-datepicker__navigation {
                    top: 1rem !important;
                  }
                  .react-datepicker__current-month {
                    font-size: 1.2rem !important;
                    font-weight: bold !important;
                    margin-bottom: 0.5rem !important;
                  }
                  @media (max-width: 640px) {
                    .react-datepicker__day {
                      margin: 0.2rem !important;
                      line-height: 2rem !important;
                      width: 2rem !important;
                    }
                    .react-datepicker__day-name {
                      margin: 0.2rem !important;
                      width: 2rem !important;
                    }
                  }
                `}</style>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  inline
                  calendarClassName="w-full"
                  highlightDates={highlightDates}
                />
              </div>
            </motion.div>
          </div>

          {/* 📋 Tadbir Ma'lumotlari */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white lg:w-[500px] w-full rounded-xl shadow-xl p-6"
            >
              <h3 className="text-xl font-serif text-gray-800 mb-4">
                {selectedDate 
                  ? `Tanlangan kun: ${selectedDate.toLocaleDateString('uz-UZ')}`
                  : 'Kunni tanlang'}
              </h3>

              {loading ? (
                <div className="flex justify-center items-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
                </div>
              ) : eventInfo ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <div className="mb-4">
                      <h4 className="text-lg font-medium text-gray-800 mb-2">
                        {eventInfo.category.name}
                      </h4>
                      <p className="text-gray-600">{eventInfo.additional_info}</p>
                      <p className="text-amber-500 mt-2">
                        {/* Sana: {new Date(eventInfo.book_date).toLocaleDateString('uz-UZ')} */}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-gray-600 mb-4">
                    {selectedDate 
                      ? "Bu kunda tadbirlar yo'q"
                      : "Tadbirlarni ko'rish uchun kunni tanlang"}
                  </p>

                  {selectedDate && (
                    <button
                      onClick={scrollToContact}
                      className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
                    >
                      Band qilish
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
