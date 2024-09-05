import React from 'react'
import { useSearch } from '../../contexts/SearchContext';
import { useNavigate } from 'react-router-dom';

function Search() {
  const navigate = useNavigate();

    const { searchTerm, setSearchTerm, filterType, setFilterType, setSearchResults } = useSearch();


    const handleSearch = (e) => {
        e.preventDefault();
        setSearchResults([]); // Clear previous results
        navigate('/search-results');
      };
  return (
    <form onSubmit={handleSearch} className="mr-4 flex items-center flex-wrap max-lg:justify-center max-lg:space-y-5">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={
                filterType === 'name' 
                ? 'Search by name' 
                : filterType === 'beds' 
                ? 'Min number of beds' 
                : 'Search by address'
              }
              className="p-2 rounded max-lg:w-[87%] dark:text-white dark:bg-gray-700 border border-icons focus:border-iconsDark focus:outline-none"
            />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="p-2 rounded ml-2 max-lg:w-[70%] dark:text-white dark:bg-gray-700 border border-icons focus:outline-none"
            >
              <option value="name">Name</option>
              <option value="beds">Number of Beds</option>
              <option value="address">Address</option>
            </select>
            <button type="submit" className="p-2 bg-hov hover:bg-hovDark text-white rounded ml-2 ">Search</button>
          </form>
  )
}

export default Search
