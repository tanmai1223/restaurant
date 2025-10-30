import React from "react";
import { NavLink } from "react-router-dom";
import { FaChair } from "react-icons/fa6";
import { BsGrid1X2Fill } from "react-icons/bs";
import { LuNotebook } from "react-icons/lu";
import { IoBarChart } from "react-icons/io5";
import "../Style/sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
       <div className="logo">
        <img src="logo.jpg" alt="logo" />
       </div>
      <ul className="sidebar-menu">
        <li className="menu-item">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
            <BsGrid1X2Fill className="icon" />
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink to="/table" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaChair  className="icon" />
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink to="/order" className={({ isActive }) => (isActive ? "active" : "")}>
            <LuNotebook className="icon" />
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink to="/product" className={({ isActive }) => (isActive ? "active" : "")}>
            <IoBarChart className="icon" />
          </NavLink>
        </li>
        
      </ul>
    </div>
  );
}

export default Sidebar;
