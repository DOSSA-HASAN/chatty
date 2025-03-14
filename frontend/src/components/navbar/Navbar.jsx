import React, { useState } from 'react'
import './navbar.scss'
import { useAuthStore } from '../../store/useAuthStore'
import { MessageSquare, Settings, User, LogOut, Menu, X } from "lucide-react"
import { Link } from "react-router-dom"

const Navbar = () => {

  const { authUser, logout } = useAuthStore()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <nav className='navbar'>
        <figure className="logo-cont">
          <MessageSquare className="message-icon" />
          <p>Chatty</p>
        </figure>
        <main className="account-options">
          <Link className="setting">
            <Settings className="icon" />
            <p>Settings</p>
          </Link>
          <Link className={authUser != null ? "profile" : "hide"}>
            <User className="icon" />
            <p>Profile</p>
          </Link>
          <div onClick={logout} className={authUser ? "logout" : "hide"}>
            <LogOut className="icon" />
            <p>Logout</p>
          </div>
        </main>
      </nav>
      <nav className='navbar-mobile'>
        <figure className="header">
          <div className="logo-cont">
            <MessageSquare className="message-icon" />
            <p>Chatty</p>
          </div>
          {
            isMenuOpen ?
              <X onClick={() => setIsMenuOpen(!isMenuOpen)} size={36} className='menu-icon' />
              :
              <Menu onClick={() => setIsMenuOpen(!isMenuOpen)} size={36} className='menu-icon' />
          }
        </figure>
        <main className={isMenuOpen ? "account-options showMobileOptions" : "account-options"}>
          <Link className="setting">
            <Settings className="icon" />
            <p>Settings</p>
          </Link>
          <Link className={authUser != null ? "profile" : "hide"}>
            <User className="icon" />
            <p>Profile</p>
          </Link>
          <div onClick={logout} className={authUser ? "logout" : "hide"}>
            <LogOut className="icon" />
            <p>Logout</p>
          </div>
        </main>
      </nav >
    </>


  )
}

export default Navbar
