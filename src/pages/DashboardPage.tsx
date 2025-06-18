import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';
import Button from '../components/ui/Button';
import DashboardHomePage from './DashboardHomePage';
import Navbar from './Components/Navbar';
import StaffList from './Components/StaffList';
import EventsTab from './Components/Events';
import CategoryTab from './Components/CategoryTab';
import PriceTab from './Components/PriceTab';
import AboutTab from './Components/AboutTab';
import MessagesTab from './Components/MessagesTab';
import SocialMediaForm from './Components/SocialMediaForm';
import SettingsForm from './Components/SettingsForm';
import { AddEventModal } from './Components/Modals.tsx/AddEventModel';
import { AddCategoryModal } from './Components/Modals.tsx/AddCategoryModel';
// import { AddPricePackageModal } from './Components/Modals.tsx/AddPriceModel';
import { EditAboutModal } from './Components/Modals.tsx/EditAboutModal';
import { AddStaffModal } from './Components/Modals.tsx/AddStaffModel';
import NewsManager from './Components/NewsSection';




const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [isEditAboutModalOpen, setIsEditAboutModalOpen] = useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [, setIsAddPricePackageModalOpen] = useState(false);

  if (!user.isAuthenticated) {
    navigate('/admin/login');
    return null;
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return <DashboardHomePage />;
      case 'staff':
        return   <StaffList
     />
      case 'events':
        return <EventsTab onAddEvent={() => setIsAddEventModalOpen(true)} />;
      case 'categories':
        return <CategoryTab onAddCategory={() => setIsAddCategoryModalOpen(true)} />;
         case 'prices':
        return <PriceTab onAddPricePackage={() => setIsAddPricePackageModalOpen(true)} />;
      case 'news':
        return <NewsManager/>;
      case 'about':
        return <AboutTab />;
      case 'messages':
        return <MessagesTab  />;
      case 'social':
        return (
          <div>
            {/* <h2 className="text-xl font-serif mb-6">Ijtimoiy tarmoqlar</h2> */}
            <SocialMediaForm />
          </div>
        );
      case 'settings':
        return (
          <div>
            <h2 className="text-xl font-serif mb-6">Sozlamalar</h2>
            <SettingsForm />
          </div>
        );
      default:
        return <DashboardHomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto max-w-full px-4 md:px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-serif text-gray-800">Admin Dashboard</h1>
          <Button 
            variant="outline" 
            onClick={() => {
              logout();
              navigate('/');
            }}
          >
            <LogOut size={18} className="mr-2" />
            Chiqish
          </Button>
        </div>
      </header>

      <div className="container max-w-full mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              {renderActiveTab()}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddStaffModal
      isOpen={isAddStaffModalOpen}
      onClose={() => {
        console.log("Modal yopildi"); // Yopishda ham chiqishi kerak
        setIsAddStaffModalOpen(false);
      }}
    />
      
      <AddEventModal 
        isOpen={isAddEventModalOpen} 
        onClose={() => setIsAddEventModalOpen(false)} 
      />
      
      <AddCategoryModal 
        isOpen={isAddCategoryModalOpen} 
        onClose={() => setIsAddCategoryModalOpen(false)} 
      />
      
      {/* <AddPricePackageModal 
        isOpen={isAddPricePackageModalOpen} 
        onClose={() => setIsAddPricePackageModalOpen(false)} 
      /> */}
      
      <EditAboutModal 
        isOpen={isEditAboutModalOpen} 
        onClose={() => setIsEditAboutModalOpen(false)} 
      />
    </div>
  );
};


export default DashboardPage;