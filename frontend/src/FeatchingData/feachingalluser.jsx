import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../contextapi/AuthContext';
import { useDispatch } from 'react-redux';
import { getalluser, setloding } from '../store/messageSlice';

const feachingalluser = async () => {
    
    const { token } = useContext(AuthContext)
    const dispatch = useDispatch()
    const apiUrl = import.meta.env.VITE_API_URL;

    const Getusers = async () => {
        dispatch(setloding(true))
        try {
            const response = await fetch(`${apiUrl}/user/v2/api/other/user`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
           
            if (response.ok) {
                const message = await response.json();
              
                dispatch(getalluser(message.users))
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
          dispatch(setloding(false))
        }

    }

    useEffect(() => {
        Getusers()
    }, []);


}

export default feachingalluser