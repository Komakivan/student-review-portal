import React, {useContext} from 'react'
import * as yup from 'yup';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import { studentContext } from '../Contexts/studentContext';
import image from '../images/gpeari.png'



const userShema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    rollNumber: yup.string().required('Enrollment Number is required'),
    email: yup.string().required('Email is required'),
    phone: yup.string().required('Phone is required'),
    password: yup.string().required('Password is required'),
    department: yup.string().required('Department is required'),
    semester: yup.string().required('Semester is required'),
})

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(userShema)
    })

    const { registerStudent } = useContext(studentContext)

    // const navigate = useNavigate()

    const onSubmit = async  (data) => {
      registerStudent(data)
      // console.log(data)
    }



  return (
    <div className="bg-gradient-to-r from-teal-700 to-indigo-600 max-w-full md:max-w-full mx-auto min-h-screen flex items-center justify-center">
        <ToastContainer/>
    <div className="w-full py-8">
        <div className="flex items-center justify-center space-x-2">
            <img className='h-sm w-sm rounded-full' src={image} alt='Gperi'/>
        </div>

        <div className="bg-white max-w-md md:max-w-lg lg:w-2/3 xl:w-[500px] 2xl:w-[550px] mt-8 mx-auto px-16 py-8 rounded-lg shadow-2xl">

            <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">Sign Up</h2>
            <p className="text-center text-sm text-gray-600 mt-2">Already have an account? <Link to='/login' className="text-blue-600 hover:text-blue-700 hover:underline" title="Sign In">Sign in here</Link></p>

            <form className="my-8 text-sm" onSubmit={handleSubmit(onSubmit)}>

                <div className="flex flex-col my-4">
                    <label htmlFor="name" className="text-gray-700">Fisrt Name</label>
                    <input type="text" name="name" id="name" className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900" placeholder="Enter your name" {...register('firstName')} />
                    <p className='text-xs text-red-800 mt-1'>{errors.firstName?.message}</p>
                </div>

                <div className="flex flex-col my-4">
                    <label htmlFor="name" className="text-gray-700">Last Name</label>
                    <input type="text" name="name" id="name" className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900" placeholder="Enter your name" {...register('lastName')}/>
                    <p className='text-xs text-red-800 mt-1'>{errors.lastName?.message}</p>
                </div>

                <div className="flex flex-col my-4">
                    <label htmlFor="email" className="text-gray-700">Email Address</label>
                    <input type="email" name="email" id="email" className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900" placeholder="Enter your email" {...register('email')}/>
                    <p className='text-xs text-red-800 mt-1'>{errors.email?.message}</p>
                </div>

                <div className="flex flex-col my-4">
                    <label htmlFor="name" className="text-gray-700">Enrollment Number</label>
                    <input type="text" name="name" id="name" className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900" placeholder="Enter your name" {...register('rollNumber')}/>
                    <p className='text-xs text-red-800 mt-1'>{errors.email?.message}</p>
                </div>

                <div className="flex flex-col my-4">
                    <label htmlFor="name" className="text-gray-700">Phone</label>
                    <input type="text" name="name" id="name" className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900" placeholder="Enter your name" {...register('phone')}/>
                    <p className='text-xs text-red-800 mt-1'>{errors.phone?.message}</p>
                </div>

                <div className="flex flex-col my-4">
                    <label htmlFor="name" className="text-gray-700">Department</label>
                    <input type="text" name="name" id="name" className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900" placeholder="Enter your name" {...register('department')}/>
                    <p className='text-xs text-red-800 mt-1'>{errors.department?.message}</p>
                </div>

                <div className="flex flex-col my-4">
                    <label htmlFor="name" className="text-gray-700">Semester</label>
                    <input type="text" name="name" id="name" className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900" placeholder="Enter your name" {...register('semester')}/>
                    <p className='text-xs text-red-800 mt-1'>{errors.semester?.message}</p>
                </div>
                
                <div className="flex flex-col my-4">
                    <label htmlFor="password" className="text-gray-700">Password</label>
                    <div className="relative flex flex-col items-left mt-2">
                        <input type='password'  name="password" id="password" className="flex-1 p-2 pr-10 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900" placeholder="Enter your password" {...register('password')}/>
                        <p className='text-xs text-red-800 mt-1'>{errors.password?.message}</p> 
                    </div>
                </div>
            
                <div className="my-4 flex items-center justify-end space-x-4">
                    <button className="bg-blue-600 hover:bg-blue-700 rounded-lg px-8 py-2 text-gray-100 hover:shadow-xl transition duration-150 uppercase">Sign Up</button>
                </div>
            </form>
            
        </div>
    </div>
</div>
  )
}

export default Register
