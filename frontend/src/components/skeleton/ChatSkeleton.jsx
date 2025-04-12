import React from 'react'
import { Send } from 'lucide-react'

function ChatSkeleton() {

    const messages = new Array(7).fill(" ")

    return (
        <section className='w-full flex p-3 flex-col border-base-300 maxh-[60%] overflow-hidden'>
            {
                messages.map((mssg, idx) => (
                    <div key={idx} className={`flex flex mt-2 ${idx % 2 === 0 ? "justify-start items-start" : "justify-end items-end flex-row-reverse"}`}>
                        <div className="rounded-full w-15 h-15 bg-base-300 mr-2 animate-pulse"></div>
                        <div className={`flex w-full flex-col animate-pulse ${idx % 2 === 0 ? "justify-start items-start" : "justify-end items-end"}`}>
                            <div className="w-[50%] bg-base-300 h-10 rounded-md mb-2 animate-pulse"></div>
                            <div className="w-[20%] bg-base-300 h-5 rounded-md animate-pulse"></div>
                        </div>
                    </div>
                ))
            }
        </section>
    )
}

export default ChatSkeleton
