import React from 'react';
import "./TButton.css"

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  darkMode?: boolean; // Optional prop to force dark mode
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  icon,
  fullWidth = false,
  darkMode = false // Default to false
}) => {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const sizeClass = `btn-${size}`;
  const loadingClass = loading ? 'btn-loading' : '';
  const widthClass = fullWidth ? 'w-full' : '';
  const darkModeClass = darkMode ? 'dark-mode' : '';
  
  const combinedClasses = [
    baseClass,
    variantClass,
    sizeClass,
    loadingClass,
    widthClass,
    darkModeClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled || loading}
      style={{ width: fullWidth ? '100%' : 'auto' }}
    >
      {icon && !loading && <span className="btn-icon">{icon}</span>}
      {loading && <span className="btn-spinner" />}
      {children}
    </button>
  );
};

export default Button;