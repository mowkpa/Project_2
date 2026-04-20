import React from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="search-container">
      <FiSearch className="search-icon" />
      <input
        type="text"
        placeholder="Search by company or role..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;