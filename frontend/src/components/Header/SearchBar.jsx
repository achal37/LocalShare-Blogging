import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className='flex items-center w-full'>
      <input
        type="text"
        className='border-2 rounded-md p-2 h-10 w-full'
        placeholder="Search for location..."
        value={query}
        onChange={handleChange}
      />
      <button
        className='ml-2 hover:bg-white hover:text-slate-700 font-medium text-cwhite flex items-center justify-center h-10 border-2 border-sblue bg-sblue p-2 rounded-lg'
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
