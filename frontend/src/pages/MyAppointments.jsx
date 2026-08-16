import React, { useContext, useEffect } from 'react'
import {AppContext} from '../context/AppContext'
import '../styles/MyAppointments.css'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyAppointments = () => {

const {backendurl, token, getDoctorsData} = useContext(AppContext)

const [appointments,setAppointments] = useState([])


const months = [" ","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
const dateFormat = (slotDate) =>{
  const dateArray = slotDate.split('_')
  return dateArray[0]+ " " + months[Number(dateArray[1])] + " " + dateArray[2]
}


const getUserAppointments = async () =>{
  try {
    const {data} = await axios.get(`${backendurl}/api/user/appointments`,
      {headers:{ Authorization: `Bearer ${token}`, token}})

    if (data.success) {
      const reverseAppointments = [...data.data].reverse()
      setAppointments(reverseAppointments)
    } else {
      toast.error(data.message)
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || error.message)
    
  }
}

const cancelAppointment = async (appointmentId) =>{
  try {
    const {data} = await axios.post(`${backendurl}/api/user/cancel-appointment`,
      {appointmentId},
      {headers:{ token}}
    )
    if (data.success) {
      toast.success(data.message)
      getUserAppointments()
      getDoctorsData()
    } else {
      toast.error(data.message)
    }
    
  } catch (error) {
      console.log("Cancel Error:",error);
    toast.error(error.response?.data?.message || error.message) 
  }
}



useEffect(()=>{
if (token) {
  getUserAppointments()
}
},[token])

  return (
     <div className="appointments">
    <h2>My Appointments</h2>
    <div className="card-list">
      {appointments.map((item, index) => (
        <div key={index} className="card">
          <img src={item.docData.image} alt="" />
          
          <div className="info">
            <h3>{item.docData.name}</h3>
            <p className="speciality">{item.docData.speciality}</p>
            <p className="address">
              <strong>Address:</strong><br />
              {item.docData.address.line1}<br />
              {item.docData.address.line2}
            </p>
            <p className="date">
              <strong>Date & Time:</strong> {dateFormat(item.slotDate)} | {item.slotTime}
            </p>
          </div>

          <div className="actions">
           {!item.cancelled && <button className="btn-primary">Pay Online</button> } 
            {!item.cancelled && <button onClick={()=>cancelAppointment(item._id)} className="btn-outline">Cancel Appointment</button> }
            {item.cancelled && <button className='btn-primary'>Appointment Cancelled</button>}
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default MyAppointments
