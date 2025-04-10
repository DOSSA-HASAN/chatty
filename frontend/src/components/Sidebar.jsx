import { Users2 } from 'lucide-react'
import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'
import SidebarSkeleton from './skeleton/SidebarSkeleton'

function Sidebar() {

  const { messages, users, selectedUser, isUsersLoading, isMessagesLoading, getUsers, getMessages, setSelectedUser } = useChatStore();
  const { authUser } = useAuthStore()
  const onlineUsers = []

  useEffect(() => {
    getUsers(authUser._id);
    console.log(selectedUser)
  }, [getUsers])

  return (
    <section className='sidebar-section bg-base-100 flex flex-col justify-start item-start h-full flex-1 overflow-scroll p-[13px] border-r-2 border-base-primary'>
      <figure className='flex justify-start items-center'>
        <Users2 />
        <p>Contacts</p>
      </figure>
      {
        users.length === 0 ? <SidebarSkeleton /> : 

        users.map((user) => (
          <div className="p-3 mt-3 mb-t-3 flex justify-start items-center bg-base-300 rounded-lg" onClick={() => setSelectedUser(user.id)}>
            <img className=" mr-10 rounded-full bg-base-300 w-20 h-20" src={user.profilePic || "/no-avatar.png"} alt="" />
            <span>
              <p>{user?.fullName || user.username}</p>
              <p className='text-base-secondary'>Online</p>
            </span>
          </div>
        ))
      }
    </section>
  )
}

export default Sidebar
