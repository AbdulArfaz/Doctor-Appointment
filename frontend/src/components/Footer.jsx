import React from 'react'
import { assets } from '../assets/assets'
import '../styles/Footer.css'

const Footer = () => {
  return (
      <div className='footer' id='footer'>
      <div className='footer-content'>
        
       
        <div className='footer-content-left'>
          <img src={assets.docslot} alt="logo" className='footer-logo' />
          <p>
            At DocSlot, we believe accessing quality healthcare should be straightforward and stress-free. Book routine checkups , specialist consultations, and follow-ups with trusted doctors in just a few click. 
          </p>
        </div>

       
        <div className='footer-content-center'>
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className='footer-content-right'>
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91-872-400-1944</li>
            <li>abdularfaz00@gmail.com</li>
          </ul>
        </div>

      </div>

      <hr />
      <p className='footer-copyright'>
        Copyright 2026 @ DocSlot - All Rights Reserved.
      </p>
    </div>
  )
}
 

export default Footer
