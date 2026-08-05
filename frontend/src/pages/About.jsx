import React from 'react'
import { assets } from '../assets/assets'
import '../styles/About.css'

const About = () => {
  return (
       <div className="sw-page">
     
      <section className="sw-about-">
        <div className="sw-about-text">
          <p className="sw-about-sub-tagline">WELCOME TO DOCSLOT</p>
          <h1 className="sw-about-title">
            Healthcare <br />
            Redefined in <br />
            <span className="sw-about-text-green">Guwahati.</span>
          </h1>
          <p className="sw-about-description">
            Established with a vision to bring world-class healthcare to the heart of Assam, 
            Swasthyam Multispeciality Clinic stands as a beacon of hope, healing, and absolute medical excellence.
          </p>
        </div>
        <div className="sw-about-image">
          <img src={assets.stetAbout} alt="Swasthyam Clinic" />
        </div>
      </section>

     
      <section className="sw-about-banner-section">
        <div className="sw-about-banner-card">
          <h2>
          Seeking <span className="sw-about-text-highlight">Cure</span> With <span className="sw-about-text-highlight">Care</span>
          </h2>
          <p>
            At DocSlot, we believe that medicine is both a science and an art. Our guiding philosophy 
            dictates that while advanced medical science provides the <strong>Cure</strong>, it is the human touch, 
            empathy, and compassion that provides the <strong>Care</strong>. We don't just treat illnesses; 
            we heal people.
          </p>
        </div>
      </section>

     
      <section className="sw-about-pillars-container">
        <h2 className="sw-about-pillars-title">Our Two Pillars of Healing</h2>

        <div className="sw-about-pillars-cards">
         
          <div className="sw-about-pillar-card">
            <div className="sw-about-icon-wrapper sw-about-blue-icon">
              <i className="fa-solid fa-cube"></i>
            </div>
            <h3>The Cure</h3>
            <p>
              We leverage highly advanced, state-of-the-art diagnostic machinery, fully automated pathology 
              labs, and evidence-based medical protocols. Our team consists of leading MD/MS specialists 
              who bring decades of clinical excellence to ensure highly accurate diagnoses and highly effective treatments.
            </p>
          </div>

         
          <div className="sw-about-pillar-card">
            <div className="sw-about-icon-wrapper sw-about-green-icon">
              <i className="fa-regular fa-heart"></i>
            </div>
            <h3>The Care</h3>
            <p>
              Medical journeys can be overwhelming. We ensure a warm, hygienic, and stress-free environment. 
              From our polite reception staff to our empathetic doctors who take the time to listen to your 
              concerns, every step of your journey is handled with absolute dignity, respect, and emotional support.
            </p>
          </div>
        </div>
      </section>

   
      <section className="sw-about-values-container">
        <h2 className="sw-about-values-title">Our Core Values</h2>

        <div className="sw-about-values-grid">
        
          <div className="sw-about-value-card sw-about-border-blue">
            <h3 className="sw-about-title-blue">Integrity</h3>
            <p>
              We maintain absolute transparency in our pricing, diagnoses, and treatment plans.
            </p>
          </div>

        
          <div className="sw-about-value-card sw-about-border-green">
            <h3 className="sw-about-title-green">Excellence</h3>
            <p>
              We continuously upgrade our technology and knowledge to provide premium healthcare.
            </p>
          </div>

          
          <div className="sw-about-value-card sw-about-border-blue">
            <h3 className="sw-about-title-blue">Compassion</h3>
            <p>
              We treat every patient as a member of our own family, with deep empathy.
            </p>
          </div>

         
          <div className="sw-about-value-card sw-about-border-green">
            <h3 className="sw-about-title-green">Accessibility</h3>
            <p>
              We strive to make top-tier medical consultations available to everyone.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
