import axios from "axios";
import { createContext, useState } from "react"
import { toast } from "react-toastify";

export const AdminContext = createContext()

const AdminContextProvider = ( props )=>{
    const [doctorslist, setDoctorslist] = useState([])

 const[adminToken, setAdminToken] = useState(localStorage.getItem('accessToken') || '');
 
 const backendurl = import.meta.env.VITE_BACKEND_URL

 const getAllDoctorsList = async () => {
    try {
        const {data} =await axios.post(backendurl + '/api/admin/all-doctors', {}, {headers: {adminToken}})
        if(data.success){
            setDoctorslist(data.data)
            // console.log(data);
                        
        }else{
            toast.error(data.message)
        }
    } catch (error) {
        toast.error(error.message)
    }
 }

 const changeAvailability = async (docId) => {
    try {
        const {data} = await axios.post(backendurl + '/api/admin/change-availability', {docId}, {headers: {aToken : adminToken}})
        if (data.success) {
            toast.success(data.message)
            getAllDoctorsList()
        }else{
            toast.error(data.message)
        }
    } catch (error) {
        toast.error(error.message)
    }
 }

    const value = {
          adminToken,setAdminToken,
          backendurl,doctorslist,getAllDoctorsList,changeAvailability,
    }
    return(
        <AdminContext.Provider value={value}>
        {props.children}
        </AdminContext.Provider>
    )
}
export default AdminContextProvider