import React, { useContext, useEffect, useState } from 'react'
import { facultyContext } from '../Contexts/facultyContext'
import axios from 'axios'

const StudentTable = () => {
    const [users, setUsers] = useState([])
    const { students } = useContext(facultyContext)

    // console.log(users)

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8000/auth/delete/${id}`)
            // Assuming your server returns a response with a specific structure
                if (response.data) {
                    setUsers((prevUsers) => prevUsers.filter(user => user._id !== response.data._id));
                } else {
                    console.error("Delete operation failed..");
                }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setUsers(students)
    },[students])

  return (
    <div className="container mt-20 max-w-md md:max-w-full mx-auto px-4 sm:px-8">
        <table className="min-w-full border-collapse block md:table">
                <thead className="block md:table-header-group">
                    <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Name</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Email Address</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Department</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Semester</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Mobile</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Actions</th>
                    </tr>
                </thead>
                <tbody className="block md:table-row-group">
                    {users && users.map(student => (
                    <tr key={student._id} className="bg-gray-300 border border-grey-500 md:border-none block md:table-row">
                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">name</span>{student.firstName+ ' '}{student.lastName}</td>
                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Email Address</span>{student.email}</td>
                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Department</span>{student.department}</td>
                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Semester</span>{student.semester}</td>
                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Mobile</span>{student.phone}</td>
                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                            <span className="inline-block w-1/3 md:hidden font-bold">Actions</span>
                            <button className="bg-blue-500 mr-2 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded">Edit</button>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded" onClick={() => handleDelete(student._id)}>Delete</button>
                        </td>
                    </tr>
                    ))}
                   	
                </tbody>
            </table>
    </div>

  )
}

export default StudentTable