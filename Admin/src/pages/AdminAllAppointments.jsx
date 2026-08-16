import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { useEffect } from 'react'

const AdminAllAppointments = () => {

const { adminToken, appointments, getAllAppointments} = useContext(AdminContext)

useEffect(()=>{
if (adminToken) {
  getAllAppointments()
}
},[adminToken])

  return (
    <div>
        <p>All Appointments</p>
        <div>
          <div>
            <p>#</p>
            <p>Patient</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Doctor</p>
            <p>Fees</p>
            <p>Action</p>
          </div>

          {appointments.map((item,index)=>(
              <div key={index}>
                <p>{index + 1}</p>
                <div>
                  <img src={item.userData.image} alt='' />
                  <p>{item.userData.name}</p>
                </div>
              </div>
          ))
          }
        </div>
    </div>
  )
}

export default AdminAllAppointments
