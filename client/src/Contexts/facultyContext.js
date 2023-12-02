import React, { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { toast } from 'react-toastify';



export const facultyContext = createContext({
    faculty: null,
    setFaculty: () => null,
})


export const FacultyContextProvider = ({ children }) => {
    const [faculty, setFaculty] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userId, setUserId] = useState(null)
    const [subjects, setSubjects] = useState([])
    const [students, setStudents] = useState([])
    const [faculties, setFaculties] = useState([])

    const navigate = useNavigate()

    const registerFaculty = async(data) => {

        try {
            const request = await fetch('http://localhost:8000/faculty/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const response = await request.json()
        if(response.status === false) {
            errorAlert(response.message)
        } else {
            setFaculties([...faculties, response])
            console.log(response)
            navigate('/admin')
        }
        } catch (error) {
            console.log(error)
        }
        
    }

    const errorAlert = (val) => toast.error(val)


    const loginFaculty = async(data) => {

        try {
            const request = await fetch('http://localhost:8000/faculty/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    const response = await request.json()
    if(response.status === false) {
        errorAlert(response.message)
    } else {

        const token = jwt_decode(response.token)
        const  faculty = token.user
    
        setUserId(faculty._id)
        console.log(faculty._id)
        setFaculty(faculty)
        localStorage.setItem('faculty', JSON.stringify(faculty))
        setIsLoggedIn(true)
        if(faculty.role === 'admin') {
            navigate('/admin')
        } else {
            navigate('/faculty')
        }
    }

        } catch (error) {
            console.log(error)
        }
    
    }

    const logOutFaculty = () => {
        localStorage.removeItem('faculty')
        navigate('/faculty-login')
    }

    // Fetching faculties, subjects and students
    useEffect(() => {
        try {
          Promise.all([
              fetch('http://localhost:8000/faculty/faculties'),
              fetch('http://localhost:8000/faculty/subjects'),
              fetch('http://localhost:8000/auth/students'),
            ])
              .then(([resFaculties, resSubjects, resStudents]) => 
                Promise.all([resFaculties.json(), resSubjects.json(), resStudents.json()])
              )
              .then(([dataFaculties, dataSubjects, dataStudents]) => {
                  setFaculties(dataFaculties)
                  setSubjects(dataSubjects)
                  setStudents(dataStudents)
                //   console.log(dataStudents)
              });
      } catch (error) {
          console.log(error)
      }
    
      },[])
    // console.log(userId)

    useEffect(() => {
        try {
            const user = localStorage.getItem('faculty')
            if(user) {
                const parsed = JSON.parse(user)
                setFaculty(parsed)
                setUserId(parsed._id)
                setIsLoggedIn(true)
                // if(parsed.role === 'admin') {
                //     navigate('/admin')
                // } else {
                //     navigate('/faculty')
                // }
            
                console.log(userId)
            }
        } catch (error) {
            console.log(error)
        }
    },[navigate, userId])

    const value = {faculty, setFaculty, registerFaculty,
         logOutFaculty, loginFaculty, userId, isLoggedIn,
          setIsLoggedIn, students,faculties,subjects}
    return (
        <facultyContext.Provider value={value}>
            {children}
        </facultyContext.Provider>
    )
}