import React from 'react'
import { useChatStore } from '../store/useChatStore'
import SidebarSkeleton from './skeleton/SidebarSkeleton'
import ChatSkeleton from './skeleton/ChatSkeleton'
import ChatWithUser from './ChatWithUser'

function Chat() {

    const { users, selectedUser } = useChatStore()

    return (
        <section className='flex flex-3 h-full'>
            {
                selectedUser ? <ChatWithUser /> : <ChatSkeleton />
            }
        </section>
    )
}

export default Chat
