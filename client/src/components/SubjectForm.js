import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const schema = yup.object({
    name: yup.string().required(),
    semester: yup.string().required(),
    department: yup.string().required(),
    code: yup.string().required(),
    teacher: yup.string().required(),
})

const SubjectForm = () => {
    const [teachers, setTeachers] = useState([])
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const navigate = useNavigate()

    const onSubmit = async (data) => {
        try {
            const request = await fetch('http://localhost:8000/faculty/new-subject', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })

            const response = await request.json()
            navigate('/admin')
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() =>{
        (async () => {
            const response = await axios.get('http://localhost:8000/faculty/faculties');
            setTeachers(response.data)
        })();
    },[])

    // console.log(teachers)


  return (
    <div className="w-full py-8">
   
    <div className="bg-white md:max-w-md max-w-md lg:w-2/3 xl:w-[500px] 2xl:w-[550px] mt-8 mx-auto px-16 py-8 rounded-lg shadow-2xl">

        <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">Add new subject</h2>
    
        <form className="my-8 text-sm" onSubmit={handleSubmit(onSubmit)}>

            <div className="flex flex-col my-4">
                <label htmlFor="name" className="text-gray-700">Name</label>
                <input type="text" name="name" id="name" className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900" placeholder="Enter your name" {...register('name')} />
                <p className='text-red-500 py-1'>{errors.name?.message}</p>
            </div>

            <div className="flex flex-col my-4">
                <label htmlFor="email" className="text-gray-700">Semester</label>
                <input type="text" name="email" id="email" className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900" placeholder="Enter your email" {...register('semester')}/>
                <p className='text-red-500 py-1'>{errors.semester?.message}</p>
            </div>

            <div className="flex flex-col my-4">
                <label htmlFor="name" className="text-gray-700">Department</label>
                <input type="text" name="name" id="name" className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900" placeholder="Enter your name" {...register('department')}/>
                <p className='text-red-500 py-1'>{errors.department?.message}</p>
            </div>

            <div className="flex flex-col my-4">
                <label htmlFor="name" className="text-gray-700">Code</label>
                <input type="text" name="name" id="name" className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900" placeholder="Enter your name" {...register('code')}/>
                <p className='text-red-500 py-1'>{errors.code?.message}</p>
            </div>

            <div className="flex flex-col my-4">
                <label htmlFor="name" className="text-gray-700">Teacher</label>
                <select className='mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-gray-900 text-sm' {...register('teacher')}>
                    <option>select</option>
                    {teachers && teachers.map(teacher => (
                        <option key={teacher._id}>{teacher.fullName}</option>
                    ))}
                </select  >
                {/* <input type="text" name="name" id="name" className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900" placeholder="Enter your name" {...register('teacher')}/> */}
                <p className='text-red-500 py-1'>{errors.teacher?.message}</p>
            </div>
            
        
            <div className="my-4 flex items-center justify-end space-x-4">
                <button className="bg-blue-600 hover:bg-blue-700 rounded-lg px-8 py-2 text-gray-100 hover:shadow-xl transition duration-150 uppercase">Submit</button>
            </div>
        </form>
        
    </div>
</div>
  )
}

export default SubjectForm
