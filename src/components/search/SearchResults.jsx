import React, { useEffect } from 'react';
import { useSearch } from '../../contexts/SearchContext';
import { fetchHostels } from '../../services/hostelSearchService';
import { useHostel } from '../../contexts/HostelContext';
import { useNavigate } from 'react-router-dom';
import { FaBath, FaBed, FaMapMarkerAlt } from 'react-icons/fa';

const SearchResults = () => {
  const { searchTerm, filterType, searchResults, setSearchResults } = useSearch();
  const { selectHostel } = useHostel();
  const navigate = useNavigate();

  useEffect(() => {
    const getSearchResults = async () => {
      const results = await fetchHostels(searchTerm, filterType);
      setSearchResults(results);
    };

    getSearchResults();
  }, [searchTerm, filterType, setSearchResults]);

  const handleCardClick = (hostel) => {
    selectHostel(hostel);
    navigate('/hostel-details');
  };
  if(!searchResults){
    return <p>your hostels are on the way</p>
  }

  return (
    <div className=' container mx-auto'>
      <h1 className='text-center text-xl lg:text-2xl xl:text-3xl py-3 font-bold '>Search Results</h1>
      {searchResults.length > 0 ? (
        <ul  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {searchResults.map((hostel) => (
      <div key={hostel.id} className="px-2 hover:-translate-y-[10px] transition-all duration-200 ">
        <div className="border rounded-lg shadow-lg overflow-hidden cursor-pointer" onClick={() => handleCardClick(hostel)}>
          {hostel.images && (
            <img src={hostel.images[0]} alt={hostel.name} className="w-full h-48 object-cover" />
          )}
          <div className="p-4">
          <div className='flex justify-between items-center w-full '>
          <h3 className="text-xl font-semibold">{hostel.name}</h3>
          <h2 className="text-xl font-normal">Rs:{hostel.price}</h2>

          </div>
          <p className='text-gray-600 my-3 text-justify italic'>{hostel.description}</p>
          {/** loc Bath Bed */}
        <div className='flex justify-between items-center flex-wrap my-5 text-gray-600 '>
        <p className="flex justify-start items-center space-x-2">
            <i><FaMapMarkerAlt/> </i>   <span>{hostel.location}</span>
            </p>
            <p className=" flex justify-start items-center space-x-2">
            <i><FaBed/> </i>   <span>{hostel.beds}</span>
            </p>
            <p className=" flex justify-start items-center space-x-2">
            <i><FaBath/></i>    <span>{hostel.bathroom}</span>
            </p>
        </div>
        <p className='text-red-300 my-3 text-justify font-thin h-8'>Note : {hostel.instruction}</p>

          </div>
        </div>
      </div>
    ))}
        </ul>
      ) : (
        <p>No results found. Try adjusting your search criteria.</p>
      )}
    </div>
  );
};

export default SearchResults;
