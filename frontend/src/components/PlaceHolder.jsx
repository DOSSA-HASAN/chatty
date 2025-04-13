import { MessageSquare } from 'lucide-react'
import React from 'react'

function PlaceHolder() {
  return (
    <section className='h-screen bg-transparent home-page-content-right flex justify-center flex-col items-center flex-3 hidden sm:flex'>
        <figure className='rounded-[20px] p-3 w-min border-primary border-1 flex justify-center animate-bounce'>
           <MessageSquare size={49} />
        </figure>
        <h2 className='text-base-primary font-bold  text-[30px]'>Welcome to Chatty!</h2>
        <p className='text-base-primary font-medium'>Select a conversation from the side bar to start chatting</p>
    </section>
  )
}

export default PlaceHolder
