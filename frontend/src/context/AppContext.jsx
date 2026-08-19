import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'

export const AppContext = createContext();

const AppContextProvider = (props) => {
  
  axios.defaults.withCredentials = true;

  const currencySymbol = "$";
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);

  const [token, setToken] = useState(
    localStorage.getItem("token") && localStorage.getItem('token') !== 'undefined'
      ? localStorage.getItem("token")
      : false,
  );
  const [userData, setUserData] = useState(false);
  const navigate = useNavigate()

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendurl + "/api/doctors/list");

      if (data.success) {     
        setDoctors(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const loadUserProfileImage = async () => {
        try {
            const { data } = await axios.get(`backendurl + "/api/user/get-profile"`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (data.success) {
                setUserData(data.user);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

 
  const logoutUser = async () => {
    try {
      if (token) {
        await axios.post(
          `${backendurl}/api/user/logout`,
          {},
          { headers: { Authorization: `Bearer ${token}` } },
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setToken(false);
      setUserData(false);
      localStorage.removeItem("token");
      toast.success("Logged out Successfully");
      navigate('/')
    }
  };

  const value = {
    doctors,
    currencySymbol,
    getDoctorsData,
    backendurl,
    token,
    setToken,
    userData,
    setUserData,
    logoutUser,
    loadUserProfileImage,
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

useEffect(() => {
        if (token) {
            loadUserProfileImage();
        } else {
            setUserData(false);
        }
    }, [token]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
export default AppContextProvider;
