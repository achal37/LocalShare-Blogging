import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import Account from './Account';
import Location from './Location';
import { GoHome } from "react-icons/go";

function Header() {
  const navigate = useNavigate();

  const handleNewPost = () => {
    navigate('/create-post');
  };

  const handleLogoClick = () => {
    navigate('/'); // Navigate to the home screen
  };

  return (
    <div className='p-2 h-14 bg-cwhite flex gap-x-2'>
      <button 
        onClick={handleLogoClick} // Attach the handler here
        className='w-14 h-10 hover:text-blue-400'
      >
        <GoHome className='text-3xl ml-1'/>
      </button>
      <SearchBar />
      <div className='w-36'>
        <button 
          onClick={handleNewPost} // Attach the handler here
          className='hover:bg-white hover:text-slate-700 font-medium text-cwhite flex items-center justify-center h-10 border-2 border-sblue bg-sblue w-full p-2 rounded-lg'>
          New Post
        </button>
      </div>
      <Location />
      <Account />
    </div>
  );
}

export default Header;
