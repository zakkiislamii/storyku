import React from "react";
import { NavLink } from "react-router-dom";
import { X } from "lucide-react";

const Navbar = ({ isOpen, toggleNavbar }) => {
  return (
    <nav
      className={`fixed top-0 left-0 h-screen bg-white shadow-xl border-r border-gray-200 z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } w-60`}
    >
      <div className="p-8">
        <div className="text-[#34a1b3] font-bold text-2xl text-center">
          STORYKU
        </div>
        <button
          onClick={toggleNavbar}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 lg:hidden"
        >
          <X size={24} />
        </button>
      </div>
      <ul className="space-y-4">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex justify-center items-center font-bold w-full px-4 py-3 text-gray-700 hover:bg-[#21bad5] transition-colors ${
                isActive ? "active" : ""
              }`
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/stories"
            className={({ isActive }) =>
              `flex justify-center items-center font-bold w-full px-4 py-3 text-gray-700 hover:bg-[#21bad5] transition-colors ${
                isActive ? "active" : ""
              }`
            }
          >
            Story Management
          </NavLink>
        </li>
      </ul>
      <style>
        {`
          .active {
            background-color: #21bad5;
            color: white;
          }
          .rotate-180 {
            transform: rotate(180deg);
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;
