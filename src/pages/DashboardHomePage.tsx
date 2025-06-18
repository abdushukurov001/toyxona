/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, DollarSign, MessageSquare } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import client from '../services';
import { toast } from 'react-toastify';

interface UpcomingEvent {
  id: number;
  category: { id: number; name: string; image: string };
  book_date: string;
  booker_first_name: string;
  booker_last_name: string;
  number_of_guests: number;
}

interface EventStat {
  category: string;
  count: number;
  percent: number;
}

interface UnansweredMessage {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  message: string;
  answered: boolean;
}

interface DashboardStats {
  totalStaff: number | null;
  totalEvents: number | null;
  totalRevenue: number | null;
  messageCount: number | null;
  upcomingEvents: UpcomingEvent[];
  recentMessages: UnansweredMessage[];
  eventTypeStats: EventStat[];
}

const DashboardHomePage: React.FC = () => {
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalStaff: null,
    totalEvents: null,
    totalRevenue: null,
    messageCount: null,
    upcomingEvents: [],
    recentMessages: [],
    eventTypeStats: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [upcomingEventsRes, eventStatsRes, messagesRes, webStatsRes] = await Promise.all([
          client.get('/uz/api/v1/dashboard/get_upcoming_events/'),
          client.get('/uz/api/v1/dashboard/get_event_stats/'),
          client.get('/uz/api/v1/dashboard/get_unanswered_messages/'),
          client.get('/uz/api/v1/dashboard/get_web_stats/'),
        ]);

        setDashboardStats({
          totalStaff: webStatsRes.data.employees,
          totalEvents: webStatsRes.data.events,
          totalRevenue: webStatsRes.data.annual_income,
          messageCount: webStatsRes.data.unanswered_messages,
          upcomingEvents: upcomingEventsRes.data.slice(0, 3),
          recentMessages: messagesRes.data.slice(0, 3),
          eventTypeStats: eventStatsRes.data.map((stat: EventStat) => ({
            type: stat.category,
            count: stat.count,
            percentage: stat.percent,
          })),
        });
      } catch (error: any) {
        console.error('Dashboard ma\'lumotlarini olishda xatolik:', error);
        toast.error('Ma\'lumotlarni yuklashda xatolik');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg sm:text-xl text-gray-600 animate-pulse">Yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Xodimlar"
          value={dashboardStats.totalStaff ?? 'Ma\'lumot yo\'q'}
          icon={<Users className="text-blue-500" />}
          color="blue"
        />
        <StatsCard
          title="Tadbirlar"
          value={dashboardStats.totalEvents ?? 'Ma\'lumot yo\'q'}
          icon={<Calendar className="text-green-500" />}
          color="green"
        />
        <StatsCard
          title="Yillik tajriba"
          value={dashboardStats.totalRevenue ?? 'Ma\'lumot yo\'q'}
          icon={<DollarSign className="text-amber-500" />}
          color="amber"
        />
        <StatsCard
          title="Yangi xabarlar"
          value={dashboardStats.messageCount ?? 'Ma\'lumot yo\'q'}
          icon={<MessageSquare className="text-purple-500" />}
          color="purple"
        />
      </div>

      {/* Charts and Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Event Type Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md p-4 sm:p-6"
        >
          <h3 className="text-base sm:text-lg font-medium mb-4">Tadbirlar statistikasi</h3>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dashboardStats.eventTypeStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="percentage" fill="#f59e0b" name="Foiz" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-lg shadow-md p-4 sm:p-6"
        >
          <h3 className="text-base sm:text-lg font-medium mb-4">Yaqinlashayotgan tadbirlar</h3>
          <div className="space-y-4">
            {dashboardStats.upcomingEvents.length > 0 ? (
              dashboardStats.upcomingEvents.map((event) => (
                <UpcomingEventCard key={event.id} event={event} />
              ))
            ) : (
              <p className="text-gray-600 text-sm sm:text-base">Yaqinlashayotgan tadbirlar yo‘q</p>
            )}
          </div>
        </motion.div>

        {/* Recent Messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:col-span-2"
        >
          <h3 className="text-base sm:text-lg font-medium mb-4">So‘nggi xabarlar</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-300 text-sm sm:text-base">
                  <th className="px-2 sm:px-4 py-2 text-left border-r border-gray-300">Sana</th>
                  <th className="px-2 sm:px-4 py-2 text-left border-r border-gray-300">Ism</th>
                  <th className="px-2 sm:px-4 py-2 text-left border-r border-gray-300">Telefon</th>
                  <th className="px-2 sm:px-4 py-2 text-left border-r border-gray-300">Xabar</th>
                  <th className="px-2 sm:px-4 py-2 text-left border-r border-gray-300">Holat</th>
                </tr>
              </thead>
              <tbody>
                {dashboardStats.recentMessages.length > 0 ? (
                  dashboardStats.recentMessages.map((message) => (
                    <MessageRow key={message.id} message={message} />
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-2 sm:px-4 py-2 text-center border-r border-gray-300 text-sm sm:text-base">
                      Yangi xabarlar yo‘q
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-lg shadow-md p-4 sm:p-6"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-xl sm:text-2xl font-semibold mt-1">{value}</p>
      </div>
      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-${color}-100 flex items-center justify-center`}>
        {icon}
      </div>
    </div>
  </motion.div>
);

const UpcomingEventCard: React.FC<{ event: UpcomingEvent }> = ({ event }) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-300">
    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
      <img
        src={event.category.image || 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg'}
        alt={event.category.name}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex-1">
      <h4 className="font-medium text-base sm:text-lg">{event.category.name}</h4>
      <p className="text-sm text-gray-600">
        {new Date(event.book_date).toLocaleDateString('uz-UZ')} - {event.booker_first_name} {event.booker_last_name}
      </p>
      <p className="text-sm text-amber-500">{event.number_of_guests} nafar mehmon</p>
    </div>
  </div>
);

const MessageRow: React.FC<{ message: UnansweredMessage }> = ({ message }) => (
  <tr className="border-b border-gray-300 text-sm sm:text-base">
    <td className="px-2 sm:px-4 py-2 border-r border-gray-300">
      {new Date().toLocaleDateString('uz-UZ')}
    </td>
    <td className="px-2 sm:px-4 py-2 border-r border-gray-300">
      {message.first_name} {message.last_name}
    </td>
    <td className="px-2 sm:px-4 py-2 border-r border-gray-300">{message.phone_number}</td>
    <td className="px-2 sm:px-4 py-2 border-r border-gray-300">
      <div className="max-h-[6rem] overflow-y-auto">
        {message.message}
      </div>
    </td>
    <td className="px-2 sm:px-4 py-2 border-r border-gray-300">
      <span
        className={`px-2 py-1 rounded-full text-xs sm:text-sm ${
          message.answered ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
        }`}
      >
        {message.answered ? 'O‘qilgan' : 'Yangi'}
      </span>
    </td>
  </tr>
);

export default DashboardHomePage;