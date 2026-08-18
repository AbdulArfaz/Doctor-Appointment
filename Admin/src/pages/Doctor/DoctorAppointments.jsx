import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets_admin/assets.js";
import "../../styles/DoctorAppointments.css";

const DoctorAppointments = () => {
  const {
    docToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  const { calculateAge, dateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (docToken) {
      getAppointments();
    }
  }, [docToken]);

  return (
    <div className="doc-ap-container">
      <p className="doc-ap-title">All Appointments</p>

      <div className="doc-ap-table">
        <div className="doc-ap-header">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p className="doc-ap-text-center">Action</p>
        </div>

        {appointments.map((item, index) => (
          <div className="doc-ap-row" key={index}>
            <p className="doc-ap-index">{index + 1}</p>

            <div className="doc-ap-patient">
              <img
                className="doc-ap-avatar"
                src={item.userData.image}
                alt="Patient"
              />
              <p className="doc-ap-patient-name">{item.userData.name}</p>
            </div>

            <div>
              <span
                className={`doc-ap-badge ${item.payment ? "online" : "Cash"}`}
              >
                {item.payment ? "Online" : "Cash"}
              </span>
            </div>

            <p>{calculateAge(item.userData.dob)}</p>

            <p>
              {dateFormat(item.slotDate)}, {item.slotTime}
            </p>

            <p className="doc-ap-amount">
              {currency}
              {item.amount}
            </p>

            {item.cancelled ? (
              <p className="status-text status-cancelled">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="status-text status-completed">Completed</p>
            ) : (
              <div className="doc-ap-actions">
                <button
                  className="doc-ap-btn doc-ap-cancel-btn"
                  aria-label="Cancel"
                  onClick={() => cancelAppointment(item._id)}
                >
                  <img src={assets.cancel_icon} alt="cancel" />
                </button>
                <button
                  className="doc-ap-btn doc-ap-tick-btn"
                  aria-label="Confirm"
                  onClick={() => completeAppointment(item._id)}
                >
                  <img src={assets.tick_icon} alt="tick" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;
