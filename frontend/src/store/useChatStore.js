import { create } from "zustand"
import toast from "react-hot-toast"
import { axiosInstance } from "../lib/axios"

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async (_id) => {
        set({ isUsersLoading: true })
        try {
            const res = await axiosInstance.get('/message/users', _id)
            set({ users: res.data })

        } catch (error) {
            console.log(error.message)
            toast.error("Error getting contacts!")
        } finally {
            set({ isUsersLoading: false })
        }
    },

    getMessages: async (id) => {
        set({ isMessagesLoading: true })
        try {
            const res = await axiosInstance.get(`/message/${id}`)
            set({ messages: res.data })
        } catch (error) {
            toast.error("An error occurred while retireving messages!")
            console.log(error.stack)
        } finally {
            set({ isMessagesLoading: false })
        }
    },

    sendMessages: async (messageData) => {
        const { selectedUser, messages } = get()
        try {
            const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData)
            set({ messages: [...messages, res.data]})

        } catch (error) {
            console.log(error.message)
            toast.error("Failed to send message")
        }
    },

    //optimize this one later
    setSelectedUser: (user) => set({ selectedUser: user }),

}))