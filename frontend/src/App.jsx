import { Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import Home from "./pages/home/Home"
import Signup from "./pages/signup/Signup"
import Login from "./pages/login/Login"
import Profile from "./pages/profile/Profile"
import Settings from "./pages/settings/Settings"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import { Loader } from 'lucide-react'
import {Toaster} from "react-hot-toast"
import { useThemeStore } from "./store/useThemeStore"

function App() {

  const { authUser, checkUser, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkUser();
  }, [])


  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className='size-10 animate-spin' />
      </div>
    )

  return (
    <section data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to={'/login'} />} />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to={'/'} />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to={'/'} />} />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to={'/login'} />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <Toaster />
    </section>
  )
}

export default App
