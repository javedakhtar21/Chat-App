import React from "react";
import "./TInput.css";
import { FaTimes } from "react-icons/fa";

interface InputProps {
  type: "text" | "tel" | "email" | "password" | "number";
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "filled" | "outline" | "minimal";
  required?: boolean;
  disabled?: boolean;
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  className = "",
  size = "md",
  variant = "default",
  required = false,
  disabled = false,
  label,
  error,
  success = false,
  helperText,
}) => {
  const baseClass = "input";
  const sizeClass = `input--${size}`;
  const variantClass = `input--${variant}`;
  const stateClass = error ? "input--error" : success ? "input--success" : "";

  const combinedClasses = [
    baseClass,
    sizeClass,
    variantClass,
    stateClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="input-wrapper">
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}
      <div className="input-container">
        <input
          type={type}
          className={combinedClasses}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          required={required}
          disabled={disabled}
        />
        {value && (
          <FaTimes
            className="clear-icon"
            onClick={() => onChange("")}
          />
        )}
      </div>
      {error && <div className="input-error">{error}</div>}
      {success && !error && <div className="input-success">Looks good!</div>}
      {helperText && !error && !success && (
        <div className="input-helper">{helperText}</div>
      )}
    </div>
  );
};

export default Input;
