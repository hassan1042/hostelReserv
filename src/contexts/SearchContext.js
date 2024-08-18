import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('name'); // New state for filter type
  const [searchResults, setSearchResults] = useState([]);

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, filterType, setFilterType, searchResults, setSearchResults }}>
      {children}
    </SearchContext.Provider>
  );
};
