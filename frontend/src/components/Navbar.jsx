import React, { useState } from 'react'
import {
  Menu,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-[#151515]/90 backdrop-blur-md border-b border-gray-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-xl">
              /:\
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              P D More
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/courses"
              className={`text-sm font-medium transition-colors ${isActive('/courses') ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}
            >
              Courses
            </Link>
            <Link
              to="/blogs"
              className={`text-sm font-medium transition-colors ${isActive('/blogs') ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}
            >
              Blogs
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors ${isActive('/contact') ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}
            >
              Contact
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors ${isActive('/about') ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}
            >
              About
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1a1a1a] border-b border-gray-800">
          <div className="px-4 pt-2 pb-6 space-y-4">
            <Link
              to="/courses"
              className="block py-2 text-base font-medium text-gray-300 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Courses
            </Link>
            <Link
              to="/blogs"
              className="block py-2 text-base font-medium text-gray-300 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blogs
            </Link>
            <Link
              to="/contact"
              className="block py-2 text-base font-medium text-gray-300 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/about"
              className="block py-2 text-base font-medium text-gray-300 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg text-base font-semibold">
              Student Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar

