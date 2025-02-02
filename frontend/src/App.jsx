

import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'

import { useEffect } from 'react'
import showTheme from './FeatchingData/showTheme'



function App() {

  showTheme()
  const theme = useSelector(store => store.theme.theme)

  


  return (

    <div data-theme={theme}>
      <Navbar />
      <Outlet />
      <Toaster
        position="bottom-right"
        reverseOrder={true}
      />
    </div>

  )
}

export default App
