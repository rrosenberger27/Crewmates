import React from "react";
import { NavLink } from "react-router";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          Crewmate Creator
        </NavLink>
        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                "nav-links" + (isActive ? " active" : "")
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/create"
              className={({ isActive }) =>
                "nav-links" + (isActive ? " active" : "")
              }
            >
              Create Crewmate
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/gallery"
              className={({ isActive }) =>
                "nav-links" + (isActive ? " active" : "")
              }
            >
              Gallery
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
