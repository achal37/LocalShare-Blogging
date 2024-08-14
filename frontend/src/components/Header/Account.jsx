import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";

function Account() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem('token');
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-gray-500">
      <button onClick={toggleMenu} className="focus:outline-none">
        <VscAccount className="mx-2 mt-1 text-3xl" />
      </button>

      {isOpen && (
        <div ref={menuRef} className="absolute right-0 mt-2 w-max bg-cwhite rounded-md border-2 border-blue-500 shadow-md z-10">
          <ul className="p-2">
            <li>
              <Link to="/profile" className="block rounded-lg px-4 py-2 border-2 border-cwhite hover:bg-gray-100 hover:border-sblue hover:text-blue-500">
                My Account
              </Link>
            </li>
            <li>
              <Link to="/myPosts" className="block rounded-lg px-4 py-2 border-2 border-cwhite hover:bg-gray-100 hover:border-sblue hover:text-blue-500">
                My Posts
              </Link>
            </li>
            <li>
              <Link to="/bookmarks" className="block rounded-lg px-4 py-2 border-2 border-cwhite hover:bg-gray-100 hover:border-sblue hover:text-blue-500">
                My Bookmarks
              </Link>
            </li>
            <li onClick={handleLogOut}>
              <Link to="/auth/SignIn" className="block rounded-lg px-4 py-2 border-2 border-cwhite hover:bg-gray-100 hover:border-sblue hover:text-blue-500">
                Log Out
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Account;
