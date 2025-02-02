import React from 'react'
import feachingalluser from '../FeatchingData/feachingalluser'
import { useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import NoChatSelected from '../components/NoChatSelected';
import ChatContainer from '../components/ChatContainer';

const Home = () => {

  feachingalluser();

  const users = useSelector(store => store.message.Alluser)
  const selecteduser = useSelector(store => store.message.selecteduser)



  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full md:max-w-6xl h-[calc(100vh-8rem)] ">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar users={users} />
            {
              selecteduser ?<ChatContainer /> :<NoChatSelected />  
            }


          </div>
        </div>
      </div>
    </div>
  )
}

export default Home