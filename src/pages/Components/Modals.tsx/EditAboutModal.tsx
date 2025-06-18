/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Dialog } from '@headlessui/react';
import { FormInput, FormTextarea, FormActions } from './FormComponents';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditAboutModal: React.FC<ModalProps> = ({ isOpen, onClose }) => (
  <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen">
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
      <div className="relative bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <Dialog.Title className="text-lg font-medium mb-4">"Biz haqimizda" bo'limini tahrirlash</Dialog.Title>
        <div className="space-y-4">
          <FormTextarea
            label="Asosiy ma'lumot"
            rows={4}
            defaultValue="2015-yildan buyon biz mijozlarimizga yuqori sifatli xizmat ko'rsatib kelmoqdamiz. Bizning to'yxonamiz zamonaviy jihozlar, professional xodimlar va qulay sharoitlar bilan ta'minlangan." name={''} onChange={function (e: React.ChangeEvent<HTMLTextAreaElement>): void {
              throw new Error('Function not implemented.');
            } }          />
          <FormInput label="Rasm" type="file" accept="image/*" name={''} onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
            throw new Error('Function not implemented.');
          } } />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Statistika</label>
            <div className="space-y-4">
              <FormInput label="Muvaffaqiyatli tadbirlar" type="number" defaultValue={1000} smallLabel name={''} onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
                throw new Error('Function not implemented.');
              } } />
              <FormInput label="Mijozlar tavsiyasi (%)" type="number" defaultValue={98} smallLabel name={''} onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
                throw new Error('Function not implemented.');
              } } />
            </div>
          </div>
          <FormActions onClose={onClose} submitText={''} isSubmitting={false} />
        </div>
      </div>
    </div>
  </Dialog>
);