// import React from 'react';
// import { Dialog } from '@headlessui/react';
// import { PlusCircle, Trash2 } from 'lucide-react';
// import Button from '../../../components/ui/Button';

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// interface FormInputProps {
//   label: string;
//   type: string;
//   placeholder?: string;
//   accept?: string;
//   defaultValue?: string | number;
//   smallLabel?: boolean;
// }

// interface FormTextareaProps {
//   label: string;
//   rows: number;
//   defaultValue?: string;
// }

// interface FormSelectProps {
//   label: string;
//   options: Array<{ value: string; label: string }>;
// }

// interface FormActionsProps {
//   onClose: () => void;
// }

// export const AddStaffModal: React.FC<ModalProps> = ({ isOpen, onClose }) => (
//   <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
//     <div className="flex items-center justify-center min-h-screen">
//       <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
      
//       <div className="relative bg-white rounded-lg p-8 max-w-md w-full mx-4">
//         <Dialog.Title className="text-lg font-medium mb-4">
//           Yangi xodim qo'shish
//         </Dialog.Title>
        
//         <form className="space-y-4">
//           <FormInput label="Ism familiya" type="text" />
//           <FormInput label="Lavozim" type="text" />
//           <FormInput label="Ish vaqti" type="text" placeholder="09:00 - 18:00" />
//           <FormSelect 
//             label="Maosh turi" 
//             options={[
//               { value: 'monthly', label: 'Oylik' },
//               { value: 'daily', label: 'Kunlik' }
//             ]} 
//           />
//           <FormInput label="Maosh miqdori" type="number" />
//           <FormInput label="Rasm" type="file" accept="image/*" />
//           <FormActions onClose={onClose} />
//         </form>
//       </div>
//     </div>
//   </Dialog>
// );

// export const AddEventModal: React.FC<ModalProps> = ({ isOpen, onClose }) => (
//   <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
//     <div className="flex items-center justify-center min-h-screen">
//       <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
      
//       <div className="relative bg-white rounded-lg p-8 max-w-md w-full mx-4">
//         <Dialog.Title className="text-lg font-medium mb-4">
//           Yangi tadbir qo'shish
//         </Dialog.Title>
        
//         <form className="space-y-4">
//           <FormSelect 
//             label="Tadbir turi" 
//             options={[
//               { value: 'wedding', label: 'To\'y' },
//               { value: 'birthday', label: 'Tug\'ilgan kun' },
//               { value: 'feast', label: 'Osh' },
//               { value: 'other', label: 'Boshqa' }
//             ]} 
//           />
//           <FormInput label="Sana" type="date" />
//           <FormInput label="Mijoz ismi" type="text" />
//           <FormInput label="Telefon raqami" type="tel" />
//           <FormInput label="Mehmonlar soni" type="number" />
//           <FormInput label="Narxi (kishi boshiga)" type="number" />
//           <FormTextarea label="Qo'shimcha ma'lumot" rows={3} />
//           <FormActions onClose={onClose} />
//         </form>
//       </div>
//     </div>
//   </Dialog>
// );

// export const AddCategoryModal: React.FC<ModalProps> = ({ isOpen, onClose }) => (
//   <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
//     <div className="flex items-center justify-center min-h-screen">
//       <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
      
//       <div className="relative bg-white rounded-lg p-8 max-w-md w-full mx-4">
//         <Dialog.Title className="text-lg font-medium mb-4">
//           Yangi tadbir turi qo'shish
//         </Dialog.Title>
        
//         <form className="space-y-4">
//           <FormInput label="Nomi" type="text" />
//           <FormTextarea label="Tavsif" rows={3} />
//           <FormInput label="Rasm" type="file" accept="image/*" />
//           <FormActions onClose={onClose} />
//         </form>
//       </div>
//     </div>
//   </Dialog>
// );

// export const AddPricePackageModal: React.FC<ModalProps> = ({ isOpen, onClose }) => (
//   <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
//     <div className="flex items-center justify-center min-h-screen">
//       <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
      
//       <div className="relative bg-white rounded-lg p-8 max-w-md w-full mx-4">
//         <Dialog.Title className="text-lg font-medium mb-4">
//           Yangi tarif qo'shish
//         </Dialog.Title>
        
