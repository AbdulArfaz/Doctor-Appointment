import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({speciality,drId}) => {
    const navigate = useNavigate()

    const {doctors} = useContext(AppContext)

    const [relatedDoc, setRelatedDoc]=useState([])

    useEffect(()=>{

   if (doctors.length > 0 && speciality) {
    const doctprsData = doctors.filter((doc)=>doc.speciality === speciality && doc._id !== drId)
    setRelatedDoc(doctprsData)
   }
    },[doctors,speciality,drId])

  if (relatedDoc.length === 0) return null

  return (
    <div>
  <div className="top-doctors-container">
      <h1 className="top-doctors-title">Related Doctors</h1>
      <p className="top-doctors-subtitle">Simply browse through our extensive list of trusted doctors.</p>

      <div className="doctors-grid">
        {relatedDoc.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointment/${item._id || item.id}`);
              window.scrollTo(0, 0);
            }}
            className="doctor-card"
          >
            <img src={item.image} alt={item.name} />
            <div className="doctor-info">
              <div className="status-indicator">
                <span className="dot"></span>
                <span>Available</span>
              </div>
              <p className="doctor-name">{item.name}</p>
              <p className="doctor-speciality">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

export default RelatedDoctors
