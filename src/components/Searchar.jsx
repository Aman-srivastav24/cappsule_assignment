import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
    
  };

  return (
    <div className='searchBar flex flex-col mt-8 items-center'>
      <h1 className='mb-10 text-[27px]'>Cappsule web development test</h1>
      <div className="input flex items-center border-2 w-[1002px] justify-between rounded-full px-6 py-4 bg-white shadow-lg ">
        <div className='searchBar-left flex items-center gap-4'>
      <CiSearch className='text-[24px] font-bold'/>
      <input
      className='w-[800px] outline-none '
        type="text"
        placeholder="Type your medicine name here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)
          
        }
      />
      </div>
      <button className='text-[#2a527a] font-bold' onClick={handleSearch}>Search</button>
      
      </div>
      <hr className="w-[1002px]  mt-12 border-gray-400" />
    </div>
  );
};

export default SearchBar;
