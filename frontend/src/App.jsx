

import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'


function App() {


  return (
    <>
      <Navbar />
      <Outlet />
      <Toaster
        position="bottom-right"
        reverseOrder={true}
      />
    </>
  )
}

export default App
