import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import '../styles/Appointment.css'
import RelatedDoctors from "../components/RelatedDoctors";


const Appointment = () => {
  const { drId } = useParams();
  const { doctors,currencySymbol } = useContext(AppContext);
  const [drInfo, setDrInfo] = useState(null);

  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const daysOfWeek = [ 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const getDocInfo = () => {
  
    if(!doctors || doctors.length === 0) return;
    const cleanDrId = String(drId).replace(':', '').trim()
    const foundDoctor = doctors.find(
      (doc) => String(doc._id) === cleanDrId || String(doc._id) === cleanDrId
    )

      console.error("URL Id:", cleanDrId, "|Found Doctor:",foundDoctor);

      if (foundDoctor) {
        setDrInfo(foundDoctor)
      }
    
  };


  const getAvailableSlots = async () => {
  setDocSlots([]);
  let today = new Date();

  for (let i = 0; i < 7; i++) {
    let currentDate = new Date(today);
    currentDate.setDate(today.getDate() + i);

    if(currentDate.getDay()===0){
      continue;
    }

    let endTime = new Date(today);
    endTime.setDate(today.getDate() + i);
    endTime.setHours(21, 0, 0, 0);

    
    if (today.getDate() === currentDate.getDate()) {
      currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
     currentDate.setMinutes(0)
    } else {
      currentDate.setHours(10);
      currentDate.setMinutes(0);
    }

    let timeSlots = [];
    while (currentDate < endTime) {
      let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      timeSlots.push({
        datetime: new Date(currentDate),
        time: formattedTime,
      });
      currentDate.setMinutes(currentDate.getMinutes() + 60);
    }
    setDocSlots((prev) => [...prev, timeSlots]);
  }
};

useEffect(() => {
  if (drInfo) {
    getAvailableSlots();
  }
}, [drInfo]);


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
              Appointment Fee: <span className="fee-amount">{currencySymbol}-{drInfo?.fees}</span>
          </p>
        </div>
      </div>


       <div className="booking-section">
  <p className="slots-title">Booking slots</p>

  
  <div className="days-container">
    {docSlots.length > 0 &&
      docSlots.map((item, index) => (
        <div
          key={index}
          onClick={() => setSlotIndex(index)}
          className={`day-slot ${slotIndex === index ? 'selected' : ''}`}
        >
          <p className="day-name">
            {item[0] && daysOfWeek[item[0]?.datetime?.getDay()]}
            </p>
            <p className="day-date">
            {item[0] && item[0]?.datetime?.getDate()}
            </p>
        </div>
      ))}
  </div>

 
  <div className="times-container">
    {docSlots.length > 0 &&
      docSlots[slotIndex]?.map((item, index) => (
        <p
          key={index}
          onClick={() => setSlotTime(item.time)}
          className={`time-slot ${item.time === slotTime ? 'selected' : ''}`}
        >
          {item.time.toLowerCase()}
        </p>
      ))}
  </div>

  <button className="book-button">
    Book an appointment
  </button>
</div>

<RelatedDoctors drId={drId} speciality={drInfo?.speciality}/>
    </div>
  );
};

export default Appointment;
