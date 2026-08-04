import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import '../styles/Appointment.css'

const Appointment = () => {
  const { drId } = useParams();
  const { doctors } = useContext(AppContext);
  const [drInfo, setDrInfo] = useState(null);

  const getDocInfo = () => {
    const docInfo = doctors.find((doc) => doc.id === drId);
    setDrInfo(docInfo);
  };

  useEffect(() => {
    getDocInfo();
  }, [doctors, drId]);
  return (
     <div className="app-container">
      <div className="dr-card">
        
       
        <div className="dr-image-wrapper">
          <img src={drInfo?.image} alt={drInfo?.name} className="dr-image" />
        </div>

        
        <div className="dr-details">
          
          <div className="dr-header">
            <h2 className="dr-name">{drInfo?.name}</h2>
            {assets?.verified_icon && (
              <img src={assets.verified_icon} alt="verified" className="icon-verified" />
            )}
          </div>

          <div className="dr-meta">
            <span className="dr-degree">{drInfo?.degree} - {drInfo?.speciality}</span>
            <span className="badge-experience">{drInfo?.experience}</span>
          </div>

          <div className="dr-about-box">
            <p className="about-title">
              About 
              {assets?.info_icon && (
                <img src={assets.info_icon} alt="info" className="icon-info" />
              )}
            </p>
            <p className="about-description">{drInfo?.about}</p>
          </div>
          <p className="fee-text">
              Appointment Fee: <span className="fee-amount">{drInfo?.fees}</span>
          </p>
        

        </div>

      </div>
    </div>
  );
};

export default Appointment;
