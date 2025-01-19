import React, { useEffect } from 'react';
import { useSearch } from '../../contexts/SearchContext';
import { fetchHostels } from '../../services/hostelSearchService';
import CardSliderless from '../common/CardSliderless';
const SearchResults = () => {
  const { searchTerm, filterType, searchResults, setSearchResults } = useSearch();


  useEffect(() => {
    const getSearchResults = async () => {
      const results = await fetchHostels(searchTerm, filterType);
      setSearchResults(results);
    };

    getSearchResults();
  }, [searchTerm, filterType, setSearchResults]);

  if(!searchResults){
    return <p>your hostels are on the way</p>
  }

  return (
    <div className='  dark:bg-slate-700 dark:text-text'>
      <h1 className='text-center text-xl lg:text-2xl xl:text-3xl py-3 font-bold '>Search Results</h1>
      {searchResults.length > 0 ? (
      <div className='flex justify-around items-center flex-wrap'>
        
      <CardSliderless hostels={searchResults} />
      </div>
      ) : (
        <div className='min-h-[80vh] grid place-content-center text-3xl'><p>
        No results found. Try adjusting your search criteria please.
        </p></div>
      )}
    </div>
  );
};

export default SearchResults;
