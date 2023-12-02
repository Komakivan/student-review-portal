import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import image from '../images/gpeari.png'

const HomePage = () => {

  const token = localStorage.getItem('user')


  if(token) {
     return <Navigate to='/student'/>
  }


  return (
    <section className="max-w-md sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl  mt-16 mx-auto text-center">
    <div className="bg-gradient-to-r from-gray-200 to-sky-100 absolute inset-0 flex items-center justify-center gap-1 flex-col">
      <img className='animate-bounce rounded-full' src={image} alt='img'/>
      <h2 className='text-slate-600 xl:text-4xl mt-4'>Welcome to the GPERI Online Course Feedback Portal</h2>
      <p className='text-center text-zinc-500'>Web platform for students to rate and review course experiences.</p>
      <Link to='/login' className="bg-indigo-500 hover:bg-indigo-600 hover:shadow-lg transition-all duration-2 py-3 mt-20 px-32 text-zinc-200 rounded-lg" >Get Started</Link>
    </div>
  </section>
 

  )
}

export default HomePage
