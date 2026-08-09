import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  //new
  axios.defaults.withCredentials = true;

  const currencySymbol = "$";
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);

  //new
  const [token, setToken] = useState(
    localStorage.getItem("token") && localStorage.getItem('token') !== 'undefined'
      ? localStorage.getItem("token")
      : false,
  );
  const [userData, setUserData] = useState(false);

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

  //new
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
  };

  useEffect(() => {
    getDoctorsData();
  }, []);
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
export default AppContextProvider;
