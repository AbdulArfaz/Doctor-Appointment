import React, { useContext } from 'react'
import {AppContext} from '../context/AppContext'
import '../styles/MyAppointments.css'

const MyAppointments = () => {

const {doctors} = useContext(AppContext)

  return (
     <div className="appointments">
    <h2>My Appointments</h2>
    <div className="card-list">
      {doctors.slice(0, 2).map((item, index) => (
        <div key={index} className="card">
          <img src={item.image} alt={item.name} />
          
          <div className="info">
            <h3>{item.name}</h3>
            <p className="speciality">{item.speciality}</p>
            <p className="address">
              <strong>Address:</strong><br />
              {item.address.line1}<br />
              {item.address.line2}
            </p>
            <p className="date">
              <strong>Date & Time:</strong> 27 July, 2026 | 7:30 PM
            </p>
          </div>

          <div className="actions">
            <button className="btn-primary">Pay Online</button>
            <button className="btn-outline">Cancel Appointment</button>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default MyAppointments
