import React, { useState } from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify'
import "../../styles/DoctorProfile.css";

const DoctorProfile = () => {
  const { docToken, profileData, setProfileData, getProfileData, backendurl } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [imageFile, setImageFile] = useState(false);

  const updateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("name", profileData.name);
      formData.append("degree", profileData.degree);
      formData.append("about", profileData.about);
      formData.append("fees", profileData.fees);
      formData.append("available", profileData.available);
      formData.append("address", JSON.stringify(profileData.address));
      if (imageFile) {
        formData.append("image", imageFile);
      }
      const { data } = await axios.post(
        `${backendurl}/api/doctors/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${docToken}`,
          },
        },
      );
      if (data.success) {
        toast.success(data.message || "Profile updated successfully!");
        const updatedDoc = data.data;
      if (typeof updatedDoc.address === 'string') {
        updatedDoc.address = JSON.parse(updatedDoc.address || '{}');
      }
      setProfileData(updatedDoc);
        setIsEdit(false);
        setImageFile(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

//new
const changeAvailability = async () => {
  try {
    const { data } = await axios.post(
      `${backendurl}/api/doctors/change-availability`,
      { docId: profileData._id },
      { headers: {Authorization: `Bearer ${docToken}` }} // Or whatever your doctor token variable is named
    );

    if (data.success) {
      toast.success(data.message);
      getProfileData()
      // Fetch the profile data again so everything stays synced 
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};


  useEffect(() => {
    if (docToken) {
      getProfileData();
    }
  }, [docToken]);

  return (
    profileData && (
      <div className="up-profile-container">
        <div className="up-profile-card">
          <div className="up-profile-img-wrapper">
            {isEdit ? (
              <label htmlFor="image-upload" className="up-profile-img-label">
                <img
                  src={
                    imageFile
                      ? URL.createObjectURL(imageFile)
                      : profileData.image
                  }
                  alt="doctor"
                  className="up-profile-img"
                />
                <span className="up-profile-img-overlay">Change Photo</span>
                <input
                  type="file"
                  id="image-upload"
                  hidden
                  onChange={(e) => setImageFile(e.target.files[0])}
                />
              </label>
            ) : (
              <img
                src={profileData.image}
                alt="doctor"
                className="up-profile-img"
              />
            )}
          </div>

          <div className="up-profile-info">
            <div className="up-profile-name-box">
              {isEdit ? (
                <input
                  type="text"
                  className="up-profile-input"
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  value={profileData.name}
                />
              ) : (
                <h2 className="up-profile-name">{profileData.name}</h2>
              )}
            </div>

            <div className="up-profile-subheading">
              <p className="up-profile-degree">
                {isEdit ? (
                  <input
                    type="text"
                    className="up-profile-input"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        degree: e.target.value,
                      }))
                    }
                    value={profileData.degree}
                  />
                ) : (
                  profileData.degree
                )}{" "}
                - {profileData.speciality}
              </p>
              <span className="up-profile-exp-badge">
                {profileData.experience}
              </span>
            </div>

            <div className="up-profile-section">
              <p className="up-profile-label">About:</p>
              {isEdit ? (
                <textarea
                  rows={4}
                  className="up-profile-textarea"
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      about: e.target.value,
                    }))
                  }
                  value={profileData.about}
                />
              ) : (
                <p className="up-profile-text">{profileData.about}</p>
              )}
            </div>

            <div className="up-profile-section">
              <p className="up-profile-fee">
                Appointment Fee:
                <span className="up-profile-currency-val">
                  {currency}
                  {isEdit ? (
                    <input
                      type="number"
                      className="up-profile-input-small"
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          fees: e.target.value,
                        }))
                      }
                      value={profileData.fees}
                    />
                  ) : (
                    profileData.fees
                  )}
                </span>
              </p>
            </div>

            <div className="up-profile-section">
              <p className="up-profile-label">Address:</p>
              <div className="up-profile-address-box">
                {isEdit ? (
                  <>
                    <input
                      type="text"
                      className="up-profile-input mb-2"
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line1: e.target.value },
                        }))
                      }
                      value={profileData.address?.line1 || ""}
                    />
                    <input
                      type="text"
                      className="up-profile-input"
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line2: e.target.value },
                        }))
                      }
                      value={profileData.address?.line2 || ""}
                    />
                  </>
                ) : (
                  <p className="up-profile-text">
                    {profileData.address?.line1}
                    <br />
                    {profileData.address?.line2}
                  </p>
                )}
              </div>
            </div>

            <div className="up-profile-checkbox-box">
              <input

              onChange={()=>{
                if (isEdit) {
                  setProfileData((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                  changeAvailability()
                }
              }}
                checked={profileData.available || false}
                type="checkbox"
                id="available"
                className="up-profile-checkbox"
              />
              <label htmlFor="available" className="up-profile-checkbox-label">
                Available for Appointments
              </label>
            </div>

            <div className="up-profile-btn-wrapper">
              {isEdit ? (
                <button
                  className="up-profile-btn up-profile-btn-save"
                  onClick={updateProfile}
                >
                  Save Changes
                </button>
              ) : (
                <button
                  className="up-profile-btn up-profile-btn-edit"
                  onClick={() => setIsEdit(true)}
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
