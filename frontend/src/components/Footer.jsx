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
          <h2>QUICK LINKS</h2>
          <ul>
          <li>
              Home</li>
            <li>About Us</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className='footer-content-right'>
  <h2>CONTACT INFO</h2>
  <ul>
    <li>
      <a href='tel:+918724001944' className='clickable-link contact-item'>
        <i className="fa-solid fa-phone contact-icon"></i>
        <span>+91-872-400-1944</span>
      </a>
    </li>

    <li>
      <a href='tel:+919706131039' className='clickable-link contact-item'>
        <i className="fa-solid fa-phone contact-icon"></i>
        <span>+91-970-613-1039</span>
      </a>
    </li>

    <li>
      <a href='mailto:abdularfaz00@gmail.com' className='clickable-link contact-item'>
        <i className="fa-solid fa-envelope contact-icon"></i>
        <span>reachdocslot@gmail.com</span>
      </a>
    </li>

    <li className='contact-item address-spacing'>
      <i className="fa-solid fa-location-dot contact-icon"></i>
      <span>Cotton College Road, Panbazar, near BSNL Office</span>
    </li>

    <li className='contact-item timing-spacing'>
      <i className="fa-solid fa-clock contact-icon"></i>
      <div>
        <span>Monday to Saturday</span><br />
        <span>10:00 AM to 8:00 PM</span>
      </div>
    </li>
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
