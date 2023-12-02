import React, { useState } from 'react';


const MailPage = () => {
    const [text, setText] = useState('')

    const handleSubmit = async () => {
        try {
            const request = await fetch('http://localhost:8000/mail',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(text) 
            })
            const response = await request.json();
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className=''>
      <div className='max-w-md flex items-center gap-4 mx-auto'>
        <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder='Enter your enrollment Number'/>
        <button onClick={handleSubmit} className='bg-indigo-600 text-white py-2 px-6'>Submit</button>
      </div>
    </div>
  )
}

export default MailPage
