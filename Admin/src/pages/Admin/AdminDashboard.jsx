import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext.jsx";
import { useEffect } from "react";
import { assets } from "../../assets_admin/assets.js";
import "../../styles/Dashboard.css";
import { AppContext } from "../../context/AppContext.jsx";

const Dashboard = () => {
  const { dashData, adminToken, getDashData, adminAppointmentCancel } =
    useContext(AdminContext);

  const { dateFormat } = useContext(AppContext)  

  useEffect(() => {
    if (adminToken) {
      getDashData();
    }
  }, [adminToken]);

  if (!dashData) {
    return <p>Loading ...</p>;
  }

  return (
  dashData && (
    <div className="da-container">
      <div className="da-grid">
        <div className="da-card da-doc">
          <div className="da-icon">
            <img src={assets.doctor_icon} alt="Doctors" />
          </div>
          <div>
            <p className="da-num">{dashData.doctors}</p>
            <p className="da-lbl">Doctors</p>
          </div>
        </div>

        <div className="da-card da-app">
          <div className="da-icon">
            <img src={assets.appointments_icon} alt="Appointments" />
          </div>
          <div>
            <p className="da-num">{dashData.appointments}</p>
            <p className="da-lbl">Appointments</p>
          </div>
        </div>

      
        <div className="da-card da-pat">
          <div className="da-icon">
            <img src={assets.patients_icon} alt="Patients" />
          </div>
          <div>
            <p className="da-num">{dashData.patients}</p>
            <p className="da-lbl">Patients</p>
          </div>
        </div>
      </div>

      
      <div className="da-list-box">
        <div className="da-list-hdr">
          <img src={assets.list_icon} alt="" />
          <p>Latest Booking</p>
        </div>

        <div className="da-list-body">
          {dashData.latestAppointments.map((item, index) => (
            <div className="da-item" key={index}>
              <img className="da-doc-img" src={item.docData.image} alt="" />
              <div className="da-item-info">
                <p className="da-item-name">{item.docData.name}</p>
                <p className="da-item-date">{dateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled ? (
                <p className="da-status-cancel">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="da-green">Completed</p> 
                )  :  (
                <img
                  className="da-cancel-icon"
                  onClick={() => adminAppointmentCancel(item._id)}
                  src={assets.cancel_icon}
                  alt="Cancel"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
);
}
export default Dashboard;
