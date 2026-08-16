import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import '../styles/Appointment.css'
import RelatedDoctors from "../components/RelatedDoctors";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import axios from "axios";


const Appointment = () => {
  const { drId } = useParams();
  const { doctors,currencySymbol, backendurl, token, getDoctorsData } = useContext(AppContext);
  const [drInfo, setDrInfo] = useState(null);
  const navigate = useNavigate()
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const daysOfWeek = [ 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const getDocInfo = () => {
  
    if(!doctors || doctors.length === 0) return;
    const cleanDrId = String(drId).replace(':', '').trim();
    const foundDoctor = doctors.find(
      (doc) => String(doc._id) === cleanDrId || String(doc._id) === cleanDrId
    );
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

  let day = currentDate.getDate()
  let month = currentDate.getMonth() + 1
  let year = currentDate.getFullYear()

  const slotDate = `${day}_${month}_${year}`;
  const slotTime = formattedTime;


  const bookedSlots = drInfo?.slots_booked?.[slotDate] || []

  const isBooked = bookedSlots.some(
    (time) => time.toLowerCase().trim() === slotTime.toLowerCase().trim()
  )
  if (!isBooked) {
    timeSlots.push({
        datetime: new Date(currentDate),
        time: formattedTime,
      });
  }

      
      currentDate.setMinutes(currentDate.getMinutes() + 60);
    }
    setDocSlots((prev) => [...prev, timeSlots]);
  }
};


const bookAppointment = async () =>{
 
  if (!token) {
    toast.warn('Login to book Appointment')
    return navigate('/login')
  }
  if (!slotTime) {
    return toast.warn('Please select a time slot first')
  }
  try { 
        if (!docSlots || !docSlots[slotIndex] || !docSlots[slotIndex][0]) {
          return toast.error('Selected slot is invalid or unavailable')
        }


    const date = docSlots[slotIndex][0].datetime

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    const slotDate = `${day}_${month}_${year}`;

  const { data } = await axios.post(`${backendurl}/api/user/book-appointment`,
    {docId: drInfo._id, slotDate, slotTime},
    {headers: {Authorization: `Bearer ${token}`}}
  )
  if (data.success) {
    toast.success(data.message)
    getDoctorsData()
    navigate('/my-appointments')
  }else{
    toast.error(data.message)
  }
  } catch (error) {
    toast.error('Selected slot is not available')
    
  }
}

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

  <button onClick={bookAppointment} className="book-button">
    Book an appointment
  </button>
</div>

<RelatedDoctors drId={drId} speciality={drInfo?.speciality}/>
    </div>
  );
};

export default Appointment;
