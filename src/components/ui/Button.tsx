import React from 'react';
import { Link } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  to?: string;
  external?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  to,
  external = false
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus:outline-none';
  
  const variantStyles = {
    primary: 'bg-amber-500 text-white hover:bg-amber-600 active:bg-amber-700 shadow-md',
    secondary: 'bg-gray-800 text-white hover:bg-gray-900 active:bg-black shadow-md',
    outline: 'bg-transparent border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white'
  };
  
  const sizeStyles = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-5 py-2.5',
    lg: 'text-lg px-6 py-3'
  };
  
  const disabledStyles = disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer';
  
  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`;
  
  // If it's a link
  if (to) {
    if (external) {
      return (
        <a 
          href={to} 
          className={buttonStyles}
          target="_blank" 
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    
    return (
      <Link to={to} className={buttonStyles}>
        {children}
      </Link>
    );
  }
  
  // Regular button
  return (
    <button
      type={type}
      className={buttonStyles}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;