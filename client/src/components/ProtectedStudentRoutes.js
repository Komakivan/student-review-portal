import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedStudentRoute = () => {
   
  const token = localStorage.getItem('user')

  return (
      token? <Outlet/> : <Navigate to='/login'/>
  )
}

export default ProtectedStudentRoute
