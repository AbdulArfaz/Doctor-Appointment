import React, { useContext } from "react";
import { assets } from "../assets_admin/assets";
import { AdminContext } from "../context/AdminContext";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Admin.Navbar.css";
import { DoctorContext } from "../context/DoctorContext";

const Navbar = () => {
  const { adminToken, setAdminToken } = useContext(AdminContext);
  const { docToken, setDocToken } = useContext(DoctorContext);

  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    if (adminToken) {
      setAdminToken("");
      localStorage.removeItem("accessToken");
    }
    if (docToken) {
      setDocToken("");
      localStorage.removeItem("docToken");
    }
  };

  return (
    <div className="admin-navbar">
      <div className="admin-navbar-header">
        <div className="logo-section">
          <img className="admin-logo" src={assets.docslot} alt="Logo" />
          <span className="role-badge">{adminToken ? "Admin" : "Doctor"}</span>
          <h2 className="dashboard-title">Dashboard</h2>
        </div>

        <button className="logout-btn" onClick={logout}>
          Log Out
        </button>
      </div>

      <div className="admin-navbar-links">
        {adminToken && (
          <>
            <NavLink className="nav-capsule" to="/admin-dashboard">
              <img src={assets.home_icon} alt="home-icon" />
              <span>Dashboard</span>
            </NavLink>

            <NavLink className="nav-capsule" to="/admin-addDoctor">
              <img src={assets.add_icon} alt="add-icon" />
              <span>Add Doctor</span>
            </NavLink>

            <NavLink className="nav-capsule" to="/admin-allAppointments">
              <img src={assets.appointment_icon} alt="appointment-icon" />
              <span>All Appointments</span>
            </NavLink>

            <NavLink className="nav-capsule" to="/admin-doctorList">
              <img src={assets.people_icon} alt="doctorlist-icon" />
              <span>Doctor List</span>
            </NavLink>
          </>
        )}

        {docToken && (
          <>
            <NavLink className="nav-capsule" to="/doctor-dashboard">
              <img src={assets.home_icon} alt="home-icon" />
              <span>Dashboard</span>
            </NavLink>
            <NavLink className="nav-capsule" to="/doctor-appointments">
              <img src={assets.appointment_icon} alt="appointment-icon" />
              <span>Appointments</span>
            </NavLink>
            <NavLink className="nav-capsule" to="/doctor-profile">
              <img src={assets.people_icon} alt="profile-icon" />
              <span>Profile</span>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
