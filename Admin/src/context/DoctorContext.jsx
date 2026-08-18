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
  const[dashData, setDashData] = useState(false)

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

   const getDashData = async () =>{
    try {
      const { data } = await axios.get(`${backendurl}/api/doctors/doc-dashboard`,
        { headers: { Authorization: `Bearer ${docToken}` } }
      )
      if (data.success) {
        setDashData(data.data)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
        console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  }

    const cancelAppointment = async (appointmentId) =>{
    try {
      const { data } = await axios.post(`${backendurl}/api/doctors/cancel-appointment`,
        { appointmentId},
        { headers: { Authorization: `Bearer ${docToken}` } },
      )
      if (data.success) {
        toast.success(data.message)
        getAppointments()
        getDashData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
       console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  }

  const completeAppointment = async (appointmentId) =>{
    try {
      const { data } = await axios.post(`${backendurl}/api/doctors/complete-appointment`,
        {appointmentId},
        { headers: { Authorization: `Bearer ${docToken}` } },
      )
      if (data.success) {
        toast.success(data.message)

        setDashData((prevData) => {
                if (!prevData) return prevData;
                return {
                    ...prevData,
                    latestAppointments: prevData.latestAppointments.map((item) =>
                        item._id === appointmentId ? { ...item, cancelled: true } : item
                    ),
                };
            });

        getAppointments()
        getDashData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
       console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  }

  const value = {
    docToken,
    setDocToken,
    backendurl,
    appointments,
    setAppointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
    dashData,
    setDashData,
    getDashData
  };
  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};
export default DoctorContextProvider;
