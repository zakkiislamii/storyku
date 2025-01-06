import React from "react";
import { Home, BookOpen } from "lucide-react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-60 min-h-screen shadow-xl lg:block hidden shadow-gray-500 bg-white border justify-center items-center border-r border-gray-200 ">
      <div className="p-8">
        <div className="text-[#34a1b3] font-bold text-2xl text-center">
          STORYKU
        </div>
      </div>
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
      <ul className="space-y-4">
        <li>
          <NavLink
            to={"/"}
            activeClassName="active"
            className="flex justify-center items-center font-bold w-full px-4 py-3 text-gray-700 hover:bg-[#21bad5] transition-colors"
          >
            <h1>Dashboard</h1>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/stories"}
            activeClassName="active"
            className="flex justify-center items-center text-center px-4 font-bold w-full py-3 text-gray-700 hover:bg-[#21bad5] transition-colors"
          >
            <h1>Story Management</h1>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