//         <form className="space-y-4">
//           <FormInput label="Nomi" type="text" />
//           <FormInput label="Narxi (kishi boshiga)" type="number" />
//           <FormTextarea label="Tavsif" rows={3} />
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Xizmatlar
//             </label>
//             <div className="space-y-2">
//               <div className="flex items-center gap-2">
//                 <input
//                   type="text"
//                   className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
//                   placeholder="Yangi xizmat"
//                 />
//                 <Button type="button" size="sm">
//                   <PlusCircle size={18} />
//                 </Button>
//               </div>
//               <ul className="space-y-2">
//                 <li className="flex items-center justify-between p-2 bg-gray-50 rounded">
//                   <span>2 xil taom</span>
//                   <Button size="sm" variant="outline" className="text-red-500">
//                     <Trash2 size={14} />
//                   </Button>
//                 </li>
//               </ul>
//             </div>
//           </div>
          
//           <FormActions onClose={onClose} />
//         </form>
//       </div>
//     </div>
//   </Dialog>
// );

// export const EditAboutModal: React.FC<ModalProps> = ({ isOpen, onClose }) => (
//   <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
//     <div className="flex items-center justify-center min-h-screen">
//       <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
      
//       <div className="relative bg-white rounded-lg p-8 max-w-md w-full mx-4">
//         <Dialog.Title className="text-lg font-medium mb-4">
//           "Biz haqimizda" bo'limini tahrirlash
//         </Dialog.Title>
        
//         <form className="space-y-4">
//           <FormTextarea 
//             label="Asosiy ma'lumot" 
//             rows={4} 
//             defaultValue="2015-yildan buyon biz mijozlarimizga yuqori sifatli xizmat ko'rsatib kelmoqdamiz. 
//               Bizning to'yxonamiz zamonaviy jihozlar, professional xodimlar va qulay sharoitlar bilan 
//               ta'minlangan."
//           />
//           <FormInput label="Rasm" type="file" accept="image/*" />
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Statistika
//             </label>
//             <div className="space-y-4">
//               <FormInput 
//                 label="Muvaffaqiyatli tadbirlar" 
//                 type="number" 
//                 defaultValue={1000} 
//                 smallLabel 
//               />
//               <FormInput 
//                 label="Mijozlar tavsiyasi (%)" 
//                 type="number" 
//                 defaultValue={98} 
//                 smallLabel 
//               />
//             </div>
//           </div>
          
//           <FormActions onClose={onClose} />
//         </form>
//       </div>
//     </div>
//   </Dialog>
// );

// // Reusable form components
// const FormInput: React.FC<FormInputProps> = ({ 
//   label, 
//   type, 
//   placeholder = '', 
//   accept, 
//   defaultValue = '', 
//   smallLabel = false 
// }) => (
//   <div>
//     <label className={`block ${smallLabel ? 'text-sm text-gray-600' : 'text-sm font-medium text-gray-700'} mb-1`}>
//       {label}
//     </label>
//     <input
//       type={type}
//       className="w-full px-4 py-2 border border-gray-300 rounded-md"
//       placeholder={placeholder}
//       accept={accept}
//       defaultValue={defaultValue}
//     />
//   </div>
// );

// const FormTextarea: React.FC<FormTextareaProps> = ({ label, rows, defaultValue = '' }) => (
//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-1">
//       {label}
//     </label>
//     <textarea
//       className="w-full px-4 py-2 border border-gray-300 rounded-md"
//       rows={rows}
//       defaultValue={defaultValue}
//     />
//   </div>
// );

// const FormSelect: React.FC<FormSelectProps> = ({ label, options }) => (
//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-1">
//       {label}
//     </label>
//     <select className="w-full px-4 py-2 border border-gray-300 rounded-md">
//       {options.map(option => (
//         <option key={option.value} value={option.value}>
//           {option.label}
//         </option>
//       ))}
//     </select>
//   </div>
// );

// const FormActions: React.FC<FormActionsProps> = ({ onClose }) => (
//   <div className="flex justify-end space-x-4 mt-6">
//     <Button variant="outline" onClick={onClose}>
//       Bekor qilish
//     </Button>
//     <Button type="submit">
//       Saqlash
//     </Button>
//   </div>
// );