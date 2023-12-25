

import React, { useState } from 'react';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="relative px-4 py-4 flex justify-between items-center bg-white">
      <a className="text-3xl font-bold leading-none" href="#">
        <svg className="h-10" alt="logo" viewBox="0 0 10240 10240">
          
        </svg>
      </a>
      <div className="lg:hidden">
        <button
          className="navbar-burger flex items-center text-blue-600 p-3"
          onClick={toggleMobileMenu}
        >
          <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            
          </svg>
        </button>
      </div>
      <ul
        className={`${
          isMobileMenuOpen ? 'block' : 'hidden'
        } absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6`}
      >
        <li>
          <a className="text-sm text-gray-400 hover:text-gray-500" href="#">
            Home
          </a>
        </li>
       
      </ul>
      <a
        className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-xl transition duration-200"
        href="#"
      >
        Sign In
      </a>
      <a
        className="hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200"
        href="#"
      >
        Sign up
      </a>
    </nav>
  );
};

export default Navbar;
