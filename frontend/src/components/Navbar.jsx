import React from 'react'
import { Link, useNavigate } from "react-router-dom";

import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { useContext } from 'react';
import { AuthContext } from '../contextapi/AuthContext';

const Navbar = () => {
  const { userData, Logout} = useContext(AuthContext);
  const navigate = useNavigate()
  const token = localStorage.getItem('token');

  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80 "
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            {
              token
                ?
                (<Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
                  <div className="sm:size-9 size-5 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="sm:w-5 sm:h-5 text-primary w-3 h-3" />
                  </div>
                  <h1 className="md:text-lg font-bold ">ChatterWave</h1>
                </Link>)
                :
                (<Link to="/login" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
                  <div className="sm:size-9 size-5 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="sm:w-5 sm:h-5 text-primary w-3 h-3" />
                  </div>
                  <h1 className="md:text-lg font-bold ">ChatterWave</h1>

                </Link>)
            }



          </div>


          <div className="flex items-center gap-2">
            <Link
              to={"/setting"}
              className={`  btn sm:btn-sm sm:gap-2 gap-1 transition-colors btn-xs `}
            >
              <Settings className="sm:w-4 sm:h-4  w-3 h-3" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {
              userData && userData.email && (
                <div className='flex'>
                  <Link to={"/profile"} className={`btn sm:btn-sm sm:gap-2 gap-1 transition-colors btn-xs`}>
                    <User className="sm:size-5 size-3" />
                    <span className="hidden sm:inline">Profile</span>
                  </Link>

                  <button className="flex gap-2 items-center ml-2" onClick={() => {
                    Logout()
                    navigate('/login')
                  }}>
                    <LogOut className="size-5" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar