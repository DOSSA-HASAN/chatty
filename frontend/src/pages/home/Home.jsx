import React from 'react'
import PlaceHolder from '../../components/PlaceHolder'
import Sidebar from '../../components/Sidebar'
import { useChatStore } from '../../store/useChatStore'
import Chat from '../../components/Chat';

function Home() {

  const { selectedUser } = useChatStore();

  return (
    <section className='flex justify-between items-end h-screen pb-3'>
      <Sidebar />
      {
        selectedUser ? <Chat /> : <PlaceHolder /> 
      }
    </section>
  )
}

export default Home
