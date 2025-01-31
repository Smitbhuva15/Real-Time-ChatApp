import React from 'react'
import { useSelector } from 'react-redux'

const ChatContainer = () => {
    const selecteduser = useSelector(store => store.message.selecteduser)

  console.log(selecteduser)
  return (
    <div></div>
  )
}

export default ChatContainer