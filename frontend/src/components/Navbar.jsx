import React, { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/pnglogo.jpg";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [showMenu,setShowMenu]=useState(false)
  const [token,setToken]=useState(true)

  return (
    <>
       <div className="topnavbar">
        <div className="topnavbar-container">
          <div className="topnavbar-phone">
            <i className="fa-solid fa-phone"></i>
            <a href="tel:918724001944">918724001944</a>
            <span className="topnavbar-divider">|</span>
            <a href="tel:919706131039">919706131039</a>
          </div>

        </div>

       </div>

    <nav className="navbar">
      <Link to="/" className="logo" >
        <img  src={logo} alt="logo" />
        <span className="doc-red">Doc</span>
        <span className="slot-black">Slot</span>
      </Link>

      <ul className="nav-links">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/doctors"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            DOCTORS
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            ABOUT
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            CONTACT
          </NavLink>
        </li>
      </ul>

     <div className="nav-action">
  {token ? (
    
    <div className="profile-container">

     
      <div className="profile-header">
        <img 
          src={assets.profile_pic} 
          alt="profile-pic" 
          className="profile-pic" 
        />
        <img 
          src={assets.dropdown_icon} 
          alt="dropdown" 
          className="dropdown-icon" 
        />
      </div>

      
      <div className="dropdown-menu">
        <p onClick={() => navigate('/my-profile')}>My Profile</p>
        <p onClick={() => navigate('/my-appointments')}>My Appointments</p>
        <p onClick={()=>setToken(false)}>Logout</p>
      </div>

    </div>
  ) : (
    <button onClick={() => navigate('/login')} className="btn-primary">
      Create Account
    </button>
  )}
</div>
    </nav>
    </>
  );
};

export default Navbar;
