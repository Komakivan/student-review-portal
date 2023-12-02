import { Button } from '@mui/material';
import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { BeatLoader } from 'react-spinners';
import { facultyContext } from '../Contexts/facultyContext';


const DetailPage = () => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams()

    const navigate = useNavigate()

    const { faculties } = useContext(facultyContext)


      useEffect(() =>{
        (async () => {
          // setIsLoading(!isLoading);
          try {
            const request = await fetch(`http://localhost:8000/faculty/${id}`)
            const response = await request.json()
            setUser(response)
            setIsLoading(false)
          } catch (error) {
            console.log(error)
            setIsLoading(!isLoading)
          }
        })();
      },[id,isLoading])

        // if(!isLoading) {
        //   return <BeatLoader  loading={!isLoading}/>
        // } else

    const deleteUser = async () => {
        try {
          const request = await fetch(`http://localhost:8000/faculty/delete-faculty/${id}`, {
            method: 'DELETE',
          })
          const response = await request.json()
          faculties.pop(response)
          console.log(response)
          navigate('/admin')
        } catch (error) {
          console.log(error)
        }
    }

  return (
    <div>
      <h2>This is the detail page</h2>
      {/*  */}
      <div>
        {user && !isLoading? user.firstName: <BeatLoader size={10} color={'#12b886'}/>}
        <Button style={{color:'red'}} onClick={deleteUser}>delete</Button>
        </div>

    </div>
  )
}

export default DetailPage
