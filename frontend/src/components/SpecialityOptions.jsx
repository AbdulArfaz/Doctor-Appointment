import React from 'react'
import {specialityData} from '../assets/assets'
import {Link} from 'react-router-dom'
import '../styles/SpecialityMenu.css'


const SpecialityOptions = () => {
  return (
<div id='speciality'>
      <h1>Find by Speciality</h1>
      <p className='subtitle'>
        Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
      </p>

      <div className='speciality-list'>
        {specialityData.map((item, index) => (
          <Link 
            key={index}
            to={`/doctors/${item.speciality}`}
            onClick={() => window.scrollTo(0, 0)}
            className='speciality-card'
          >
            <div className='speciality-img-wrapper'>
              <img src={item.image} alt={item.speciality} />
            </div>
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SpecialityOptions
