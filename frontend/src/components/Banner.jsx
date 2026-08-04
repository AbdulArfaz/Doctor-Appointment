import React from 'react'
import { assets } from '../assets/assets'
import '../styles/Banner.css'
import {useNavigate} from 'react-router-dom'

const Banner = () => {
    const navigate = useNavigate()
  return (
    <div>
      <section className="banner">
      <div className="banner-container">
        
     
        <div className="banner-content">
          <h1 className="banner-title">Book an Appointment</h1>
          <button 
            type="button" 
            className="banner-btn"
            onClick={() => {navigate('/login'); scrollTo(0,0)}}
          >
            Create Account
          </button>
        </div>

      
        <div className="banner-image-wrapper">
          <img 
            src={assets.banner}
            alt="Appointment booking illustration" 
            className="banner-image"
          />
        </div>

      </div>
    </section>
    </div>
  )
}

export default Banner
