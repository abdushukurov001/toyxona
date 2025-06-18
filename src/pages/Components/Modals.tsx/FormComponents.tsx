import React from 'react';
import Button from '../../../components/ui/Button';

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
  error?: string; // Added error prop
}

interface FormTextareaProps {
  label: string;
  name: string;
  rows: number;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  defaultValue?: string;
  required?: boolean;
  error?: string; // Added error prop
}

interface FormSelectProps {
  label: string;
  name: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ value: string; label: string }>;
  required?: boolean;
  error?: string; // Added error prop
  disabled?: boolean;
}

interface FormActionsProps {
  onClose: () => void;
  onSubmit?: () => void;
   submitText: string;
   isSubmitting: boolean;
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
  error,
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
      className={`w-full px-4 py-2 border ${
        error ? 'border-red-500' : 'border-gray-300'
      } rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500`}
      placeholder={placeholder}
      accept={accept}
      defaultValue={defaultValue}
      required={required}
    />
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

export const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  name,
  rows,
  value,
  onChange,
  defaultValue = '',
  required = false,
  error,
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
      className={`w-full px-4 py-2 border ${
        error ? 'border-red-500' : 'border-gray-300'
      } rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500`}
      rows={rows}
      defaultValue={defaultValue}
      required={required}
    />
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

export const FormSelect: React.FC<FormSelectProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  error,
  disabled = false,
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
      className={`w-full px-4 py-2 border ${
        error ? 'border-red-500' : 'border-gray-300'
      } rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500`}
      required={required}
      disabled={disabled}
    >
      {/* <option value="" disabled>
        Tanlang
      </option> */}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

export const FormActions: React.FC<FormActionsProps> = ({ onClose, onSubmit }) => (
  <div className="flex justify-end space-x-4 mt-6">
    <Button
      variant="outline"
      onClick={onClose}
      type="button"
      className="bg-gray-200 hover:bg-gray-300 text-gray-800"
    >
      Bekor qilish
    </Button>
    <Button
      type="submit"
      onClick={onSubmit}
      className="bg-orange-600 hover:bg-orange-700 text-white"
    >
      Saqlash
    </Button>
  </div>
);