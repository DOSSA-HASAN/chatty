import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"
import { io } from "socket.io-client"

const BASE_URL = "http://localhost:5123"

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkUser: async () => {
        try {
            const res = await axiosInstance.get('/auth/check')
            const userData = JSON.parse(JSON.stringify(res.data))
            set({ authUser: userData })
            get().connectSocket();
        } catch (error) {
            console.log(`Error in checkUser: ${error.stack}`)
            console.log(`Error in checkUser: ${error.message}`)
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signUp: async (data) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post('/auth/register', data)
            toast.success("Signup success")
            set({ authUser: res.data })

        } catch (error) {
            console.log(`An error occured while signing up user: ${error.stack}`)
            toast.error("An error occurred please try again")
        } finally {
            set({ isSigningUp: false })
        }
    },

    logout: async () => {
        try {
            const res = await axiosInstance.post('/auth/logout')
            toast.success("User logged out successfully")
            set({ authUser: null })
            get().disconnectSocket();

        } catch (error) {
            toast.error("Could not logout user")
            console.log(error.response.data.message)
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true })
        try {
            const res = await axiosInstance.post('/auth/login', data)
            toast.success("Logged in successfully")
            set({ authUser: res.data.user })
            get().connectSocket();
        } catch (error) {
            toast.error("Unable to login user")
            console.log(error.response.data.message)
        } finally {
            set({ isLoggingIn: false })
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true })

        try {

            const res = await axiosInstance.put("/auth/update-profile", data)
            set({ authUser: res.data, isUpdatingProfile: false })
            toast.success("Profile updated successfully")

        } catch (error) {
            console.log(error.message)
            toast.error("An error occured while updating your profile pic\nPlease try again later.")
            set({ isUpdatingProfile: false })
        }
    },

    connectSocket: () => {
        const { authUser } = get()
        if (!authUser || get().socket?.connected) return;
        const socket = io(BASE_URL, {query: { userId: authUser._id }})
        // socket.connect()
        socket.on("connect", () => {
            console.log("Connected to socket server")
        })
        set({ socket: socket })
        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds })
            console.log(userIds)
        })
    },

    disconnectSocket: () => {
        const socket = get().socket;
        if (socket?.connected) {
            socket.disconnect();
        }
        set({ socket: null })
    },
}))