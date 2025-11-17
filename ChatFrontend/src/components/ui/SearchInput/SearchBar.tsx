import React from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import "./SearchBar.css";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}) => {
  return (
    <div className={`position-relative ${className}`}>
      {/* Search Icon */}
      <FaSearch className="search-icon" />

      {/* Input Box */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="form-control search-input"
      />

      {/* Clear (X) Icon — appears only when text exists */}
      {value && <FaTimes className="clear-icon" onClick={() => onChange("")} />}
    </div>
  );
};

export default SearchBar;
