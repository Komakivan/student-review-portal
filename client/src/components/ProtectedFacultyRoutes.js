import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedFacultyRoutes = () => {
   
  const token = localStorage.getItem('faculty')

  return (
      token? <Outlet/> : <Navigate to='/login'/>
  )
}

export default ProtectedFacultyRoutes
