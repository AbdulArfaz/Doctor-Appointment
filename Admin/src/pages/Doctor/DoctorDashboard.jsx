import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { assets } from "../../assets_admin/assets.js";
import { AppContext } from "../../context/AppContext";
import "../../styles/DoctorDashboard.css";

const DoctorDashboard = () => {
  const {
    dashData,
    setDashData,
    getDashData,
    docToken,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  const { currency, dateFormat } = useContext(AppContext);

  useEffect(() => {
    if (docToken) {
      getDashData();
    }
  }, [docToken]);

  return (
    dashData && (
      <div className="dash-doc-container">
        <div className="dash-doc-grid">
          <div className="dash-doc-card dash-doc-card-earning">
            <div className="dash-doc-icon">
              <img src={assets.earning_icon} alt="Doctors" />
            </div>
            <div>
              <p className="dash-doc-num">
                {currency}
                {dashData.earnings}
              </p>
              <p className="dash-doc-lbl">Earning</p>
            </div>
          </div>

          <div className="dash-doc-card dash-doc-card-app">
            <div className="dash-doc-icon">
              <img src={assets.appointments_icon} alt="Appointments" />
            </div>
            <div>
              <p className="dash-doc-num">{dashData.appointments}</p>
              <p className="dash-doc-lbl">Appointments</p>
            </div>
          </div>

          <div className="dash-doc-card dash-doc-card-pat">
            <div className="dash-doc-icon">
              <img src={assets.patients_icon} alt="Patients" />
            </div>
            <div>
              <p className="dash-doc-num">{dashData.patients}</p>
              <p className="dash-doc-lbl">Patients</p>
            </div>
          </div>
        </div>

        <div className="dash-doc-list-box">
          <div className="dash-doc-list-hdr">
            <img src={assets.list_icon} alt="" />
            <p>Latest Booking</p>
          </div>

          <div className="dash-doc-list-body">
            {dashData.latestAppointments.map((item, index) => (
              <div className="dash-doc-item" key={index}>
                <img
                  className="dash-doc-user-img"
                  src={item.userData.image}
                  alt=""
                />
                <div className="dash-doc-item-info">
                  <p className="dash-doc-item-name">{item.userData.name}</p>
                  <p className="dash-doc-item-date">
                    {dateFormat(item.slotDate)}
                  </p>
                </div>

                {item.cancelled ? (
                  <p className="dash-doc-status-text dash-doc-status-cancelled">
                    Cancelled
                  </p>
                ) : item.isCompleted ? (
                  <p className="dash-doc-status-text dash-doc-status-completed">
                    Completed
                  </p>
                ) : (
                  <div className="dash-doc-ap-actions">
                    <button
                      className="dash-doc-ap-btn dash-doc-ap-cancel-btn"
                      aria-label="Cancel"
                      onClick={() => cancelAppointment(item._id)}
                    >
                      <img src={assets.cancel_icon} alt="cancel" />
                    </button>
                    <button
                      className="dash-doc-ap-btn dash-doc-ap-tick-btn"
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
      </div>
    )
  );
};

export default DoctorDashboard;
