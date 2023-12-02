import React, { useContext, useState, useEffect } from 'react'
import { facultyContext } from '../Contexts/facultyContext'
import axios from 'axios'

const SubjectTable = () => {
    const [items, setItems] = useState([])
    const { subjects } = useContext(facultyContext)

    // console.log(subjects)

    const handleDelete = async (id) => {
        try {
            const request = await axios.delete(`http://localhost:8000/faculty/delete-subject/${id}`)
            const response = request.data

            // Update the teachers state by filtering out the deleted teacher
            setItems((prevItems) => prevItems.filter((item) => item._id !== response._id));
            console.log(response)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        setItems(subjects)
    },[subjects])


  return (
    <div className="container mt-20 max-w-md md:max-w-full mx-auto px-4 sm:px-8">
        <table className="min-w-full border-collapse block md:table">
                <thead className="block md:table-header-group">
                    <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Name</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Semester</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Department</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Professor</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Subject code</th>
                        <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Actions</th>
                    </tr>
                </thead>
                <tbody className="block md:table-row-group">
                    {items && items.map(subject => (
                    <tr key={subject._id} className="bg-gray-300 border border-grey-500 md:border-none block md:table-row">
                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">name</span>{subject.name}</td>
                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Semester</span>{subject.semester}</td>
                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Department</span>{subject.department}</td>
                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Professor</span>{subject.teacher}</td>
                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Subject code</span>{subject.code}</td>
                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                            <span className="inline-block w-1/3 md:hidden font-bold">Actions</span>
                            <button className="bg-blue-500 mr-2 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded">Edit</button>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded" onClick={() => handleDelete(subject._id)}>Delete</button>
                        </td>
                    </tr>
                    ))}
                   	
                </tbody>
            </table>
    </div>

  )
}

export default SubjectTable
