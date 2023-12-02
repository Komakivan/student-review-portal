import React, { useContext } from 'react'
import * as yup from 'yup';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// import { useNavigate, Link } from 'react-router-dom';
import { facultyContext } from '../Contexts/facultyContext';
import { ToastContainer } from 'react-toastify';

const userShema = yup.object({
    fullName: yup.string().required('Full Name is required'),
    email: yup.string().required('Email is required'),
    phone: yup.string().required('Phone is required'),
    password: yup.string().required('Password is required'),
    department: yup.string().required('Department is required'),
    role: yup.string().required('Role is required')
})

const FacultyRegistration = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(userShema)
    })

    const { registerFaculty } = useContext(facultyContext)

    // const navigate = useNavigate()

    const onSubmit = async  (data) => {
        registerFaculty(data)
    }


  return (
    <div className="w-full py-8">
   <ToastContainer/>
    <div className="bg-white md:max-w-md max-w-md lg:w-2/3 xl:w-[500px] 2xl:w-[550px] mt-8 mx-auto px-16 py-8 rounded-lg shadow-2xl">

        <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">Add new faculty</h2>
    
        <form className="my-8 text-sm" onSubmit={handleSubmit(onSubmit)}>

            <div className="flex flex-col my-4">
                <label htmlFor="name" className="text-gray-700">Full Name</label>
                <input type="text" name="name" id="name" className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900" placeholder="Enter your name" {...register('fullName')} />
            <p className='text-red-500 py-1'>{errors.fullName?.message}</p>
            </div>

            <div className="flex flex-col my-4">
                <label htmlFor="email" className="text-gray-700">Email Address</label>
                <input type="email" name="email" id="email" className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900" placeholder="Enter your email" {...register('email')}/>
                <p className='text-red-500 py-1'>{errors.email?.message}</p>
            </div>

            <div className="flex flex-col my-4">
                <label htmlFor="name" className="text-gray-700">Phone</label>
                <input type="text" name="name" id="name" className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900" placeholder="Enter your name" {...register('phone')}/>
                <p className='text-red-500 py-1'>{errors.phone?.message}</p>
            </div>

            <div className="flex flex-col my-4">
                <label htmlFor="name" className="text-gray-700">Department</label>
                <input type="text" name="name" id="name" className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900" placeholder="Enter your name" {...register('department')}/>
                <p className='text-red-500 py-1'>{errors.department?.message}</p>
            </div>

            <div className="flex flex-col my-4">
                <label htmlFor="name" className="text-gray-700">Role</label>
                <input type="text" name="name" id="name" className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900" placeholder="Enter your name" {...register('role')}/>
                <p className='text-red-500 py-1'>{errors.role?.message}</p>
            </div>
            
            <div className="flex flex-col my-4">
                <label htmlFor="password" className="text-gray-700">Password</label>
                {/* <div className="relative flex items-center mt-2"> */}
                    <input type='password'  name="password" id="password" className="flex-1 p-2 pr-10 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900" placeholder="Enter your password" {...register('password')}/>
                    <p className='text-red-500 py-1'>{errors.password?.message}</p>  
                {/* </div> */}
            </div>
        
            <div className="my-4 flex items-center justify-end space-x-4">
                <button className="bg-blue-600 hover:bg-blue-700 rounded-lg px-8 py-2 text-gray-100 hover:shadow-xl transition duration-150 uppercase">Submit</button>
            </div>
        </form>
        
    </div>
</div>
  )
}

export default FacultyRegistration
