import React from 'react';

const SearchBar = ({ searchInput, setSearchInput, setGlobalFilter }) => {
  return (
    <div className="search-bar">
      <label>
      Search : 
        <input
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
            setGlobalFilter(e.target.value);
          }}
        />
      </label>
    </div>
  );
};

export default SearchBar;
