import React, { useContext, useState } from "react";
import { assets } from "../../assets_admin/assets.js";
import { AdminContext } from "../../context/AdminContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import "../../styles/AdminLogin.css";
import { DoctorContext } from "../../context/DoctorContext.jsx";


const AdminLogin = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 

  const { setAdminToken, backendurl } = useContext(AdminContext);
  const { setDocToken, setProfileData } = useContext(DoctorContext);

  const submitHandler = async (evt) => {
    evt.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendurl + "/api/admin/login", {
          email,
          password,
        });

        if (data.success) {
          const token = data.data.accessToken;
          setAdminToken(token);
          localStorage.setItem("accessToken", token);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendurl}/api/doctors/login`, {
          email,
          password,
        });
        if (data.success) {
          const token = data.data.accessToken;
          setProfileData(null)
          setDocToken(token);
          localStorage.setItem("docToken", token);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={submitHandler} className="ad-container">
      <div className="ad-box">
        <p className="ad-title">
          <span>{state}</span> Login
        </p>

        <div className="ad-field">
          <p className="ad-label">Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            required
            className="ad-input"
          />
        </div>

        <div className="ad-field">
          <p className="ad-label">Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            required
            className="ad-input"
          />
        </div>

        <button type="submit" className="ad-btn">
          Login
        </button>

        {state === "Admin" ? (
          <p className="ad-text">
            Doctor Login?{" "}
            <span className="ad-link" onClick={() => setState("Doctor")}>
              Click here
            </span>
          </p>
        ) : (
          <p className="ad-text">
            Admin Login?{" "}
            <span className="ad-link" onClick={() => setState("Admin")}>
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default AdminLogin;
