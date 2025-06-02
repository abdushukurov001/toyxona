import React from 'react';
import Button from '../../../components/ui/Button';

// Updated interfaces with all required props
interface FormInputProps {
  label: string;
  name: string;
  type: string;
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  accept?: string;
  defaultValue?: string | number;
  smallLabel?: boolean;
  required?: boolean;
}

interface FormTextareaProps {
  label: string;
  name: string;
  rows: number;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  defaultValue?: string;
  required?: boolean;
}

interface FormSelectProps {
  label: string;
  name: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ value: string; label: string }>;
  required?: boolean;
}

interface FormActionsProps {
  onClose: () => void;
  onSubmit?: () => void;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  placeholder = '',
  accept,
  defaultValue,
  smallLabel = false,
  required = false,
}) => (
  <div>
    <label
      className={`block ${smallLabel ? 'text-sm text-gray-600' : 'text-sm font-medium text-gray-700'} mb-1`}
    >
      {label}
      {required && <span className="text-red-500"> *</span>}
    </label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder={placeholder}
      accept={accept}
      defaultValue={defaultValue}
      required={required}
    />
  </div>
);

export const FormTextarea: React.FC<FormTextareaProps> = ({ 
  label, 
  name,
  rows, 
  value, 
  onChange, 
  defaultValue = '',
  required = false 
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
      {required && <span className="text-red-500"> *</span>}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      rows={rows}
      defaultValue={defaultValue}
      required={required}
    />
  </div>
);

export const FormSelect: React.FC<FormSelectProps> = ({ 
  label, 
  name,
  value, 
  onChange, 
  options,
  required = false 
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
      {required && <span className="text-red-500"> *</span>}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      required={required}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export const FormActions: React.FC<FormActionsProps> = ({ onClose, onSubmit }) => (
  <div className="flex justify-end space-x-4 mt-6">
    <Button variant="outline" onClick={onClose} type="button">
      Bekor qilish
    </Button>
    <Button type="submit" onClick={onSubmit}>
      Saqlash
    </Button>
  </div>
);