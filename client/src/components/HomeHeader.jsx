import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomeHeader = ({ activeLink, setActiveLink }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsMenuOpen(false);
  };

  const links = [
    { id: 'home', href: '#home', text: 'Home' },
    { id: 'gallery', href: '/gallery', text: 'Gallery', isRouterLink: true },
    { id: 'about', href: '#about', text: 'About' },
    { id: 'contact', href: '#contact', text: 'Contact' },
  ];

  return (
    <nav className="bg-transparent backdrop-blur-md fixed w-full z-20 top-0 py-1">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Zoolyst
          </span>
        </Link>
        
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button 
            onClick={toggleMenu}
            type="button" 
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" 
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
        </div>
        
        <div 
          className={`${isMenuOpen ? 'block' : 'hidden'} items-center justify-between w-full md:flex md:w-auto md:order-1`} 
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white bg-transparent md:dark:bg-transparent dark:border-gray-700">
            {links.map((link) => (
              <li key={link.id} className="relative">
                {link.isRouterLink ? (
                  <Link 
                    to={link.href}
                    className={`block py-2 px-3 ${activeLink === link.id ? 'text-blue-700 dark:text-blue-500' : 'text-gray-900 dark:text-white'} rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
                    onClick={() => handleLinkClick(link.id)}
                  >
                    {link.text}
                    {activeLink === link.id && (
                      <motion.span 
                        className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-700 dark:bg-blue-500"
                        layoutId="underline"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                ) : (
                  <a 
                    href={link.href}
                    className={`block py-2 px-3 ${activeLink === link.id ? 'text-blue-700 dark:text-blue-500' : 'text-gray-900 dark:text-white'} rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
                    onClick={() => handleLinkClick(link.id)}
                  >
                    {link.text}
                    {activeLink === link.id && (
                      <motion.span 
                        className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-700 dark:bg-blue-500"
                        layoutId="underline"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default HomeHeader;