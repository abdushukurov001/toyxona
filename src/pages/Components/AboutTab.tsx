import { Edit } from "lucide-react";
import Button from "../../components/ui/Button"; // or the correct import path
import React from "react";

interface AboutTabProps {
  onEditAbout: () => void;
}

const AboutTab: React.FC<AboutTabProps> = ({ onEditAbout }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-serif">Biz haqimizda</h2>
        <Button onClick={onEditAbout}>
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
  );
};

export default AboutTab;
