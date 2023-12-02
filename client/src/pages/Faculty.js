import React, { useContext } from 'react'
import { facultyContext } from '../Contexts/facultyContext'
import 'react-toastify/dist/ReactToastify.css'
import ReviewTable from '../components/ReviewTable';


const Faculty = () => {

  const {faculty, logOutFaculty, subjects } = useContext(facultyContext)

  const prof = localStorage.getItem('faculty')
  const user = JSON.parse(prof).fullName

  let items =[];
  if(subjects) {
      items = (subjects.filter(item => item.teacher === user))
  }





  return (
    <div className=" absolute inset-0 max-w-ful">
      <div className=''>
    <header className='flex items-center justify-between md:px-20 lg:px-32 md:py-6 py-2 px-10 sm:px-8 '>
      <h1 className='md:text-4xl text-2xl tracking-wide bg-gradient-to-r from-stone-600 to-red-200 bg-clip-text text-transparent'>Welcome, Prof. {faculty &&  faculty.fullName}</h1>
      <button className='bg-gradient-to-r from-stone-600 to-sky-900 rounded-md py-1 px-6 shadow-lg text-slate-200' onClick={logOutFaculty}>Logout</button>
    </header>
    
    <main className='mt-10 max-w-md mx-auto'>
      <div>
        <h1 className='text-center text-slate-600 text-lg tracking-wide'>Review of the current quater</h1>
      </div>
    </main>
    <div className='max-w-full mx-auto md:max-w-6xl'>
     {items && items.map(item => (
        <ReviewTable key={item._id} subject={item}/>
     ))}
    </div>
  </div>  
  </div>
   
  )
}

export default Faculty
