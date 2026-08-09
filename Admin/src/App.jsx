import React, { useContext } from 'react'
import AdminLogin from './pages/AdminLogin'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AdminContext } from './context/AdminContext'
import Navbar from './components/Admin.Navbar'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import AdminAddDoctor from './pages/AdminAddDoctor'
import AdminAllAppointment from './pages/AdminAllAppointments'
import AdminDoctorList from './pages/AdminDoctorList'



const App = () => {

const {adminToken} = useContext(AdminContext)

  return adminToken ? (
    <div>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/admin-dashboard' element={<Dashboard />} />
        <Route path='/admin-addDoctor' element={<AdminAddDoctor />} />
        <Route path='/admin-allAppointments' element={<AdminAllAppointment />} />
        <Route path='/admin-doctorList' element={<AdminDoctorList />} />
      </Routes>
    </div>
   ) : (
    <>
        <AdminLogin />
      <ToastContainer />
    </>
  )
}

export default App
