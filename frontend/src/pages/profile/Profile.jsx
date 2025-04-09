import React, { useRef, useState } from 'react'
import './profile.scss'
import { useAuthStore } from '../../store/useAuthStore'
import { Camera, Mail, User } from 'lucide-react';

function Profile() {

  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState()
  const fileInputRef = useRef();

  const handleIconClick = () => {
    if (!isUpdatingProfile) {
      fileInputRef.current.click();
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]

    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image)
      await updateProfile({ base64Image })
    }
  }

  return (
    <section className='profile-section'>

      <main>
        <h1>Profile</h1>
        <p>Your Profile Information</p>
        <figure className='profile-pic-cont'>
          <label htmlFor="avatar-upload" className={isUpdatingProfile ? "animate-pulse" : ""} >
            <img className='profile-pic' src={selectedImage || authUser.profilePic || "/no-avatar.png"} alt="" />
            <Camera size={59} className='cam-icon' onClick={handleIconClick} />
            <input ref={fileInputRef} type="file" accept='image/*' className='hidden' onChange={handleImageUpload} disabled={isUpdatingProfile} />
          </label>
        </figure>
        <p>{isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}</p>

        <form>
          <div className="fullname">
            <span>
              <User />
              <p>Fullname</p>
            </span>
            <input type="text" readOnly value={authUser.username} />
          </div>
          <div className="email">
            <span>
              <Mail />
              <p>Email Address</p>
            </span>
            <input type="text" readOnly value={authUser.email} />
          </div>
        </form>

      </main>

      <article className="account-info">
        <h2>Account Information</h2>
        <div className="member-since">
          <p>Member Since</p>
          <p>{authUser.createdAt?.split("T")[0]}</p>
        </div>
        <div className="hr-line"></div>
        <div className="account-status ">
          <p>Account Status</p>
          <p><span style={{ color: "#62bd62" }}>Active</span></p>
        </div>
      </article>
    </section>
  )
}

export default Profile
