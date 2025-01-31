import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getuserSelect } from '../store/messageSlice'
import { X } from "lucide-react";

const ChatHeader = () => {
    const selecteduser = useSelector(store => store.message.selecteduser)
    const diapatch=useDispatch()

    return (
        <div className="p-2.5 border-b border-base-300">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">

                    <div className="avatar">
                        <div className="size-10 rounded-full relative">
                            <img src={selecteduser.profilePic || "/avatar.png"} alt={selecteduser.fullName} />
                        </div>
                    </div>


                    <div>
                        <h3>{selecteduser?.fullName}</h3>

                        {/* <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p> */}
                    </div>
                </div>


                <button onClick={() =>{diapatch(getuserSelect(null))}} >
                    <X />
                </button>
            </div>
        </div>
    )
}

export default ChatHeader