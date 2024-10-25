import React, { useState } from 'react';
import searchIcon from '../../assets/images/search_icon.png';
import './index.css';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Searching for:', searchTerm);
    // Add search logic here
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        placeholder="Search for keywords"
        value={searchTerm}
        onChange={handleChange}
        aria-label="Search input"
      />
      <button type="submit" aria-label="Search button">
        <img src={searchIcon} alt="Search" />
      </button>
    </form>
  );
}

export default SearchBar;
