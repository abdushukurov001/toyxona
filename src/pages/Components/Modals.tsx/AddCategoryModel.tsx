import React from 'react';
import { Dialog } from '@headlessui/react';
import { FormInput, FormTextarea, FormActions } from './FormComponents';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddCategoryModal: React.FC<ModalProps> = ({ isOpen, onClose }) => (
  <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen">
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
      <div className="relative bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <Dialog.Title className="text-lg font-medium mb-4">Yangi tadbir turi qo'shish</Dialog.Title>
        <div className="space-y-4">
          <FormInput label="Nomi" type="text" />
          <FormTextarea label="Tavsif" rows={3} />
          <FormInput label="Rasm" type="file" accept="image/*" />
          <FormActions onClose={onClose} />
        </div>
      </div>
    </div>
  </Dialog>
);