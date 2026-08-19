import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext.jsx";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import { assets } from "../../assets_admin/assets.js";
import '../../styles/AdminAllAppointments.css'

const AdminAllAppointments = () => {
  const { adminToken, appointments, getAllAppointments, adminAppointmentCancel } =
    useContext(AdminContext);
  const { calculateAge, dateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (adminToken) {
      getAllAppointments();
    }
  }, [adminToken]);

return (
  <div className="ad-ap-container">
    <p className="ad-ap-title">All Appointments</p>

    <div className="ad-ap-card">
      <div className="ad-ap-header">
        <p>#</p>
        <p>Patient</p>
        <p>Age</p>
        <p>Date & Time</p>
        <p>Doctor</p>
        <p>Fees</p>
        <p>Action</p>
      </div>

    
      {appointments.slice().reverse().map((item, index) => (
        <div key={index} className="ad-ap-row">
          <p className="ad-ap-index">{index + 1}</p>

          <div className="ad-ap-user">
            <img className="ad-ap-img" src={item.userData.image} alt="" />
            <p className="ad-ap-name">{item.userData.name}</p>
          </div>

          <p className="ad-ap-age">{calculateAge(item.userData.dob)}</p>

          <p>
            {dateFormat(item.slotDate)}, {item.slotTime}
          </p>

          <div className="ad-ap-user">
            <img className="ad-ap-img ad-ap-doc-img" src={item.docData.image} alt="" />
            <p className="ad-ap-name">{item.docData.name}</p>
          </div>

          <p>
            {currency}{item.amount}
          </p>

          <div>
            {item.cancelled ? (
              <p className="ad-ap-cancelled">Cancelled</p>
            ) : (
              item.isCompleted ?
              <p>Completed</p> 
              :
              <img
                onClick={()=>adminAppointmentCancel(item._id)}
                className="ad-ap-cancel-btn"
                src={assets.cancel_icon}
                alt="Cancel"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);
}

export default AdminAllAppointments;
