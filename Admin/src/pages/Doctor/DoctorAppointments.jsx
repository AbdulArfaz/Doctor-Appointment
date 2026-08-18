import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react'

const DoctorAppointments = () => {

const { docToken, appointments, getAppointments} = useContext(DoctorContext)

useEffect(()=>{
if (docToken) {
  getAppointments()
}
},[docToken])

  return (
    <div>
      <p>All Appointments</p>
      <div>
            <p>#</p>
            <p>Patient</p>
            <p>Payment</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Fees</p>
            <p>Action</p>
          </div>

          { appointments.map((item,index)=>(
              <div key={index}>
                   <p>{index + 1}</p>
              <img src={item.userData.image} alt='' />
              <p>{item.userData.name}</p>
              <div>
                <p>
                  {item.payment ? 'Online' : 'Cash'}
                </p>
              </div>
              <p></p>
              </div>
            ))
          }
     </div>
  )}
     
 
export default DoctorAppointments
