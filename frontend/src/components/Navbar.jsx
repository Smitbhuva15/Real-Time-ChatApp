import React from 'react'
import { Link, useNavigate } from "react-router-dom";

import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { useContext } from 'react';
import { AuthContext } from '../contextapi/AuthContext';

const Navbar = () => {
  const { userData ,Logout} = useContext(AuthContext);
  const navigate=useNavigate()

  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80 "
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/login" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="sm:size-9 size-5 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="sm:w-5 sm:h-5 text-primary w-3 h-3" />
              </div>
              <h1 className="md:text-lg font-bold ">Chatterboxx</h1>
            </Link>
          </div>


          <div className="flex items-center gap-2">
            <Link
              to={"/setting"}
              className={`  btn btn-sm gap-2 transition-colors  `}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {
              userData && userData.email && (
                <div className='flex'>
                  <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                    <User className="size-5" />
                    <span className="hidden sm:inline">Profile</span>
                  </Link>

                  <button className="flex gap-2 items-center ml-2"  onClick={()=>{
                    Logout()
                    navigate('/')
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