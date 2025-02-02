import React, { useContext } from 'react'
import { AuthContext } from '../contextapi/AuthContext'
import { useNavigate } from 'react-router-dom'

const ProtectHome = () => {
    const { userData } = useContext(AuthContext)
    const token=localStorage.getItem('token')
    const navigate = useNavigate()
    if (! token) {
        navigate('/login')
    }
}

export default ProtectHome