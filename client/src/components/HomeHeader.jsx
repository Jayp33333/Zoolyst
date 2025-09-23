import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const HomeHeader = ({ activeLink, setActiveLink }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsMenuOpen(false);
  };

  const links = [
    { id: "home", href: "#home", text: "Home" },
    { id: "gallery", href: "/gallery", text: "Gallery", isRouterLink: true },
    { id: "about", href: "#about", text: "About" },
    { id: "contact", href: "#contact", text: "Contact" },
  ];

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className="fixed w-full top-0 z-50"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Background transition */}
      <AnimatePresence>
        <motion.div
          key={scrolled ? "scrolled" : "top"}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className={`absolute inset-0 ${
            scrolled ? "bg-white shadow-md" : "bg-transparent"
          }`}
        />
      </AnimatePresence>

      <div className="relative max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <motion.span
            className={`self-center text-2xl font-semibold whitespace-nowrap transition-colors duration-300 ${
              scrolled ? "bg-gradient-to-b from-[#46b12f]   via-[#174017] to-[#3e8445] bg-clip-text text-transparent" : "bg-gradient-to-b from-[#46b12f]   via-[#174017] to-[#3e8445] bg-clip-text text-transparent"
            } hover:text-[#1B5E20]`}
          >
            Zoolyst
          </motion.span>
        </Link>

        {/* Mobile menu button */}
        <div className="flex md:order-2">
          <button
            onClick={toggleMenu}
            type="button"
            className={`inline-flex items-center p-2 w-10 h-10 justify-center rounded-lg md:hidden focus:outline-none focus:ring-2 ${
              scrolled
                ? "text-black hover:bg-gray-200 focus:ring-gray-400"
                : "text-white hover:bg-[#E0E0E0] focus:ring-[#2E7D32]"
            }`}
            aria-expanded={isMenuOpen}
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } items-center justify-between w-full md:flex md:w-auto md:order-1`}
        >
          <ul
            className={`flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ${
              scrolled
                ? "border-gray-200 bg-white md:bg-transparent"
                : "border-[#E0E0E0] bg-white md:bg-transparent"
            }`}
          >
            {links.map((link) => (
              <li key={link.id} className="relative">
                {link.isRouterLink ? (
                  <Link
                    to={link.href}
                    className={`block py-2 px-3 transition-colors duration-300 ${
                      activeLink === link.id
                        ? "text-[#2E7D32] font-semibold"
                        : scrolled
                        ? "text-black hover:text-[#2E7D32]"
                        : "md:text-white text-black hover:text-[#2E7D32]"
                    }`}
                    onClick={() => handleLinkClick(link.id)}
                  >
                    {link.text}
                    {activeLink === link.id && (
                      <motion.span
                        layoutId="underline"
                        className="absolute left-0 bottom-0 w-full h-0.5 bg-[#2E7D32]"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    className={`block py-2 px-3 transition-colors duration-300 ${
                      activeLink === link.id
                        ? "text-[#2E7D32] font-semibold"
                        : scrolled
                        ? "text-black hover:text-[#2E7D32]"
                        : "md:text-white text-black hover:text-[#2E7D32]"
                    }`}
                    onClick={() => handleLinkClick(link.id)}
                  >
                    {link.text}
                    {activeLink === link.id && (
                      <motion.span
                        layoutId="underline"
                        className="absolute left-0 bottom-0 w-full h-0.5 bg-[#2E7D32]"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.nav>
  );
};

export default HomeHeader;
