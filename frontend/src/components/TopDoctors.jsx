import React, { useContext } from 'react'
import '../styles/TopDoctors.css'
import {useNavigate} from 'react-router-dom'
import { AppContext } from '../context/AppContext'


const TopDoctors = () => {
   
    const navigate=useNavigate()
    const {doctors} = useContext(AppContext)


  return (
    <div className='top-doctors-container'>
      <h1 className='top-doctors-title'>Top Doctors to Book</h1>
      <p className='top-doctors-subtitle'>
        Simply browse through our extensive list of trusted doctors and schedule your visit seamlessly.
      </p>

      <div className='doctors-grid'>
        {doctors.slice(0, 10).map((item, index) => (
          <div 
            key={index} 
            onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0); }} 
            className='doctor-card'
          >
            <div className='doctor-img-container'>
              <img src={item.image} alt={item.name} />
            </div>
            
            <div className='doctor-info'>
              <div className='status-container'>
                <span className={`status-dot ${item.available ? '' :'not-available'} `}></span>
                <span className={item.available ? '' : 'text-not-available'}>
                  {item.available ? 'Available' : 'Not available'}
                </span>
               
              </div>
              <p className='doctor-name'>{item.name}</p>
              <p className='doctor-speciality'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={() => { navigate('/doctors'); window.scrollTo(0, 0); }} 
        className='more-btn'
      >
        more
      </button>
    </div>
  )
}

export default TopDoctors
