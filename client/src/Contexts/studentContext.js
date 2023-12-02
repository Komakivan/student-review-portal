import React, {  useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom';
// import { decodeToken } from 'react-jwt'
import jwt_decode from "jwt-decode";
import { ToastContainer, toast} from 'react-toastify'



export const studentContext = createContext({
    student: null,
    setStudent: () => null,
})


export const StudentContextProvider = ({ children }) => {
    const [student, setStudent] = useState(null)
    const [isauthenticated, setIsAuthenticated] = useState(false)
    const [userId, setUserId] = useState(null)
    

    const navigate = useNavigate()

    const notify = () => toast('Login successful')
    const regToast = () => toast('Registration successful')

    const errorAlert = (val) => toast.error(val)

    // registering the user
    const registerStudent = async(data) => {

        try {
            const request = await fetch('http://localhost:8000/auth/register', {
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
            regToast()
            navigate('/login')
        }
        console.log(response)
        } catch (error) {
            console.log(error)
        }
        
    }

    // Logging in user
    const loginStudent = async(data) => {

        try {
            const request = await fetch('http://localhost:8000/auth/login', {
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
        const  user = token.user
    
        setUserId(user._id)
        console.log(user._id)
        setStudent(user)
        localStorage.setItem('user', JSON.stringify(user))
        // const currentStudent = localStorage.getItem('user')
        // const parsed = JSON.parse(currentStudent)
        // console.log(parsed)
    
    
        setIsAuthenticated(!isauthenticated)
        navigate('/student')
        notify()
    }

        } catch (error) {
            console.log(error)
        }
    
    }

        

    


    // console.log(error)

    const logOutStudent = () => {
        localStorage.removeItem('user')
        setIsAuthenticated(false)
        navigate('/login')
    }

    console.log(userId)


    // keeping the user in the session
    useEffect(() => {
        try {
            const user = localStorage.getItem('user')
            if(user) {
                const parsed = JSON.parse(user)
                setStudent(parsed)
                setUserId(parsed._id)
                setIsAuthenticated(true)
            } 
        } catch (error) {
            console.log(error)
        }
    },[userId])

    const value = {student, setStudent, registerStudent, 
        loginStudent, logOutStudent, isauthenticated, ToastContainer}
    return (
        <studentContext.Provider value={value}>
            {children}
        </studentContext.Provider>
    )
}