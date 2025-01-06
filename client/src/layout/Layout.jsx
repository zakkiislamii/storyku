import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import { ToggleButton } from "./utils/ToggleButton";
import { useWindowResize } from "./utils/useWindowResize";

const Layout = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(true);
  const handleNavbarToggle = () => setIsNavbarOpen((prev) => !prev);
  useWindowResize(() => {
    if (window.innerWidth >= 1024) {
      setIsNavbarOpen(true);
    }
  });

  return (
    <div className="relative">
      <Navbar isOpen={isNavbarOpen} toggleNavbar={handleNavbarToggle} />
      <main
        className={`transition-all duration-300 ${
          isNavbarOpen ? "lg:ml-60" : "lg:ml-0"
        } p-4`}
      >
        {!isNavbarOpen && <ToggleButton onClick={handleNavbarToggle} />}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
