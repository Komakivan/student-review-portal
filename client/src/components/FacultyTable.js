import React, { useContext, useState, useEffect } from 'react'
import { facultyContext } from '../Contexts/facultyContext'
import axios from 'axios'

const FacultyTable = () => {
        const [teachers, setTeachers] = useState([])

    const { faculties } = useContext(facultyContext)

    const handleDelete = async (id) => {
        try {
            const request = await axios.delete(`http://localhost:8000/faculty/delete-faculty/${id}`)
            const response = request.data

            // Update the teachers state by filtering out the deleted teacher
            setTeachers((prevTeachers) => prevTeachers.filter((teacher) => teacher._id !== response._id));
            console.log(response)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        setTeachers(faculties)
    },[faculties])


    // console.log(faculties)

  return (
    <div className="container mt-20 max-w-md md:max-w-full mx-auto px-4 sm:px-8">
        <table className="min-w-full border-collapse block md:table">
                <thead className="block md:table-header-group">
                    <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Name</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Email Address</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Role</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Department</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Mobile</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Actions</th>
                    </tr>
                </thead>
                <tbody className="block md:table-row-group">
                    {teachers && teachers.map(faculty => (
                    <tr key={faculty._id} className="bg-gray-300 border border-grey-500 md:border-none block md:table-row">
                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">name</span>{faculty.fullName}</td>
                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Email Address</span>{faculty.email}</td>
                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Role</span>{faculty.role}</td>
                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Department</span>{faculty.department}</td>
                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Mobile</span>{faculty.phone}</td>
                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                            <span className="inline-block w-1/3 md:hidden font-bold">Actions</span>
                            <button className="bg-blue-500 mr-2 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded">Edit</button>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded" onClick={() => handleDelete(faculty._id)}>Delete</button>
                        </td>
                    </tr>
                    ))}
                   	
                </tbody>
            </table>
    </div>

  )
}

export default FacultyTable
