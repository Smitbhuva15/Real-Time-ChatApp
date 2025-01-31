import React from 'react'
import { useSelector } from 'react-redux'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'

const ChatContainer = () => {
  const selecteduser = useSelector(store => store.message.selecteduser)
 

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />


      <MessageInput />
    </div>
  )
}

export default ChatContainer