import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import { calendarEvents } from '../data';
import SectionHeading from '../components/ui/SectionHeading';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';

const CalendarPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const navigate = useNavigate();
  const eventsOnSelectedDate = selectedDate
    ? calendarEvents.filter(event => 
        event.date.toDateString() === selectedDate.toDateString()
      )
    : [];

    const scrollToContact = () => {
      navigate('/#contact');
    };
    
    

  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 md:px-6 py-20">
        <SectionHeading
          title="Band qilingan kunlar"
          subtitle="To'yxonamizning band qilingan kunlarini ko'ring"
        />
        
        <div className="lg:flex justify-between block gap-10">
          {/* Calendar - Larger and more responsive */}
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
                  highlightDates={calendarEvents.map(event => event.date)}
                />
              </div>
            </motion.div>
          </div>
          
          {/* Events List */}
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
              
              {eventsOnSelectedDate.length > 0 ? (
  <div className="space-y-4">
    {eventsOnSelectedDate.map(event => (
      <div
        key={event.id}
        className="bg-gray-50 rounded-lg p-4 transition-all duration-300 hover:shadow-md"
      >
        <div className="h-56 mb-4 rounded-lg overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        <h4 className="text-lg font-medium text-gray-800 mb-2">
          {event.title}
        </h4>
        <p className="text-amber-500">
          {event.eventType.charAt(0).toUpperCase() + event.eventType.slice(1)}
        </p>
      </div>
    ))}
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