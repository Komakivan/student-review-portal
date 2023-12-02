import React, { useContext, useState, } from 'react'
import { facultyContext } from '../Contexts/facultyContext'
// import { ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {  useNavigate } from 'react-router-dom'
import FacultyTable from '../components/FacultyTable'
import StudentTable from '../components/StudentTable'
import SubjectTable from '../components/SubjectTable'
import image from '../images/G-college.jpeg'

const Admin = () => {
  const [open, setOpen] = useState(false)
  const [isAction, setIsAction] = useState('')


    const toggle = () => {
        setOpen(!open)
    }



  const { logOutFaculty } = useContext(facultyContext)


  const navigate = useNavigate()

  const handleLogout = () => {
    logOutFaculty()
  }



  return (
      <div className='relative'>
    <div className='relative'>
    <div className='md:flex bg-cyan-800 shadow-md  justify-between  gap-4 items-center md:px-10  py-4 px-2'>
      <div className='font-bold text-2xl cursor-pointer flex items-center'>
         <h2 className='text-slate-300'>Admin Dashboard</h2> 
      </div>
      <div onClick={toggle} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
        {open? (<span className='text-md text-red-800'>close</span>) : (<span className='text-md text-blue-100'>open</span>)}
      </div>

      <ul className={`md:flex items-center md:items-center md:mr-3 md:gap-2 md:pb-0 pb-7 
      text-center absolute md:static transition-all text-slate-400 duration-500 ease-in bg-cyan-800 md:z-auto z-100 w-60 md:w-auto ${open? "left-0": "left-[-490px]"}`}>
        <li className='cursor-pointer text-xl mb-3' onClick={() => setIsAction('faculty')}>Faculty</li>
        <li className='cursor-pointer text-xl mb-3' onClick={() => setIsAction('students')}>Students</li>
        <li className='cursor-pointer text-xl mb-3' onClick={() => setIsAction('subjects')}>Subjects</li>
        <li className='cursor-pointer text-xl mb-3' onClick={() => setIsAction('actions')}>Actions</li>
      <button className='bg-indigo-600 py-2  text-slate-300 hover:bg-indigo-500 px-6 md:ml-8 rounded-lg text-lg' onClick={handleLogout}>Log out</button>
      </ul>
    </div>
    {/* <div className='max-w-full mt-8 shadow-lg rounded-lg   mx-auto p-4'> */}
     {isAction === 'actions'? (
              <ul className='flex mt-10 max-w-md mx-auto gap-4'>
              <li className='bg-cyan-600 cursor-pointer text-slate-300 py-1 px-3 rounded-lg hover:bg-cyan-700 hover:shadow-lg' onClick={() => navigate('/add-faculty')}>Add Faculty</li>
              <li className='bg-cyan-600 cursor-pointer text-slate-300 py-1 px-3 rounded-lg hover:bg-cyan-700 hover:shadow-lg' onClick={() => navigate('/register')}>Add Student</li>
              <li className='bg-cyan-600 cursor-pointer text-slate-300 py-1 px-3 rounded-lg hover:bg-cyan-700 hover:shadow-lg' onClick={() => navigate('/register-subject')}>Add Subject</li>
              {/* <li className='bg-cyan-600 cursor-pointer text-slate-300 py-1 px-3 rounded-lg hover:bg-cyan-700 hover:shadow-lg'>Add Actions</li> */}
            </ul>
     ): ''}

     {isAction ==='faculty'? (
       <FacultyTable/>
     ): ''}

     {isAction === 'students'? <StudentTable/> : ''}


    {isAction === 'subjects'? <SubjectTable/> : ''}

      <div className='w-full md:w-full 2xl:w-full mx-auto ml-32 mt-32 md:ml-[40%]'>
      {isAction === ''? <img  className='animate-none w-full absolute top-20  left-0 right-0 bg-cover ' src={image} alt='gperi'/> : ''}
      </div>


  </div>
  </div>
  )
  }


  export default Admin