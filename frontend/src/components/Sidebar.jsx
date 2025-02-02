import React from 'react'
import { Users } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getuserSelect } from '../store/messageSlice';
import SideBarSkeleton from './skeleton/SideBarSkeleton';



const Sidebar = ({users}) => {

    const navigate=useNavigate()
    const dispatch=useDispatch()
   const  isAllUserLoding=useSelector(store=>store.message.isAllUserLoding)


   if(isAllUserLoding){
    return(
      <SideBarSkeleton />
    )
   }
 
  return (
  <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
     <div className="border-b border-base-300 w-full p-5">

        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        {/* : Online filter toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
              Total Users:  {users.length+1}
            </label>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
      {users.map((user) => (
          <button
            key={user._id}
            onClick={()=>{
                dispatch( getuserSelect(user))
            }}

         
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
        
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilephoto || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
              {users.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

           
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
              
              </div>
            </div>
          </button>
        ))}


    {users.length === 0 && (
          <div className="text-center text-zinc-500 py-4">Users Not Found</div>
        )}
      </div>
  </aside>
  )
}

export default Sidebar