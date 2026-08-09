import React, { useContext } from "react";
import { assets } from "../assets_admin/assets";
import { AdminContext } from "../context/AdminContext";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Admin.Navbar.css";

const Navbar = () => {
  const { adminToken, setAdminToken } = useContext(AdminContext);

  const navigate = useNavigate();

  const logout = () => {
     localStorage.removeItem("accessToken");
     setAdminToken("");
     navigate("/");
  };

  return (
    <div className='admin-navbar'>
      {/* --- Main Header Top --- */}
      <div className='admin-navbar-header'>
        <div className='logo-section'>
          {/* logo is expected to be a light color variant to pop on the dark background */}
          <img className='admin-logo' src={assets.docslot} alt="Logo" />
          <span className='role-badge'>
            {adminToken ? 'Admin' : 'Doctor'}
          </span>
          <h2 className='dashboard-title'>Dashboard</h2>
        </div>
        
        <button className='logout-btn' onClick={logout}>
          Log Out
        </button>
      </div>

      {/* --- Bottom Navigation Area --- */}
      <div className='admin-navbar-links'>

        <NavLink className='nav-capsule' to='/admin-dashboard'>
        <img src={assets.home_icon} alt="home-icon" />
         <span>Dashboard</span>
        </NavLink>

        
        <NavLink className='nav-capsule' to='/admin-addDoctor'>
        <img src={assets.add_icon}  alt="add-icon" />
          <span>Add Doctor</span>
        </NavLink>

        
        <NavLink className='nav-capsule' to='/admin-allAppointments'>
        <img src={assets.appointment_icon} alt="appointment-icon" />
          <span>All Appointments</span>
        </NavLink>

        
        <NavLink className='nav-capsule' to='/admin-doctorList'>
        <img src={assets.people_icon} alt="doctorlist-icon" />
          <span>Doctor List</span>
        </NavLink>
      </div>
    </div>
  )
}

export default Navbar;
