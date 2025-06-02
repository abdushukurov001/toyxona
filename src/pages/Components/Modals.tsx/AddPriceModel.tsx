import React from 'react';
import { Dialog } from '@headlessui/react';
import { PlusCircle, Trash2 } from 'lucide-react';
import Button from '../../../components/ui/Button';
import { FormInput, FormTextarea, FormActions } from './FormComponents';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddPricePackageModal: React.FC<ModalProps> = ({ isOpen, onClose }) => (
  <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen">
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
      <div className="relative bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <Dialog.Title className="text-lg font-medium mb-4">Yangi tarif qo'shish</Dialog.Title>
        <div className="space-y-4">
          <FormInput label="Nomi" type="text" />
          <FormInput label="Narxi (kishi boshiga)" type="number" />
          <FormTextarea label="Tavsif" rows={3} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Xizmatlar</label>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <FormActions onClose={onClose} />
        </div>
      </div>
    </div>
  </Dialog>
);