import React, { useContext } from 'react'
import * as yup from 'yup';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Navigate } from 'react-router-dom';
// import { decodeToken } from 'react-jwt'
import { Link } from 'react-router-dom';
// import FacultyLogin from './FacultyLogin';
import { studentContext } from '../Contexts/studentContext';
import image from '../images/gpeari.png'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

// The data schema
const userShema = yup.object({
  rollNumber: yup.string().min(12).max(12).required('Enrollment Number is required'),
  password: yup.string().required('Password is required'),
})

const Login = () => {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(userShema)
})

const { loginStudent } = useContext(studentContext)

// const navigate = useNavigate()

const token = localStorage.getItem('user')

  if(token) {
     return <Navigate to='/student'/>
  }


const onSubmit = async  (data) => {
    loginStudent(data)
}

  return (
    <div className="bg-gradient-to-r from-teal-700 to-indigo-600 max-w-full md:max-w-full mx-auto min-h-screen flex items-center justify-center">
      <ToastContainer/>
    <div className="w-full py-8">
        <div className="flex items-center justify-center space-x-2">
            <img className='h-sm w-sm rounded-full' src={image} alt='Gperi'/>
        </div>

        <div className="bg-white max-w-md md:max-w-md lg:w-2/3 xl:w-[500px] 2xl:w-[550px] mt-8 mx-auto px-16 py-8 rounded-lg shadow-2xl">

            <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">Student Sign in</h2>
            <Link to='/faculty-login' className='text-indigo-700 hover:underline italic'>Sign in as Faculty</Link>
            <p className="text-center text-sm text-gray-600 mt-2">Don't have an account? 
            <Link to='/register' className="text-blue-600 ml-2 hover:text-blue-700 hover:underline" title="Sign In">Sign up here</Link></p>
            

            <form className="my-8 text-sm" onSubmit={handleSubmit(onSubmit)}>

               
                <div className="flex flex-col my-4">
                    <label htmlFor="name" className="text-gray-700">Enrollment Number</label>
                    <input type="text" name="name" id="name" className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900" placeholder="Enrollment Number" {...register('rollNumber')}/>
                    <p className='text-xs text-red-800 mt-1'>{errors.rollNumber?.message}</p>
                </div>

                
                <div className="flex flex-col my-4">
                    <label htmlFor="password" className="text-gray-700">Password</label>
                    <div className="relative flex flex-col items-left mt-2">
                        <input type='password'  name="password" id="password" className="flex-1 p-2 pr-10 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900" placeholder="Enter your password" {...register('password')}/>
                        <p className='text-xs text-red-800 mt-1'>{errors.password?.message}</p>
                    </div>
                </div>
                <Link to='/reset-password' className='text-xs hover:underline text-blue-800 mt-1'>Forgot Password?</Link>
            
                <div className="my-4 flex items-center justify-end space-x-4">
                    <button className="bg-blue-600 hover:bg-blue-700 rounded-lg px-8 py-2 text-gray-100 hover:shadow-xl transition duration-150 uppercase">Log in</button>
                </div>
            </form>
            
        </div>
    </div>
</div>
  )
}

export default Login
