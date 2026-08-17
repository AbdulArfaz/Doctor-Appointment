import React, { useContext } from 'react'
import AdminLogin from './pages/Doctor/AdminLogin'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AdminContext } from './context/AdminContext'
import Navbar from './components/Admin.Navbar'
import { Route, Routes, Navigate } from 'react-router-dom'
import Dashboard from './pages/Admin/Dashboard'
import AdminAddDoctor from './pages/Admin/AdminAddDoctor'
import AdminAllAppointment from './pages/Admin/AdminAllAppointments'
import AdminDoctorList from './pages/Admin/AdminDoctorList'
import { DoctorContext } from './context/DoctorContext'
import DoctorDashboard from './pages/Doctor/DoctorDashboard'
import DoctorAppointments from './pages/Doctor/DoctorAppointments'
import DoctorProfile from './pages/Doctor/DoctorProfile'

const App = () => {
const {adminToken} = useContext(AdminContext)
const { docToken } =useContext(DoctorContext)

  return adminToken || docToken ? (
    <div>
      <ToastContainer />
      <Navbar />
      <Routes>

        <Route path='/' element={ 
          adminToken ? <Navigate to='/admin-dashboard' replace /> :
          docToken ? <Navigate to='/doctor-dashboard' replace /> :
          <Navigate to='/login' replace />
      }
      />

      { adminToken && (
       <>
        <Route path='/' element={<Dashboard />} />
        <Route path='/admin-dashboard' element={<Dashboard />} />
        <Route path='/admin-addDoctor' element={<AdminAddDoctor />} />
        <Route path='/admin-allAppointments' element={<AdminAllAppointment />} />
        <Route path='/admin-doctorList' element={<AdminDoctorList />} />
        </>
      )}

      { docToken && (
      <>
        <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
        <Route path='/doctor-appointments' element={<DoctorAppointments />} />
        <Route path='/doctor-profile' element={<DoctorProfile />} />
       </>
      )}

      <Route path='*' element={<Navigate to='/' replace />} />

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
