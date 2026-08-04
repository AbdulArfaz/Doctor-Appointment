import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { Link } from 'react-router-dom'
import '../styles/Doctor.css'

const Doctors = () => {

  const { speciality }=useParams()
  const[filter,setFilter]=useState([])
  const navigate=useNavigate()

  const {doctors} = useContext(AppContext)

  const settingFilter = () =>{
    if (speciality) {
      setFilter(doctors.filter(doc => doc.speciality === speciality))
    }else{
      setFilter(doctors)
    }
  }

  useEffect(()=>{
   settingFilter()
  },[doctors, speciality])

  return (
      <div className="doctors-container">
      <p className="subtitle">Browse through the doctors specialists</p>

      <div className="doctors-layout">
       
        <div className="specialities-sidebar">
          {[
            'Gynecologist',
            'Dermatologist',
            'Pediatricians',
            'Neurologist',
            'General physician',
            'Gastroenterologist'
          ].map((item) => (
            <Link
              key={item}
              to={speciality === item ? '/doctors' : `/doctors/${item}`}
              className={`speciality-pill ${
                speciality === item ? 'active' : ''
              }`}
            >
              {item}
            </Link>
          ))}
        </div>

      
        <div className="doctors-grid">
          {filter.map((item, index) => (
            <Link
              key={index}
              to={`/appointment/${item._id}`}
              onClick={() => window.scrollTo(0, 0)}
              className="doctor-card"
            >
              <div className="card-image-box">
                <img src={item.image} alt={item.name} />
              </div>

              <div className="card-info">
                <div className="status-indicator">
                  <span className="ping-dot"></span>
                  <span>Available</span>
                </div>
                <h3 className="doctor-name">{item.name}</h3>
                <p className="doctor-speciality">{item.speciality}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Doctors
