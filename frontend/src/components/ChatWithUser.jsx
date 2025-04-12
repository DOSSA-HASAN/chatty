import { X, ImagesIcon, Send } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore';
import ChatSkeleton from './skeleton/ChatSkeleton';
import toast from 'react-hot-toast';
import SendMessage from './SendMessage';

function ChatWithUser() {

    const { selectedUser, setSelectedUser, isMessagesLoading, messages, getMessages, sendMessage } = useChatStore();
    const { onlineUsers, authUser } = useAuthStore();

    useEffect(() => {
        getMessages(selectedUser?._id)
    }, [selectedUser])

    return (
        <section className='chat-with-user-section w-full p-10 flex flex-col justify-between items-center h-full border-2 border-base-200'>
            {/* header */}
            <main className='flex justify-between items-start w-full border-b-2 border-base-200 pb-[10px]'>
                <figure className='flex justify-start items-center h-12'>
                    <img src={selectedUser?.profilePic || '/no-avatar.png'} alt="" className='rounded-full mr-3 h-full border-2' />
                    <figcaption className='flex flex-col justify-center items-start'>
                        <p>{selectedUser?.username || selectedUser?.fullName}</p>
                        <p className='text-green-400'>Online</p>
                    </figcaption>
                </figure>
                <div onClick={() => setSelectedUser(null)} className='hover:cursor-pointer hover:text-red-400'>
                    <X />
                </div>
            </main>
            {/* chats */}
            {
                isMessagesLoading ? <ChatSkeleton /> :
                    <article className='flex flex-col justify-end items-end w-full maxh-[500px] overflow-hidden'>
                        <div className="messages-cont w-full flex flex-col overflow-y-scroll">
                            {
                                messages.map((mssg) => (
                                    <div key={mssg._id} className={`w-full items-start flex ${selectedUser?._id !== mssg.senderId ? 'justify-start flex-row-reverse' : 'justify-start'}`}>
                                        <img src={selectedUser?._id !== mssg.senderId ? selectedUser?.profilePic || "/no-avatar.png" : authUser?.profilePic || "/no-avatar.png"} className='mr-2 ml-2 w-10 h-10 rounded-full border-2' alt="" />
                                        <div className="flex flex-col items-end">
                                            {mssg.image && <img src={mssg.image} alt="" className='w-[150px] h-[150px]'/> }
                                            {mssg.text && <p className={`rounded-md p-3 ${mssg.recieverId !== selectedUser._id ? 'bg-secondary text-secondary-content' : 'bg-primary text-primary-content'}`}>{mssg.text}</p>}
                                            <p className={`font-bold text-[11px] ${selectedUser._id !== mssg.senderId ? 'text-primary' : 'text-secondary'}`}>{mssg.createdAt.split("T")[0]}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </article>
            }

            {/* form and submit btn */}
            <SendMessage />
        </section>
    )
}

export default ChatWithUser
