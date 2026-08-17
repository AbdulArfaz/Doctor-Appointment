import { useState } from "react"
import { createContext } from "react"

export const DoctorContext = createContext()

const DoctorContextProvider = ( props )=>{

    const backendurl = import.meta.env.VITE_BACKEND_URL

    const [docToken, setDocToken] = useState(
       localStorage.getItem("docToken") || "",
    )


    const value = {
      docToken,
      setDocToken,
      backendurl,
    }
    return(
        <DoctorContext.Provider value={value}>
        {props.children}
        </DoctorContext.Provider>
    )
}
export default DoctorContextProvider
