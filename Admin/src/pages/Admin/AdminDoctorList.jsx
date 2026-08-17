import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import '../../styles/AdminDoctorList.css'

const AdminDoctorList = () => {

const { doctorslist, adminToken, getAllDoctorsList, changeAvailability } = useContext(AdminContext)

useEffect(()=>{
if (adminToken) {
  getAllDoctorsList()
}
},[adminToken])
  return (

          <div className='dr-list-page'>
      <h1 className='dr-list-title'>All Doctors</h1>

      <div className='dr-list-grid'>
        {doctorslist && doctorslist.map((item, index) => {
          return (
            <div key={item._id || index} className='dr-list-card'>
              <div className='dr-list-img-container'>
                <img src={item.image} alt={item.name} className='dr-list-img' />
              </div>

              <div className='dr-list-card-info'>
                <h3 className='dr-list-name'>{item.name}</h3>
                <p className='dr-list-speciality'>{item.speciality}</p>

                <div className='dr-list-availability-badge'>
                  <input 
                  onChange={()=>changeAvailability(item._id)}
                    type='checkbox' 
                    checked={item.available} 
                    readOnly 
                    id={`avail-${index}`}
                  />
                  <label htmlFor={`avail-${index}`}>
                    <span  className={`dr-list-status-dot ${item.available ? 'dr-list-active' : ''}`}></span>
                    {item.available ? 'Available' : 'Unavailable'}
                  </label>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>


  
      )
    }

export default AdminDoctorList

















    // <>
    
    //   <h1>All Doctors</h1>
      
    //   {
    //     doctorslist.map((item,index)=>{
    //       return (
    //         <div key={index}>
    //       <div >
    //        <img src={item.image} alt='doctor-image' />
    //       </div>
          
    //       <div>
    //         <p>{item.name}</p>
    //         <p>{item.speciality}</p>
    //         <div>
    //           <input type='checkbox' checked={item.available} /> 
    //           <p>Available</p>
    //         </div>
    //       </div>
          
    //     </div>
    //       )
    //     })
    //   }
    
    // </>
