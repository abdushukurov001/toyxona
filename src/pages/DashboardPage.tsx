import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { 
  LogOut, PlusCircle, 
   Trash2, 
} from 'lucide-react';
import Button from '../components/ui/Button';
import DashboardHomePage from './DashboardHomePage';
import { Dialog } from '@headlessui/react';
import Navbar from './Components/Navbar';
import StaffList from './Components/StaffList';
import EventsTab from './Components/Events';
import CategoryTab from './Components/CategoryTab';
import PriceTab from './Components/PriceTab';
import AboutTab from './Components/AboutTab';
import MessagesTab from './Components/MessagesTab';
import SocialMediaForm from './Components/SocialMediaForm';
import SettingsForm from './Components/SettingsForm';

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
        <div className="container mx-auto max-w-full px-4 md:px-6 py-4 flex justify-between items-center">
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

      <div className="container max-w-full mx-auto px-4 md:px-6 py-8">
        <div className="grid  grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

         
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              {activeTab === 'home' && <DashboardHomePage />}

              {activeTab === 'staff' && (
                  <StaffList onAddStaff={() => setIsAddStaffModalOpen(true)} />
              )}

              {activeTab === 'events' && (
                 <EventsTab onAddEvent={() => setIsAddEventModalOpen(true)} />
              )}

              {activeTab === 'categories' && (
                 <CategoryTab onAddCategory={() => setIsAddCategoryModalOpen(true)} />
              )}

              {activeTab === 'prices' && (
                 <PriceTab onAddPricePackage={() => setIsAddPricePackageModalOpen(true)} />
              )}

              {activeTab === 'about' && (
                  <AboutTab onEditAbout={() => setIsEditAboutModalOpen(true)} />
              )}

              {activeTab === 'messages' && (
                <MessagesTab messages={[
                  {
                    date: '2025-03-15',
                    name: 'Azizov Jasur',
                    phone: '+998 90 123 45 67',
                    message: 'Toy haqida ma\'lumot olmoqchi edim',
                    status: 'Yangi'
                  },
                 
                ]}
                onDeleteMessage={() => {
                 
                }}/>
              )}

              {activeTab === 'social' && (
                <div>
                <h2 className="text-xl font-serif mb-6">Ijtimoiy tarmoqlar</h2>
                <SocialMediaForm />
              </div>
              )}

{activeTab === 'settings' && (
  <div>
    <h2 className="text-xl font-serif mb-6">Sozlamalar</h2>
    <SettingsForm />
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