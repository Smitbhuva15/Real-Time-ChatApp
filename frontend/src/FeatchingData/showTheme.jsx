import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from '../store/ThemeSlice'

const showTheme = () => {
  const displayTheme=   useSelector(store=>store.theme.theme)

    const dispatch=useDispatch()
  const setTheTheme=()=>{
    const Chattheme=localStorage.getItem('chat-Theme')||'fantasy'
    dispatch(useTheme(Chattheme))

  }

  useEffect(() => {  
    setTheTheme()
  }, [displayTheme]);
}

export default showTheme