import React from 'react';
import { Dialog } from '@headlessui/react';
import { FormInput, FormSelect, FormTextarea, FormActions } from './FormComponents';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddEventModal: React.FC<ModalProps> = ({ isOpen, onClose }) => (
  <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen">
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
      <div className="relative bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <Dialog.Title className="text-lg font-medium mb-4">Yangi tadbir qo'shish</Dialog.Title>
        <div className="space-y-4">
          <FormSelect
            label="Tadbir turi"
            options={[
              { value: 'wedding', label: "To'y" },
              { value: 'birthday', label: "Tug'ilgan kun" },
              { value: 'feast', label: 'Osh' },
              { value: 'other', label: 'Boshqa' },
            ]}
          />
          <FormInput label="Sana" type="date" />
          <FormInput label="Mijoz ismi" type="text" />
          <FormInput label="Telefon raqami" type="tel" />
          <FormInput label="Mehmonlar soni" type="number" />
          <FormInput label="Narxi (kishi boshiga)" type="number" />
          <FormTextarea label="Qo'shimcha ma'lumot" rows={3} />
          <FormActions onClose={onClose} />
        </div>
      </div>
    </div>
  </Dialog>
);