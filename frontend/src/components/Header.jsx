import React from 'react'
import {assets} from '../assets/assets'
import logo from "../assets/groupDoctors.png";
import '../styles/Header.css'


const Header = () => {
  return (
    <div className="header-container">
   
      <div className="header-left">
        <div>
          <h1 className='hero-title'>
            Find a <span className='highlight'>Doctor</span> And <br></br>
            Book An <span className='highlight'>Appointment</span>
          </h1>
        </div>
        <div>
          <p className='hero-subtitle'>
            A Healthier Tommorrow Starts Today. Schedule Your Appointment <br></br>
            Your Wellness, Our Expertise: Set Up Your Appointment Today.
          </p>
        </div>
        <div>
          <a href='#speciality' className='appointment-btn'>Book An Appointment</a>
        </div>
      </div>

      
      <div className="header-right">
        <img src={logo} alt='doctors-group' className='doctors-img' />
      </div>
    </div>
  )
}


export default Header
