import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const backendurl = import.meta.env.VITE_BACKEND_URL;

  const [docToken, setDocToken] = useState(
    localStorage.getItem("docToken") || "",
  );
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${backendurl}/api/doctors/appointments`,
        { headers: { Authorization: `Bearer ${docToken}` } },
      );
      
      if (data.success) {
        const reversedList = [...(data.data || [])].reverse()
        setAppointments(reversedList);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };

  const value = {
    docToken,
    setDocToken,
    backendurl,
    appointments,
    setAppointments,
    getAppointments,
  };
  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};
export default DoctorContextProvider;
