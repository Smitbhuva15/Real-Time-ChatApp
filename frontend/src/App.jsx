

import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { showtheme } from './FeatchingData/showTheme'
import { useEffect } from 'react'


function App() {

  const theme = useSelector(store => store.theme.theme)
  console.log(theme)
  showtheme()


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
