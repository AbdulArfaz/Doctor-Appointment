import React, { useState } from 'react'
import {assets} from '../assets/assets'
import '../styles/MyProfile.css'

const MyProfile = () => {

const [userData,setUserData] = useState({
  name:'Abdul Arfaz',
  image: assets.profile_pic,
  email: 'aa@gmail.com',
  phone: '+91 8724001944',
  address: {
    line1:'Saikia Chuburi Muslim Goan',
    line2:'Mission Charali, Tezpur Assam'
  },
  gender: 'Male',
  dob: '18-12-2001'
})


const[edit,setEdit]= useState(false)

  return (

      <div className="mp-box">
      <div className="mp-top">
        <img src={userData.image} alt="user" className="mp-img" />
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
