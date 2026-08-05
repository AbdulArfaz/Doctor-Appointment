import React from 'react'
import {assets} from '../assets/assets'
import '../styles/Contact.css'

const Contact = () => {
  return (
    <>
   <div className="contacts-wrapper">
   
      <div className="contactimg-container">
        <img src={assets.contactUs} alt="Contact Us" className="contact-photo" />
      </div>

      
      <div className="contacts-card">
        <h2>Get In Touch</h2>

        <div className="information-group">
          <div className="label">Address</div>
          <div className="title">DocSlot Multispeciality Clinic</div>
          <div className="detailsInfo">
             Pan Bazar, ARB Road,near BSNL Office, Guwahati, Assam - 781001
          </div>
        </div>

        <div className="information-group">
          <div className="label">For Home Collection & Appointment</div>
          <div className="detailsInfo">
            <a href="tel:9287988031" className="contacts-link">8724001944</a> &nbsp;|&nbsp;
            <a href="tel:9287988032" className="contacts-link">9706131039</a>
          </div>
        </div>

        <div className="information-group">
          <div className="label">Email</div>
          <div className="detailsInfo">
            <a href="mailto:info@docslotguwahati.in" className="contacts-link">info@docslotguwahati.in</a>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default Contact
