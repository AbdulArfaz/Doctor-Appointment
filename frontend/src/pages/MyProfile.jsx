import React, { useState } from 'react'
import {assets} from '../assets/assets'
import '../styles/MyProfile.css'
import { useEffect } from 'react'
import axios from 'axios'

const MyProfile = () => {

const [userData,setUserData] = useState({
  name:'',
  image: '',
  email: '',
  phone: '',
  address: {
    line1:'',
    line2:''
  },
  gender: '',
  dob: ''
})


const[edit,setEdit]= useState(false)

useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('/api/user/get-profile', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                console.log('Full response:', response.data);
                
                const profileData = response.data.data || response.data.user
               if (profileData) {
                setUserData({
                    name: profileData.name || '',
                    email: profileData.email || '',
                    phone: profileData.phone || '',
                    address: profileData.address || { line1: '', line2: '' },
                    gender: profileData.gender || 'Male',
                    dob: profileData.dob || '',
                    image: profileData.image || ''
                });
            }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };
        fetchProfile();
    }, []);

    // 2. Function to save updated data back to API
    const handleSave = async () => {
        try {
            const response = await axios.put('/api/user/update-profile', userData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            if (response.data.success) {
                setUserData(response.data.user);
                setEdit(false);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

  return (

      <div className="mp-box">
      <div className="mp-top">
        <img src={userData.image || assets.profile_pic} alt="user" className="mp-img" />
        {edit ? (
          <input
            type="text"
            className="mp-inp mp-name-inp"
            value={userData.name}
            onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
          />
        ) : (
          <h2 className="mp-title">{userData.name}</h2>
        )}
      </div>

      <hr className="mp-divider" />

      <div className="mp-sec">
        <p className="mp-head">CONTACT INFORMATION</p>
        <div className="mp-grid">
          <p className="mp-lbl">Email id:</p>
          <p className="mp-val mp-link">{userData.email}</p>

          <p className="mp-lbl">Phone:</p>
          {edit ? (
            <input
              type="text"
              className="mp-inp"
              value={userData.phone}
              onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
            />
          ) : (
            <p className="mp-val">{userData.phone}</p>
          )}

          <p className="mp-lbl">Address:</p>
          {edit ? (
            <div className="mp-col">
              <input
                type="text"
                className="mp-inp"
                value={userData.address.line1}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
              />
              <input
                type="text"
                className="mp-inp"
                value={userData.address.line2}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
              />
            </div>
          ) : (
            <p className="mp-val">
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          )}
        </div>
      </div>

      <div className="mp-sec">
        <p className="mp-head">BASIC INFORMATION</p>
        <div className="mp-grid">
          <p className="mp-lbl">Gender:</p>
          {edit ? (
            <select
              className="mp-inp"
              value={userData.gender}
              onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="mp-val">{userData.gender}</p>
          )}

          <p className="mp-lbl">Birth date:</p>
          {edit ? (
            <input
              type="date"
              className="mp-inp"
              value={userData.dob}
              onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
            />
          ) : (
            <p className="mp-val">{userData.dob}</p>
          )}
        </div>
      </div>

      <div style={{ marginTop: '24px' }}>
        {edit ? (
          <button className="mp-btn mp-save" onClick={() => setEdit(false)}>
            Save Information
          </button>
        ) : (
          <button className="mp-btn mp-edit" onClick={() => setEdit(true)}>
            Edit
          </button>
        )}
      </div>
    </div>

  )
}

export default MyProfile
