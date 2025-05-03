import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { 
  Users, Calendar, Settings, LogOut, MessageSquare, PlusCircle, 
  Edit, Trash2, Info, Tag, DollarSign, Share2 
} from 'lucide-react';
import Button from '../components/ui/Button';
import DashboardHomePage from './DashboardHomePage';
import { Dialog } from '@headlessui/react';

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [isEditAboutModalOpen, setIsEditAboutModalOpen] = useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isAddPricePackageModalOpen, setIsAddPricePackageModalOpen] = useState(false);

  if (!user.isAuthenticated) {
    navigate('/admin/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Dashboard Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-serif text-gray-800">Admin Dashboard</h1>
          <Button 
            variant="outline" 
            onClick={() => {
              logout();
              navigate('/admin/login');
            }}
          >
            <LogOut size={18} className="mr-2" />
            Chiqish
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md p-4"
            >
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('home')}
                  className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${
                    activeTab === 'home' 
                      ? 'bg-amber-500 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Users size={20} className="mr-3" />
                  Bosh sahifa
                </button>
                <button
                  onClick={() => setActiveTab('staff')}
                  className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${
                    activeTab === 'staff' 
                      ? 'bg-amber-500 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Users size={20} className="mr-3" />
                  Xodimlar
                </button>
                <button
                  onClick={() => setActiveTab('events')}
                  className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${
                    activeTab === 'events' 
                      ? 'bg-amber-500 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Calendar size={20} className="mr-3" />
                  Tadbirlar
                </button>
                <button
                  onClick={() => setActiveTab('categories')}
                  className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${
                    activeTab === 'categories' 
                      ? 'bg-amber-500 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Tag size={20} className="mr-3" />
                  Kategoriyalar
                </button>
                <button
                  onClick={() => setActiveTab('prices')}
                  className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${
                    activeTab === 'prices' 
                      ? 'bg-amber-500 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <DollarSign size={20} className="mr-3" />
                  Narxlar
                </button>
                <button
                  onClick={() => setActiveTab('about')}
                  className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${
                    activeTab === 'about' 
                      ? 'bg-amber-500 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Info size={20} className="mr-3" />
                  Biz haqimizda
                </button>
                <button
                  onClick={() => setActiveTab('messages')}
                  className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${
                    activeTab === 'messages' 
                      ? 'bg-amber-500 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <MessageSquare size={20} className="mr-3" />
                  Xabarlar
                </button>
                <button
                  onClick={() => setActiveTab('social')}
                  className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${
                    activeTab === 'social' 
                      ? 'bg-amber-500 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Share2 size={20} className="mr-3" />
                  Ijtimoiy tarmoqlar
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${
                    activeTab === 'settings' 
                      ? 'bg-amber-500 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Settings size={20} className="mr-3" />
                  Sozlamalar
                </button>
              </nav>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              {activeTab === 'home' && <DashboardHomePage />}

              {activeTab === 'staff' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-serif">Xodimlar ro'yxati</h2>
                    <Button onClick={() => setIsAddStaffModalOpen(true)}>
                      <PlusCircle size={18} className="mr-2" />
                      Yangi xodim qo'shish
                    </Button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-2 text-left">Ism</th>
                          <th className="px-4 py-2 text-left">Lavozim</th>
                          <th className="px-4 py-2 text-left">Ish vaqti</th>
                          <th className="px-4 py-2 text-left">Maosh turi</th>
                          <th className="px-4 py-2 text-left">Maosh</th>
                          <th className="px-4 py-2 text-left">Boshlagan sana</th>
                          <th className="px-4 py-2 text-left">Amallar</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t">
                          <td className="px-4 py-2">Ahmedov Bobur</td>
                          <td className="px-4 py-2">Director</td>
                          <td className="px-4 py-2">09:00 - 18:00</td>
                          <td className="px-4 py-2">Oylik</td>
                          <td className="px-4 py-2">5,000,000 so'm</td>
                          <td className="px-4 py-2">2024-01-15</td>
                          <td className="px-4 py-2 space-x-2">
                            <Button size="sm" variant="outline">
                              <Edit size={14} className="mr-1" />
                              O'zgartirish
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-500 hover:text-red-600">
                              <Trash2 size={14} className="mr-1" />
                              O'chirish
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'events' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-serif">Tadbirlar ro'yxati</h2>
                    <Button onClick={() => setIsAddEventModalOpen(true)}>
                      <PlusCircle size={18} className="mr-2" />
                      Yangi tadbir qo'shish
                    </Button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-2 text-left">Sana</th>
                          <th className="px-4 py-2 text-left">Tadbir turi</th>
                          <th className="px-4 py-2 text-left">Mijoz</th>
                          <th className="px-4 py-2 text-left">Telefon</th>
                          <th className="px-4 py-2 text-left">Mehmonlar soni</th>
                          <th className="px-4 py-2 text-left">Narxi</th>
                          <th className="px-4 py-2 text-left">Amallar</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t">
                          <td className="px-4 py-2">2025-05-15</td>
                          <td className="px-4 py-2">To'y marosimi</td>
                          <td className="px-4 py-2">Karimov A.</td>
                          <td className="px-4 py-2">+998 90 123 45 67</td>
                          <td className="px-4 py-2">200</td>
                          <td className="px-4 py-2">180,000 so'm</td>
                          <td className="px-4 py-2 space-x-2">
                            <Button size="sm" variant="outline">
                              <Edit size={14} className="mr-1" />
                              O'zgartirish
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-500 hover:text-red-600">
                              <Trash2 size={14} className="mr-1" />
                              O'chirish
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'categories' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-serif">Tadbir turlari</h2>
                    <Button onClick={() => setIsAddCategoryModalOpen(true)}>
                      <PlusCircle size={18} className="mr-2" />
                      Yangi tur qo'shish
                    </Button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-2 text-left">Nomi</th>
                          <th className="px-4 py-2 text-left">Tavsif</th>
                          <th className="px-4 py-2 text-left">Rasm</th>
                          <th className="px-4 py-2 text-left">Amallar</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t">
                          <td className="px-4 py-2">To'y marosimi</td>
                          <td className="px-4 py-2">To'y va nikoh marosimlari</td>
                          <td className="px-4 py-2">
                            <img 
                              src="https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg" 
                              alt="To'y" 
                              className="w-16 h-16 object-cover rounded"
                            />
                          </td>
                          <td className="px-4 py-2 space-x-2">
                            <Button size="sm" variant="outline">
                              <Edit size={14} className="mr-1" />
                              O'zgartirish
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-500 hover:text-red-600">
                              <Trash2 size={14} className="mr-1" />
                              O'chirish
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'prices' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-serif">Narxlar</h2>
                    <Button onClick={() => setIsAddPricePackageModalOpen(true)}>
                      <PlusCircle size={18} className="mr-2" />
                      Yangi tarif qo'shish
                    </Button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-2 text-left">Nomi</th>
                          <th className="px-4 py-2 text-left">Narxi</th>
                          <th className="px-4 py-2 text-left">Tavsif</th>
                          <th className="px-4 py-2 text-left">Xizmatlar</th>
                          <th className="px-4 py-2 text-left">Amallar</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t">
                          <td className="px-4 py-2">Standart</td>
                          <td className="px-4 py-2">180,000 so'm</td>
                          <td className="px-4 py-2">Asosiy xizmatlar to'plami</td>
                          <td className="px-4 py-2">
                            <ul className="list-disc list-inside">
                              <li>2 xil taom</li>
                              <li>Ichimliklar</li>
                              <li>Bezatish</li>
                            </ul>
                          </td>
                          <td className="px-4 py-2 space-x-2">
                            <Button size="sm" variant="outline">
                              <Edit size={14} className="mr-1" />
                              O'zgartirish
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-500 hover:text-red-600">
                              <Trash2 size={14} className="mr-1" />
                              O'chirish
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'about' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-serif">Biz haqimizda</h2>
                    <Button onClick={() => setIsEditAboutModalOpen(true)}>
                      <Edit size={18} className="mr-2" />
                      Tahrirlash
                    </Button>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Asosiy ma'lumot</h3>
                      <p className="text-gray-600">
                        2015-yildan buyon biz mijozlarimizga yuqori sifatli xizmat ko'rsatib kelmoqdamiz. 
                        Bizning to'yxonamiz zamonaviy jihozlar, professional xodimlar va qulay sharoitlar bilan 
                        ta'minlangan.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Rasm</h3>
                      <img 
                        src="https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg" 
                        alt="About" 
                        className="w-full max-w-lg rounded-lg"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Statistika</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-2xl font-bold text-amber-500">1000+</p>
                          <p className="text-gray-600">Muvaffaqiyatli tadbirlar</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-2xl font-bold text-amber-500">98%</p>
                          <p className="text-gray-600">Mijozlar tavsiyasi</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'messages' && (
                <div>
                  <h2 className="text-xl font-serif mb-6">Xabarlar</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-2 text-left">Sana</th>
                          <th className="px-4 py-2 text-left">Ism</th>
                          <th className="px-4 py-2 text-left">Telefon</th>
                          <th className="px-4 py-2 text-left">Xabar</th>
                          <th className="px-4 py-2 text-left">Holat</th>
                          <th className="px-4 py-2 text-left">Amallar</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t">
                          <td className="px-4 py-2">2025-03-15</td>
                          <td className="px-4 py-2">Azizov Jasur</td>
                          <td className="px-4 py-2">+998 90 123 45 67</td>
                          <td className="px-4 py-2">Toy haqida ma'lumot olmoqchi edim</td>
                          <td className="px-4 py-2">
                            <span className="px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-800">
                              Yangi
                            </span>
                          </td>
                          <td className="px-4 py-2">
                            <Button size="sm" variant="outline" className="text-red-500 hover:text-red-600">
                              <Trash2 size={14} className="mr-1" />
                              O'chirish
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'social' && (
                <div>
                  <h2 className="text-xl font-serif mb-6">Ijtimoiy tarmoqlar</h2>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Instagram
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        placeholder="https://instagram.com/username"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Facebook
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        placeholder="https://facebook.com/username"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Telegram
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        placeholder="https://t.me/username"
                      />
                    </div>
                    <Button type="submit">
                      Saqlash
                    </Button>
                  </form>
                </div>
              )}

              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-xl font-serif mb-6">Sozlamalar</h2>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        To'yxona nomi
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        defaultValue="Luxury Venue"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Manzil
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        defaultValue="123 Venue Street, Tashkent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Telefon
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        defaultValue="+998 90 123 45 67"
                      />
                    </div>
                    <Button type="submit">
                      Saqlash
                    </Button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Add Staff Modal */}
      <Dialog
        open={isAddStaffModalOpen}
        onClose={() => setIsAddStaffModalOpen(false)}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          
          <div className="relative bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <Dialog.Title className="text-lg font-medium mb-4">
              Yangi xodim qo'shish
            </Dialog.Title>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ism familiya
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lavozim
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ish vaqti
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  placeholder="09:00 - 18:00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Maosh turi
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-md">
                  <option value="monthly">Oylik</option>
                  <option value="daily">Kunlik</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Maosh miqdori
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rasm
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setIsAddStaffModalOpen(false)}
                >
                  Bekor qilish
                </Button>
                <Button type="submit">
                  Saqlash
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>

      {/* Add Event Modal */}
      <Dialog
        open={isAddEventModalOpen}
        onClose={() => setIsAddEventModalOpen(false)}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          
          <div className="relative bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <Dialog.Title className="text-lg font-medium mb-4">
              Yangi tadbir qo'shish
            </Dialog.Title>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tadbir turi
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-md">
                  <option value="wedding">To'y</option>
                  <option value="birthday">Tug'ilgan kun</option>
                  <option value="feast">Osh</option>
                  <option value="other">Boshqa</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sana
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mijoz ismi
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefon raqami
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mehmonlar soni
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Narxi (kishi boshiga)
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Qo'shimcha ma'lumot
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setIsAddEventModalOpen(false)}
                >
                  Bekor qilish
                </Button>
                <Button type="submit">
                  Saqlash
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>

      {/* Add Category Modal */}
      <Dialog
        open={isAddCategoryModalOpen}
        onClose={() => setIsAddCategoryModalOpen(false)}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          
          <div className="relative bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <Dialog.Title className="text-lg font-medium mb-4">
              Yangi tadbir turi qo'shish
            </Dialog.Title>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nomi
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tavsif
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rasm
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setIsAddCategoryModalOpen(false)}
                >
                  Bekor qilish
                </Button>
                <Button type="submit">
                  Saqlash
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>

      {/* Add Price Package Modal */}
      <Dialog
        open={isAddPricePackageModalOpen}
        onClose={() => setIsAddPricePackageModalOpen(false)}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          
          <div className="relative bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <Dialog.Title className="text-lg font-medium mb-4">
              Yangi tarif qo'shish
            </Dialog.Title>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nomi
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Narxi (kishi boshiga)
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tavsif
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Xizmatlar
                </label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
                      placeholder="Yangi xizmat"
                    />
                    <Button type="button" size="sm">
                      <PlusCircle size={18} />
                    </Button>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span>2 xil taom</span>
                      <Button size="sm" variant="outline" className="text-red-500">
                        <Trash2 size={14} />
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setIsAddPricePackageModalOpen(false)}
                >
                  Bekor qilish
                </Button>
                <Button type="submit">
                  Saqlash
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>

      {/* Edit About Modal */}
      <Dialog
        open={isEditAboutModalOpen}
        onClose={() => setIsEditAboutModalOpen(false)}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          
          <div className="relative bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <Dialog.Title className="text-lg font-medium mb-4">
              "Biz haqimizda" bo'limini tahrirlash
            </Dialog.Title>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Asosiy ma'lumot
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  rows={4}
                  defaultValue="2015-yildan buyon biz mijozlarimizga yuqori sifatli xizmat ko'rsatib kelmoqdamiz. 
                    Bizning to'yxonamiz zamonaviy jihozlar, professional xodimlar va qulay sharoitlar bilan 
                    ta'minlangan."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rasm
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Statistika
                </label>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Muvaffaqiyatli tadbirlar
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      defaultValue={1000}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Mijozlar tavsiyasi (%)
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      defaultValue={98}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setIsEditAboutModalOpen(false)}
                >
                  Bekor qilish
                </Button>
                <Button type="submit">
                  Saqlash
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default DashboardPage;