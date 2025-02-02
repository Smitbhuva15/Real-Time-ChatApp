import React, { useContext, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { getallmeaasge, setmessageloading } from '../store/messageSlice';
import { AuthContext } from '../contextapi/AuthContext';
import toast from 'react-hot-toast';

import { useDispatch } from 'react-redux';


const GetAllMessage =async () => {
    
    const selecteduser = useSelector((store) => store.message.selecteduser);
       const { token } = useContext(AuthContext)
    const id = selecteduser?._id;
    const dispatch = useDispatch()

  const fetchmessage=async()=>{

    try {
        dispatch( setmessageloading(true))
        const response = await fetch(`http://localhost:5000/user/v2/api/all/message/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if (response.ok) {
            const message = await response.json();
            dispatch(getallmeaasge(message.messages))
        }
        else {
            const errormessage = await response.json();
            console.log(errormessage.message)
        }
    } catch (error) {
        console.log(error)
        toast.error("Internal Network Error!!")
    }
    finally{
        dispatch( setmessageloading(false))

    }
   
  }

  useEffect(() => {
    fetchmessage()
  }, [selecteduser]);
}

export default GetAllMessage