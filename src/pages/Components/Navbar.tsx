
import { 
    Users, Calendar, Settings, MessageSquare, 
     Info, Tag, DollarSign, Share2, Home ,Newspaper 
  } from 'lucide-react';
import { motion } from 'framer-motion';


type NavbarProps = {
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  };



  const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {




  return (
    <div className="lg:col-span-1 ">
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
                  <Home  size={20} className="mr-3" />
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
                  onClick={() => setActiveTab('news')}
                  className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${
                    activeTab === 'news' 
                      ? 'bg-amber-500 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Newspaper  size={20} className="mr-3" />
                  Yangiliklar
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
  )
}

export default Navbar




