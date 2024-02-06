import React, { useState } from 'react';
import ChordsDotZipLogo from '../assets/Pics/ChordsDotZipLogo.png';
import '../App.css';
import { handleClickScroll } from '../helper';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="bg-white p-1 fixed w-screen shadow-md z-10">
      <div className="flex items-center justify-between md:justify-normal">
        <Link to="/" className="p-4">
          <img
            src={ChordsDotZipLogo}
            className="h-16 hover:cursor-pointer object-scale-down"
          />
        </Link>
        <div className="md:hidden">
          {/* Hamburger Icon */}
          <button
            className="hover:text-green-600 focus:outline-none p-4 text-xl"
            onClick={toggleMenu}
          >
            ☰
          </button>
        </div>
        <div className={`hidden md:flex gap-6`}>
          <Link
            to="/result"
            className="hover:text-green-400"
            onClick={closeMenu}
          >
            EXTRACT CHORDS
          </Link>
          <Link
            to="/"
            className="hover:text-green-400"
            onClick={() => {
              handleClickScroll('tutorial');
              closeMenu();
            }}
          >
            HOW TO USE
          </Link>
          <Link
            to="/"
            className="hover:text-green-400"
            onClick={() => {
              handleClickScroll('contact-us');
              closeMenu();
            }}
          >
            CONTACT US
          </Link>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 ">
          <Link
            to="/result"
            className="block p-4 hover:bg-gray-100"
            onClick={closeMenu}
          >
            EXTRACT CHORDS
          </Link>
          <Link
            to="/"
            className="block p-4 hover:bg-gray-100"
            onClick={() => {
              handleClickScroll('tutorial');
              closeMenu();
            }}
          >
            HOW TO USE
          </Link>
          <Link
            to="/"
            className="block p-4 hover:bg-gray-100"
            onClick={() => {
              handleClickScroll('contact-us');
              closeMenu();
            }}
          >
            CONTACT US
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
