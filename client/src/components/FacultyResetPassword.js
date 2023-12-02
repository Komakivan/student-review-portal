import React from 'react'
import * as yup from 'yup';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'

// The data schema
const userShema = yup.object({
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required'),
  confirmPassword: yup.string().label('confirm password').required().oneOf([yup.ref('password'), null], 'Passwords must match'),
})

const Login = () => {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(userShema)
})


const navigate = useNavigate()

const onSubmit = async  (data) => {
    try {
        const request = await fetch('http://localhost:8000/faculty/reset-password',{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        const response = await request.json()
        if(response.status === 'success') {
            navigate('/faculty-login')
        }
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}

  return (
    <div className="bg-gradient-to-r from-teal-400 to-indigo-300 max-w-full md:max-w-full mx-auto min-h-screen flex items-center justify-center">
      <ToastContainer/>
    <div className="w-full py-8">
        {/* <div className="flex items-center justify-center space-x-2">
            <img className='h-sm w-sm rounded-full' src={image} alt='Gperi'/>
        </div> */}

        <div className="bg-white max-w-md md:max-w-md lg:w-2/3 xl:w-[500px] 2xl:w-[550px] mt-8 mx-auto px-16 py-8 rounded-lg shadow-2xl">

            <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">Reset Password</h2>

            <form className="my-8 text-sm" onSubmit={handleSubmit(onSubmit)}>

               
                <div className="flex flex-col my-4">
                    <label htmlFor="name" className="text-gray-700">Enter email</label>
                    <input type="text" name="name" id="name" className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900" placeholder="Email" {...register('email')}/>
                    <p className='text-xs text-red-800 mt-1'>{errors.email?.message}</p>
                </div>

                
                <div className="flex flex-col my-4">
                    <label htmlFor="password" className="text-gray-700">Password</label>
                    <div className="relative flex flex-col items-left mt-2">
                        <input type='password'  name="password" id="password" className="flex-1 p-2 pr-10 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900" placeholder="Enter your password" {...register('password')}/>
                        <p className='text-xs text-red-800 mt-1'>{errors.password?.message}</p>
                    </div>
                </div>

                <div className="flex flex-col my-4">
                    <label htmlFor="password" className="text-gray-700">Confirm Password</label>
                    <div className="relative flex flex-col items-left mt-2">
                        <input type='password'  name="password" id="password" className="flex-1 p-2 pr-10 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900" placeholder="Confirm password" {...register('confirmPassword')}/>
                        <p className='text-xs text-red-800 mt-1'>{errors.confirmPassword?.message}</p>
                    </div>
                </div>
            
                <div className="my-4 flex items-center justify-end space-x-4">
                    <button className="bg-blue-600 hover:bg-blue-700 rounded-lg px-8 py-2 text-gray-100 hover:shadow-xl transition duration-150 uppercase">Submit</button>
                </div>
            </form>
            
        </div>
    </div>
</div>
  )
}

export default Login
