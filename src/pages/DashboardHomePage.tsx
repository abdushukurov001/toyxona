import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, DollarSign, MessageSquare } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DashboardStats, CalendarEvent, Message } from '../types';

// Mock data for demonstration
const dashboardStats: DashboardStats = {
  totalStaff: 12,
  totalEvents: 156,
  totalRevenue: 280000000,
  messageCount: 24,
  upcomingEvents: [
    {
      id: 1,
      title: "Ahmadjonov To'yi",
      date: new Date('2025-03-20'),
      eventType: 'wedding',
      image: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg',
      clientName: 'Ahmadjonov Sardor',
      clientPhone: '+998 90 123 45 67',
      price: 180000,
      guestCount: 200
    },
    // Add more events...
  ],
  recentMessages: [
    {
      id: 1,
      name: 'Azizov Jasur',
      phone: '+998 90 123 45 67',
      message: 'Toy haqida ma\'lumot olmoqchi edim',
      date: '2025-03-15',
      read: false
    },
    // Add more messages...
  ],
  eventTypeStats: [
    { type: 'To\'y', count: 80, percentage: 51.3 },
    { type: 'Tug\'ilgan kun', count: 35, percentage: 22.4 },
    { type: 'Osh', count: 25, percentage: 16 },
    { type: 'Boshqa', count: 16, percentage: 10.3 }
  ]
};

const DashboardHomePage: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Xodimlar"
          value={dashboardStats.totalStaff}
          icon={<Users className="text-blue-500" />}
          color="blue"
        />
        <StatsCard
          title="Tadbirlar"
          value={dashboardStats.totalEvents}
          icon={<Calendar className="text-green-500" />}
          color="green"
        />
        <StatsCard
          title="Yillik daromad"
          value={`${(dashboardStats.totalRevenue / 1000000).toFixed(1)} mln`}
          icon={<DollarSign className="text-amber-500" />}
          color="amber"
        />
        <StatsCard
          title="Yangi xabarlar"
          value={dashboardStats.messageCount}
          icon={<MessageSquare className="text-purple-500" />}
          color="purple"
        />
      </div>

      {/* Charts and Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Event Type Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h3 className="text-lg font-medium mb-6">Tadbirlar statistikasi</h3>
          <div className="h-80">
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
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h3 className="text-lg font-medium mb-4">Yaqinlashayotgan tadbirlar</h3>
          <div className="space-y-4">
            {dashboardStats.upcomingEvents.map((event) => (
              <UpcomingEventCard key={event.id} event={event} />
            ))}
          </div>
        </motion.div>

        {/* Recent Messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg shadow-md p-6 lg:col-span-2"
        >
          <h3 className="text-lg font-medium mb-4">So'nggi xabarlar</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left">Sana</th>
                  <th className="px-4 py-2 text-left">Ism</th>
                  <th className="px-4 py-2 text-left">Telefon</th>
                  <th className="px-4 py-2 text-left">Xabar</th>
                  <th className="px-4 py-2 text-left">Holat</th>
                </tr>
              </thead>
              <tbody>
                {dashboardStats.recentMessages.map((message) => (
                  <MessageRow key={message.id} message={message} />
                ))}
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
    className="bg-white rounded-lg shadow-md p-6"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-semibold mt-1">{value}</p>
      </div>
      <div className={`w-12 h-12 rounded-full bg-${color}-100 flex items-center justify-center`}>
        {icon}
      </div>
    </div>
  </motion.div>
);

const UpcomingEventCard: React.FC<{ event: CalendarEvent }> = ({ event }) => (
  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
      <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
    </div>
    <div>
      <h4 className="font-medium">{event.title}</h4>
      <p className="text-sm text-gray-600">
        {event.date.toLocaleDateString('uz-UZ')} - {event.clientName}
      </p>
      <p className="text-sm text-amber-500">{event.guestCount} nafar mehmon</p>
    </div>
  </div>
);

const MessageRow: React.FC<{ message: Message }> = ({ message }) => (
  <tr className="border-t">
    <td className="px-4 py-2">{message.date}</td>
    <td className="px-4 py-2">{message.name}</td>
    <td className="px-4 py-2">{message.phone}</td>
    <td className="px-4 py-2">{message.message}</td>
    <td className="px-4 py-2">
      <span className={`px-2 py-1 rounded-full text-xs ${
        message.read ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
      }`}>
        {message.read ? 'O\'qilgan' : 'Yangi'}
      </span>
    </td>
  </tr>
);

export default DashboardHomePage;