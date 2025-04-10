import React from 'react'
import { Send } from 'lucide-react'

function ChatSkeleton() {

    const messages = new Array(5).fill(" ")

    return (
        <section className='w-full flex flex-col justify-end items-end border-base-300'>
            {
                messages.map((mssg, idx) => (
                    <div className={idx % 2 == 0 ? 'flex justify-start w-full' : 'flex justify-end w-full'}>
                        <div className={idx % 2 == 0 ? 'flex flex-col justify-start items-start animate-pulse bg-base-300 text-primary-content w-1/2 h-20 rounded-md p-3 m-3' : 'flex flex-col justify-end items-end animate-pulse bg-base-300 text-secondary-content w-1/2 h-20 rounded-md p-3 m-3'}>
                        </div>
                    </div>
                ))
            }
            <form className='w-full flex justify-between items-center'>
                <input type="text" readOnly value="Type a message" className='w-[90%] h-13 p-5 border-2 border-secondary rounded-md focus:outline-none' />
                <button className='btn btn-primary p-5 h-13 rounded-md hover:cursor-not-allowed' disabled>
                    <Send className='send-icon' size={40} />
                </button>
            </form>
        </section>
    )
}

export default ChatSkeleton
