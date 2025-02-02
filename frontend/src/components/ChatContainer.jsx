import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import GetAllMessage from '../FeatchingData/GetAllMessage'
import { AuthContext } from '../contextapi/AuthContext'
import { formatMessageTime } from '../../../backend/utils/formatMessageTime'
import  MessageSkeleton from '../components/skeleton/MessageSkeletor'
import {io} from 'socket.io-client'



const socket=io(`http://localhost:5000`)


const ChatContainer = () => {
  GetAllMessage()
  const  messages = useSelector(store => store.message.Allmessages)
 
  const [Allmessages, setAllMessages] = useState(messages || []);

 
  const {userData}=useContext(AuthContext)
  const selecteduser = useSelector((store) => store.message.selecteduser);
  const  ismessageLoding = useSelector((store) => store.message.ismessageLoding);
  
  useEffect(() => {
    if (userData) {
      socket.emit('join-room', userData._id);
    }
   
   setAllMessages(messages || []); 

    socket.on('recive-message', (message) => {
      console.log(message)
      setAllMessages((prevMessages) => [...prevMessages, message]);
    });

   
    return () => {
      socket.off('recive-message');
    };
  }, [userData, messages, socket]);
 
  if ( ismessageLoding) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        < MessageSkeleton />
        <MessageInput />
      </div>
    );
  }
  

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
         { Array.isArray(Allmessages) && Allmessages.map((message) => (
                  <div
                    key={message._id}
                    className={`chat ${message.senderId === userData._id ? "chat-end" : "chat-start"}`}
                 
                  >
                    <div className=" chat-image avatar">
                      <div className="size-10 rounded-full border">
                        <img
                          src={
                            message.senderId === userData._id
                              ? userData.profilephoto || "/avatar.png"
                              : selecteduser.  profilephoto || "/avatar.png"
                          }
                          alt="profile pic"
                        />
                      </div>
                    </div>
                    <div className="chat-header mb-1">
                      <time className="text-xs opacity-50 ml-1">
                        {formatMessageTime(message.createdAt)}
                      </time>
                    </div>
                    <div className="chat-bubble flex flex-col">
                      {message.image && (
                        <img
                          src={ message.image }
                          alt="Attachment"
                          className="sm:max-w-[200px] rounded-md mb-2"
                        />
                      )}
                      {message.file &&(
                         <img
                         src={message.file}
                         alt="Attachment"
                         className="sm:max-w-[200px] rounded-md mb-2"
                       />
                      )

                      }
                      {message.text && <p>{message.text}</p>}
                    </div>
                  </div>
                ))}
      </div>


      <MessageInput socket={socket}/>
    </div>
  )
}

export default ChatContainer