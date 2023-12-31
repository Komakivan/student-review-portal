import React, { useState } from 'react'

const Modal = ({open, toggle }) => {


  return (
    <div className={`py-12 bg-gray-700 z-40 absolute top-0 left-0 right-0 bottom-0 transition ${!open? 'opacity-0':"opacity-100"} duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0`} id="modal">
                <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                    <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                      
                        <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Edit user details</h1>
                        <label htmlFor="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">First Name</label>
                        <input id="name" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="James" />
                        <label htmlFor="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Last Name</label>
                        <input id="name" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="James" />
                        <label htmlFor="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Email</label>
                        <input id="name" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="James" />
                        <label htmlFor="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">phone</label>
                        <input id="name" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="James" />
                        <label htmlFor="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Department</label>
                        <input id="name" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="James" />
                        <label htmlFor="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Role</label>
                        <input id="name" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="James" />
                      
                        <div className="flex items-center justify-start w-full">
                            <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm">Submit</button>
                            <button  className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-red-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm" >Cancel</button>
                        </div>
                        <button onClick={toggle} className="md:cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-red-400 hover:text-red-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600">
                            close
                        </button>
                    </div>
                </div>
            </div>
  )
}

export default Modal
