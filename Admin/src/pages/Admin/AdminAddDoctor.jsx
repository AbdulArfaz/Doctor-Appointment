import React, { useContext } from 'react'
import { assets } from '../../assets_admin/assets'
import '../../styles/AdminAddDoctor.css'
import { useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';


const AdminAddDoctor = () => {

   const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [speciality, setSpeciality] = useState('General Physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [about, setAbout] = useState('')

  const { backendurl, adminToken} = useContext(AdminContext)

 const onSubmitHandler = async (e) =>{
  e.preventDefault()

  try {
    if (!docImg) {
      return toast.error('Please upload a doctor picture.')
    }

    const formData = new FormData()

    formData.append('image', docImg)
    formData.append('name', name)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('experience', experience)
    formData.append('fees', Number(fees))
    formData.append('speciality', speciality)
    formData.append('degree', degree)
    formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))
    formData.append('about', about)

  
    // formData.forEach((value,key)=>{
    //   console.log(`${key} : ${value}`);
    // })

    const {data} = await axios.post(backendurl + '/api/admin/add-doctor', formData, {headers:{adminToken}})
    if (data.success) {
      toast.success(data.message)
      setDocImg(false)
      setName('')
      setPassword('')
      setEmail('')
      setAddress1('')
      setAddress2('')
      setDegree('')
      setAbout('')
      setFees('')
    } else {
      toast.error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
    console.log(error);
    res.status(500).json({success: false, message: error.message})
    
  }



 }

  return (
     <form onSubmit={onSubmitHandler} className="admin-addDoctor-form">
      <p className="admin-addDoctor-title">Add Doctor</p>

      
      <div className="admin-addDoctor-img-box">
        <label htmlFor="doc-img">
          <img src={docImg ? URL.createObjectURL(docImg) :assets.upload_area} alt="Upload" />
        </label>
        <input onChange={(e)=>setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
        <p>Upload Doctor picture</p>
      </div>

      
      <div className="admin-addDoctor-container">
        
        
        <div className="admin-addDoctor-grid">
          
         
          <div className="admin-addDoctor-col">
            <div className="admin-addDoctor-field">
              <p>Doctor name</p>
              <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder="Name" required />
            </div>

            <div className="admin-addDoctor-field">
              <p>Doctor Email</p>
              <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder="Email" required />
            </div>

            <div className="admin-addDoctor-field">
              <p>Doctor Password</p>
              <input  onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder="Password" required />
            </div>

            <div className="admin-addDoctor-field">
              <p>Experience</p>
              <select  onChange={(e)=>setExperience(e.target.value)} value={experience} name="" id="">
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
                <option value="11 Year">11 Year</option>
                <option value="12 Year">12 Year</option>
                <option value="13 Year">13 Year</option>
                <option value="14 Year">14 Year</option>
                <option value="15 Year">15 Year</option>
                <option value="16 Year">16 Year</option>
                <option value="17 Year">17 Year</option>
                <option value="18 Year">18 Year</option>
                <option value="19 Year">19 Year</option>
                <option value="20 Year">20 Year</option>
                <option value="21 Year">21 Year</option>
                <option value="22 Year">22 Year</option>
                <option value="23 Year">23 Year</option>
                <option value="24 Year">24 Year</option>
                <option value="25 Year">25 Year</option>
                <option value="26 Year">26 Year</option>
                <option value="27 Year">27 Year</option>
                <option value="28 Year">28 Year</option>
                <option value="29 Year">29 Year</option>
                <option value="30 Year">30 Year</option>
              </select>
            </div>

            <div className="admin-addDoctor-field">
              <p>Fees</p>
              <input  onChange={(e)=>setFees(e.target.value)} value={fees} type="number" placeholder="Fees" required />
            </div>
          </div>

         
          <div className="admin-addDoctor-col">
            <div className="admin-addDoctor-field">
              <p>Speciality</p>
              <select  onChange={(e)=>setSpeciality(e.target.value)} value={speciality} name="" id="">
                <option value="General Physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className="admin-addDoctor-field">
              <p>Education</p>
              <input  onChange={(e)=>setDegree(e.target.value)} value={degree} type="text" placeholder="Education" required />
            </div>

            <div className="admin-addDoctor-field">
              <p>Address</p>
              <input  onChange={(e)=>setAddress1(e.target.value)} value={address1} type="text" placeholder="address 1" required />
              <input  onChange={(e)=>setAddress2(e.target.value)} value={address2} type="text" placeholder="address 2" required />
            </div>
          </div>

        </div>

        
        <div className="admin-addDoctor-field admin-addDoctor-about">
          <p>About</p>
          <textarea onChange={(e)=>setAbout(e.target.value)} value={about} placeholder="Write about doctor" rows={5} required />
        </div>

        
        <button type="submit" className="admin-addDoctor-btn">
          Add Doctor
        </button>

      </div>
    </form>
  );
};


export default AdminAddDoctor
