import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const schema = yup.object({
    one: yup.string().required(),
    two: yup.string().required(),
    three: yup.string().required(),
    four: yup.string().required(),
    five: yup.string().required(),
    six: yup.string().required(),
    seven: yup.string().required(),
    eight: yup.string().required(),
    nine: yup.string().required(),
    ten: yup.string().required(),
    eleven: yup.string().required(),
    twelve: yup.string().required(),
    reason: yup.string().required(),
    teacher: yup.string().required(),
    subject: yup.string().required(),
            
});


const ReviewForm = () => {
    // const { createReview } = useContext(studentContext)
    const [faculties, setFaculties] = useState([])
    const [subjects, setSubjects] = useState([])
    const [rates, setRates] = useState([])

    
    const userId = JSON.parse(localStorage.getItem('user'))._id
    // console.log(userId)

    const alertBox = (val) => toast.error(val)


    // createing a review
    const createReview = async (data) => {
        try {
            const request = await fetch(`http://localhost:8000/reviews/new-review/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            const response = await request.json()
            if(response.status === false) {
                alertBox(response.message)
            } else {
                navigate('/success')
            }
            console.log(response)
        } catch (error) {
            // setError(error)
            console.log(error)
        }
    }


    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(schema),
        mode: 'all'
    })

    const token = localStorage.getItem('user')
    const student = JSON.parse(token)
    // student semester
    const semester = student.semester
    const department = student.department


    

    const onSubmit = async (data) => {
        createReview(data)
        // console.log(data)
        
    }

    useEffect(() => {
        try {
            Promise.all([
                fetch('http://localhost:8000/faculty/faculties'),
                fetch('http://localhost:8000/faculty/subjects'),
                fetch('http://localhost:8000/auth/rates'),
              ])
                .then(([resFaculties, resSubjects, resRates]) => 
                  Promise.all([resFaculties.json(), resSubjects.json(), resRates.json()])
                )
                .then(([dataFaculties, dataSubjects, dataRates]) => {
                    const fillteredSubjects = dataSubjects.filter(dataSubject => dataSubject.semester === semester && dataSubject.department === department)
                    setSubjects(fillteredSubjects)
                    const fillteredFaculty = dataFaculties.filter(dataFaculty => dataFaculty.department === department)
                    setFaculties(fillteredFaculty)
                    // console.log(dataFaculties)
                    // console.log(fillteredFaculty)
                    setRates(dataRates)
                    // console.log(dataSubjects)
                });
        } catch (error) {
            console.log(error)
        }
       
    },[semester, department])


    const values =  {one:'one', two:'two', three: 'three', four: 'four', five:'five', six:'six', 
    seven:'seven', eight:'eight', nine:'nine', ten:'ten', eleven:'eleven', twelve:'twelve'} 

    const reviewChoice = (position) =>{
        return (
            <select className='p-3 border focus:outline-none text-zinc-700 capitalize text-xl'{...register(position)} >
                <option>Exellent - 20</option>
        {rates.map(rate => (
                    <option key={rate._id} >{rate.rate}-{rate.value}</option>
                ))} 
               
            </select>
        )
    }


  return (
    <div className='max-w-md md:max-w-lg mx-auto mt-8'>
       <ToastContainer/>
        <div className='flex justify-between items-center'>
        <h2 className='text-center text-emerald-500'>Write a review</h2>
        <Link className='text-indigo-500 hover:underline' to='/student'>Exit</Link>
        </div>
      <form className='p-3' onSubmit={handleSubmit(onSubmit)}>

                <div className='flex flex-col g-4'>
                <label className='text-gray-400 capitalize py-2' htmlFor='choice'>Choose Lecturer</label>
                <select className='p-3 border focus:outline-none text-zinc-700 capitalize text-xl' id='choice' {...register('teacher')}>
                    <option>select</option>
                    {faculties.map((faculty) => (
                        <option key={faculty._id}  >{faculty.fullName}</option>
                    ))}
                </select>
                </div>

                <div className='flex flex-col g-4'>
        <label className='text-gray-400 capitalize py-2' htmlFor='choice'>Choose Subject</label>
                <select className='p-3 border focus:outline-none text-zinc-700 capitalize text-xl' id='choice'{...register('subject')} >
                    <option>select</option>
                    {subjects.map((subject) => (
                        <option className='formbold-form-input ' key={subject._id} >{subject.name}</option>
                    ))}
                </select>
                </div>
                
                <div className='flex flex-col g-4'>
                 <label className='text-gray-400 capitalize py-2' htmlFor='one'>1. Has the Teacher covered the entire Syllabus As prescribed
                    by University?
                </label>
                { reviewChoice(values.one)}
                <p className='error'>{errors.one?.message}</p>
                </div>

                <div className='flex flex-col g-4'>
                <label className='text-gray-400 capitalize py-2' htmlFor='two'>2. Has the Teacher covered relevant topics beyond the
                    syllabus
                </label>
                {reviewChoice(values.two)}
                <p className='error'>{errors.two?.message}</p>
                </div>
                
                <div className='flex flex-col g-4'>
                <label className='text-gray-400 capitalize py-2' htmlFor='three'>3. Technical content/ course content</label>
                {reviewChoice(values.three)}
                <p className='error'>{errors.three?.message}</p>
                </div>

                <div className='flex flex-col g-4'>
                <label className='text-gray-400 capitalize py-2' htmlFor='four'>4. Communication skills</label>
                {reviewChoice(values.four)}
                <p className='error'>{errors.four?.message}</p>
                </div>
            
            <div className='flex flex-col g-4'>
            <label className='text-gray-400 capitalize py-2' htmlFor='five'>5. Use Of teaching aids</label>
            {reviewChoice(values.five)}
            <p className='error'>{errors.five?.message}</p>
            </div>
            
            <div className='flex flex-col g-4'>
            <label className='text-gray-400 capitalize py-2' htmlFor='six'>6. Pace on which contents were covered</label>
            {reviewChoice(values.six)}
            <p className='error'>{errors.six?.message}</p>
            </div>
            
            <div className='flex flex-col g-4'>
            <label className='text-gray-400 capitalize py-2' htmlFor='seven'>7. Motivation and inspiration for students to learn</label>
            {reviewChoice(values.seven)}
            </div>
            

         
           
            <div className='flex flex-col g-4'>
            <label className='text-gray-400 capitalize py-2' htmlFor='eight'>8. Practical demonstration</label>
            {reviewChoice(values.eight)}
            <p className='error'>{errors.eight?.message}</p>
            </div>

            <div className='flex flex-col g-4'>
                <label className='text-gray-400 capitalize py-2' htmlFor='nine'>9. Hands-on training</label>
                {reviewChoice(values.nine)}
                <p className='error'>{errors.nine?.message}</p>
                </div>
                
                <div className='flex flex-col g-4'>
                <label className='text-gray-400 capitalize py-2' htmlFor='ten'>10. Clarity of expectation of students</label>
                {reviewChoice(values.ten)}
                <p className='error'>{errors.ten?.message}</p>
                </div>
                    
                <div className='flex flex-col g-4'>
                <label className='text-gray-400 capitalize py-2' htmlFor='eleven'>11. Feedback provided on Student’s progress</label>
                {reviewChoice(values.eleven)}
                <p className='error'>{errors.eleven?.message}</p>
                </div>
                    
                <div className='flex flex-col g-4'>
                <label className='text-gray-400 capitalize py-2' htmlFor='twelve'>12. Willingness to offer help and advice to Students.</label>
                {reviewChoice(values.twelve)}
                <p className='error'>{errors.twelve?.message}</p>
                </div>
                
                <div className='flex flex-col g-4'>
                <label className='text-gray-400 capitalize py-2' htmlFor='reason'>Reasons for your review</label>
                <textarea className='border p-2 h-32 focus:outline-none text-slate-700' {...register('reason')} id='reason'/>
                <p className='text-red-500'>{errors.reason?.message}</p>
                </div>

                <input className='bg-indigo-500 py-2 mt-6 px-7 w-full rounded-md text-slate-100 hover:shadow-md cursor-pointer hover:bg-indigo-700 ' type='submit' disabled={!isValid}/>
    
       
      </form>

      {/* <p>{JSON.stringify(watch(), null, 2)}</p> */}
    </div>
  )
}

export default ReviewForm
