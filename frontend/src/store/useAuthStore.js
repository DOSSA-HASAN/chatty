import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkUser: async () => {
        try {
            const res = await axiosInstance.get('/auth/check')
            const userData = JSON.parse(JSON.stringify(res.data))
            set({ authUser: userData })
        } catch (error) {
            console.log(`Error in checkUser: ${error.stack}`)
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
        } catch (error) {
            toast.error("Unable to login user")
            console.log(error.response.data.message)
        } finally {
            set({ isLoggingIn: false })
        }
    }
}))