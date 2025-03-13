import React, { useState } from 'react'
import { useAuthStore } from '../../store/useAuthStore'
import { Eye, EyeClosed, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react"
import { Link } from 'react-router-dom'
import './signup.scss'
import AuthImagePattern from '../../components/authImagePattern/AuthImagePattern'
import toast from 'react-hot-toast'

function Signup() {

    const { isSigningUp, signUp } = useAuthStore()

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        username: "",
    })

    const validateForm = () => {

        let isValid = true;

        if (!formData.username.trim()){
            toast.error("Username is required!")
            isValid = false;
        }
        

        if (!formData.email.trim()){
            toast.error("Email is required!")
            isValid = false
        } else if(!emailRegex.test(formData.email)){
            toast.error("Invalid email format!")
        }

        if (!formData.password.trim()){
            toast.error("Password is required!")
            isValid = false
        } else if(formData.password.length < 6){
            toast.error("Password length atleast 6 characters long!")
            isValid = false
        }
        
        return isValid
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const success = validateForm();

        if (success == true) {
            signUp(formData)
        }
    }

    return (
        <section className='signup-section'>
            <main className='content-left'>
                <article className="section-info">
                    <MessageSquare className='message-icon' />
                    <h1>Create Account</h1>
                    <p>Get started With your free account today</p>
                </article>
                <form onSubmit={handleSubmit}>
                    <div className="input-cont">
                        <label>Username</label>
                        <span>
                            <User className='user-icon' />
                            <input type="text" placeholder='John Doe' onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
                        </span>
                    </div>
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
                    <button type='submit' className='create-acc-btn' disabled={isSigningUp}>
                        {
                            isSigningUp ?
                                <>
                                    <Loader2 className='size-5 animate-spin' />
                                    Loading...
                                </>
                                :
                                "Create Account"
                        }
                    </button>
                    <div className="login-redirect-cont">
                        <p>Already have an account? <Link to={'/login'}>Sign in</Link></p>
                    </div>
                </form>
            </main>
            <figure className='content-right'>
                <AuthImagePattern title={"Join our community"} text={"Connect with friends, share moments, and stay in touch with loved ones"} />
            </figure>
        </section>
    )
}

export default Signup
