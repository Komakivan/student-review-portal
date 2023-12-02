import React, { useContext, useEffect, useState } from 'react'
import { studentContext } from '../Contexts/studentContext'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom'
import img from '../images/alyani-yang-WajET_vzPmI-unsplash.jpg'
import profile from '../images/5907.jpg'


const Student = () => {
  const [open, setOpen] = useState(false)
  const [classmates, setClassmates] = useState([])

    const toggle = () => {
        setOpen(!open)
    }

  const { student, logOutStudent, ToastContainer } = useContext(studentContext)
//   console.log(student)


  // const notify = () => toast('Login successful')

  const token = localStorage.getItem('user')
  const user = JSON.parse(token)
  const semester = user.semester
  const department = user.department

//   console.log(classmates)

//   const navigate = useNavigate()

  useEffect(() => {
      ( async () => {
        try {
            const request = await fetch('http://localhost:8000/auth/students')
            const response = await request.json()
            const fillteredResponse = response.filter(item => item.semester === semester && item.department === department && item.firstName !== user.firstName)
            setClassmates(fillteredResponse)
            // console.log(fillteredResponse)
        } catch (error) {
            console.log(error)
        }
      })();
  },[department, semester, user.firstName])

  return (
    <div className="h-full bg-gray-200 p-8">
      <ToastContainer/>
    <div className="bg-white rounded-lg shadow-xl pb-8">
        <div  className="absolute right-12 mt-4 rounded">
            <button onClick={toggle}  className="border border-gray-400 p-2 rounded text-gray-300 hover:text-gray-300 bg-gray-100 bg-opacity-10 hover:bg-opacity-20" title="Settings">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                </svg>
            </button>
            <div   className={`bg-white absolute ${open? "block": "hidden"} right-0 w-40 py-2 mt-1 border border-gray-200 shadow-2xl`} >
                <div className="py-2 border-b">
                    <p className="text-gray-400 text-xs px-6 uppercase mb-1">Settings</p>
                    <button onClick={logOutStudent} className="w-full flex items-center px-6 py-1.5 space-x-2 hover:bg-gray-200">
                        <span className="text-sm text-gray-700">Log out</span>
                    </button>
                  
                </div>
            </div>
        </div>
        <div className="w-full md:shrink-0 h-[250px]">
            <img src={img} className=" bg-cover rounded-tl-lg rounded-tr-lg" alt='img' />
        </div>
        <div className="flex flex-col items-center -mt-20">
            <img src={profile} className="w-40 border-4 border-white rounded-full" alt='img' />
            <div className="flex items-center space-x-2 mt-2">
                <p className="text-2xl md:text-slate-200">{ student && student.firstName + ' ' + student.lastName}</p>
            </div>
            <p className="text-gray-700 md:text-gray-400">{ student && student.department}</p>
            <p className="text-sm text-gray-500 md:text-gray-200">Gujarat, India</p>
        </div>
        <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
            <div className="flex items-center space-x-4 mt-2">
                <button className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                <ion-icon name="pencil-outline"></ion-icon>
                    <Link to='/review'>Write a review</Link>
                </button>
           
            </div>
        </div>
    </div>

    {student && (
      <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
      <div className="w-full flex flex-col 2xl:w-1/3">
          <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
              <h4 className="text-xl text-gray-900 font-bold">Personal Info</h4>
              <ul className="mt-2 text-gray-700">
                  <li className="flex border-y py-2">
                      <span className="font-bold w-24">Full name:</span>
                      <span className="text-gray-700">{student.firstName+" "+student.lastName}</span>
                  </li>
                  <li className="flex border-b py-2">
                      <span className="font-bold w-24">Enrollment Number</span>
                      <span className="text-gray-700">{student.rollNumber}</span>
                  </li>
                  <li className="flex border-b py-2">
                      <span className="font-bold w-24">Department</span>
                      <span className="text-gray-700">{student.department}</span>
                  </li>
                  <li className="flex border-b py-2">
                      <span className="font-bold w-24">Semester</span>
                      <span className="text-gray-700">{student.semester}</span>
                  </li>
                  <li className="flex border-b py-2">
                      <span className="font-bold w-24">Mobile:</span>
                      <span className="text-gray-700">{student.phone}</span>
                  </li>
                  <li className="flex border-b py-2">
                      <span className="font-bold w-24">Email:</span>
                      <span className="text-gray-700">{student.email}</span>
                  </li>
                  <li className="flex border-b py-2">
                      <span className="font-bold w-24">Location:</span>
                      <span className="text-gray-700">Ahmedabad</span>
                  </li>
                  <li className="flex border-b py-2">
                      <span className="font-bold w-24">Languages:</span>
                      <span className="text-gray-700">English, Spanish</span>
                  </li>
                  <li className="flex items-center border-b py-2 space-x-2">
                      <span className="font-bold w-24">Elsewhere:</span>
                      <Link to='' title="Twitter">
                          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 333333 333333" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"><path d="M166667 0c92048 0 166667 74619 166667 166667s-74619 166667-166667 166667S0 258715 0 166667 74619 0 166667 0zm90493 110539c-6654 2976-13822 4953-21307 5835 7669-4593 13533-11870 16333-20535-7168 4239-15133 7348-23574 9011-6787-7211-16426-11694-27105-11694-20504 0-37104 16610-37104 37101 0 2893 320 5722 949 8450-30852-1564-58204-16333-76513-38806-3285 5666-5022 12109-5022 18661v4c0 12866 6532 24246 16500 30882-6083-180-11804-1876-16828-4626v464c0 17993 12789 33007 29783 36400-3113 845-6400 1313-9786 1313-2398 0-4709-247-7007-665 4746 14736 18448 25478 34673 25791-12722 9967-28700 15902-46120 15902-3006 0-5935-184-8860-534 16466 10565 35972 16684 56928 16684 68271 0 105636-56577 105636-105632 0-1630-36-3209-104-4806 7251-5187 13538-11733 18514-19185l17-17-3 2z" fill="#1da1f2"></path></svg>
                      </Link>
                      <Link to='' title="LinkedIn">
                          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 333333 333333" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"><path d="M166667 0c92048 0 166667 74619 166667 166667s-74619 166667-166667 166667S0 258715 0 166667 74619 0 166667 0zm-18220 138885h28897v14814l418 1c4024-7220 13865-14814 28538-14814 30514-1 36157 18989 36157 43691v50320l-30136 1v-44607c0-10634-221-24322-15670-24322-15691 0-18096 11575-18096 23548v45382h-30109v-94013zm-20892-26114c0 8650-7020 15670-15670 15670s-15672-7020-15672-15670 7022-15670 15672-15670 15670 7020 15670 15670zm-31342 26114h31342v94013H96213v-94013z" fill="#0077b5"></path></svg>
                      </Link>
                      <Link to='' title="Github">
                          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="0" height="0" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 640 640"><path d="M319.988 7.973C143.293 7.973 0 151.242 0 327.96c0 141.392 91.678 261.298 218.826 303.63 16.004 2.964 21.886-6.957 21.886-15.414 0-7.63-.319-32.835-.449-59.552-89.032 19.359-107.8-37.772-107.8-37.772-14.552-36.993-35.529-46.831-35.529-46.831-29.032-19.879 2.209-19.442 2.209-19.442 32.126 2.245 49.04 32.954 49.04 32.954 28.56 48.922 74.883 34.76 93.131 26.598 2.882-20.681 11.15-34.807 20.315-42.803-71.08-8.067-145.797-35.516-145.797-158.14 0-34.926 12.52-63.485 32.965-85.88-3.33-8.078-14.291-40.606 3.083-84.674 0 0 26.87-8.61 88.029 32.8 25.512-7.075 52.878-10.642 80.056-10.76 27.2.118 54.614 3.673 80.162 10.76 61.076-41.386 87.922-32.8 87.922-32.8 17.398 44.08 6.485 76.631 3.154 84.675 20.516 22.394 32.93 50.953 32.93 85.879 0 122.907-74.883 149.93-146.117 157.856 11.481 9.921 21.733 29.398 21.733 59.233 0 42.792-.366 77.28-.366 87.804 0 8.516 5.764 18.473 21.992 15.354 127.076-42.354 218.637-162.274 218.637-303.582 0-176.695-143.269-319.988-320-319.988l-.023.107z"></path></svg>
                      </Link>
                  </li>
              </ul>
          </div>
      </div>
  </div>
    )}
    

    <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="flex items-center justify-between">
                <h4 className="text-xl text-gray-900 font-bold">Classmates</h4>
                <Link to='#' title="View All">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                    </svg>
                </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-8 mt-8">
                {classmates && classmates.map(student => (
                <Link key={student._id} to='#' className="flex flex-col items-center justify-center text-gray-800 hover:text-blue-600" title="View Profile">
                    <img src={profile} className="w-16 rounded-full" alt='img' />
                    <p className="text-center font-bold text-sm mt-1">{student.firstName + ' '} {student.lastName}</p>
                    <p className="text-xs text-gray-500 text-center">{student.department} student</p>
                </Link>
                ))}
               
            </div>
            </div>

</div>
  )
}

export default Student
