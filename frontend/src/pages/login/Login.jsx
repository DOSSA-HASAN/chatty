import React, { useState } from 'react'
import AuthImagePattern from '../../components/authImagePattern/AuthImagePattern'
import { Mail, Lock, Eye, EyeClosed, Loader, MessageSquare } from "lucide-react"
import { useAuthStore } from '../../store/useAuthStore'
import { Link } from 'react-router-dom'
import "./login.scss"
import { toast } from 'react-hot-toast'

function Login() {

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const [showPassword, setShowPassword] = useState(false)
  const { isLoggingIn, login } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const validateForm = () => {
    let isValid = true

    if (!formData.email.trim()) {
      toast.error("Email is missing")
      isValid = false;
    }

    if (!emailRegex.test(formData.email.trim())) {
      toast.error("Invalid email format")
      isValid = false
    }

    if (!formData.password.trim()) {
      toast.error("Password is mising")
    }

    return isValid

  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const success = validateForm()
    if (success == true) {
      login(formData)
    }
  }

  return (
    <section className='login-section'>
      <main className="content-left">
        <article className="section-info">
          <MessageSquare className='message-icon' />
          <h1>Welcome Back</h1>
          <p>Sign in to your account</p>
        </article>
        <form onSubmit={handleSubmit}>
          <div className="input-cont">
            <label>Email</label>
            <span>
              <Mail className='mail-icon' />
              <input type="email" placeholder='you@example.com' onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </span>
          </div>
          <div className="input-cont">
            <label>Password</label>
            <span>
              <Lock className='lock-icon' />
              <input type={showPassword ? 'text' : 'password'} placeholder={showPassword ? 'Enter a strong password' : '**********'} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
              <span className='eye-cont'>
                {
                  showPassword ?
                    <Eye className='eye eye-icon' onClick={() => setShowPassword(!showPassword)} />
                    :
                    <EyeClosed className='eye closed-eye-icon' onClick={() => setShowPassword(!showPassword)} />
                }
              </span>
            </span>
          </div>
          <button className='login-btn' type="submit" disabled={isLoggingIn}>
            {
              isLoggingIn ?
                <>
                  <Loader className='animate-spin size-5' />
                  Loading...
                </>
                :
                "Login"
            }
          </button>
          <div className="signup-redirect-cont">
            <p>Don't have an account? <Link to={'/signup'}>Create one</Link></p>
          </div>
        </form>
      </main>
      <figure className="content-right">
        <AuthImagePattern title={"Welcome Back"} text={"Sign in to continue your conversations and catch up with your messages."} />
      </figure>
    </section>
  )
}

export default Login