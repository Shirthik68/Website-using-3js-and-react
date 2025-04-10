import React, { useState } from "react";
import { navLinks } from "../utils/Constants";
import "../index.css";

const NavItems = ({ isMobile = false }) => {
    return (
      <ul className={`nav-ul ${isMobile ? "flex flex-col sm:flex-row gap-6 sm:gap-10 items-start text-left pl-4" : "items-center text-center"}`}>
        {navLinks.map(({ id, href, name }) => (
          <li key={id} className="nav-li hover:nav-li-hover">
            <a href={href} className="nav-li_a">
              {name}
            </a>
          </li>
        ))}
      </ul>
    );
  };

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-5 mx-auto c-space">
          <a
            href="/"
            className="text-neutral-400 font-bold text-xl hover:text-white transition-colors"
          >
            Shirthik
          </a>

          <button
            onClick={toggleMenu}
            className="text-neutral-400 hover:text-white focus:outline-none sm:hidden flex"
            aria-label="Toggle menu"
          >
            <img
              src={isOpen ? "/assets/close.svg" : "/assets/menu.svg"}
              alt="toggle"
              className="w-6 h-6"
            />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden sm:flex gap-10">
            <NavItems />
          </nav>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`nav-sidebar sm:hidden ${isOpen ? "nav-sidebar-open" : ""}`}>
        <nav className="p-5 flex flex-col gap-6 animate-fadeIn">
          <NavItems isMobile />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
