import React, { useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import { ImagesIcon, Send, X } from 'lucide-react';
import toast from 'react-hot-toast';

function SendMessage() {


    const { selectedUser, setSelectedUser, isMessagesLoading, messages, getMessages, sendMessages } = useChatStore();
    const { onlineUsers } = useAuthStore();

    //for the form container
    const [messageTyped, setMessageTyped] = useState("")
    const fileInputRef = useRef()
    const [imagePreview, setImagePreview] = useState(null)

    const handleImageChange = (e) => {
        const file = e.target.files[0]

        if (!file.type.startsWith('image/')) {
            toast.error("Please select an image")
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result)
        }
        reader.readAsDataURL(file)


    }

    const removeImage = (e) => {
        setImagePreview(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    const handleSendMessage = async (e) => {
        e.preventDefault()
        if (!messageTyped.trim() && !imagePreview) {
            toast.error("Please type a message or select an image to be sent")
            return;
        }

        try {
            await sendMessages({
                text: messageTyped.trim(),
                image: imagePreview
            })
            setMessageTyped("")
            setImagePreview(null)
            toast.success("sent")
            if(fileInputRef.current) fileInputRef.current.value = ""
        } catch (error) {
            console.log(error.message)
            console.log(error.stack)
        }
    }
    return (
        <form className='w-full flex flex-col items-center justify-even'>
            <article className='flex justify-start items-center w-full'>
                {
                    imagePreview &&
                    <div className='relative'>
                        <img src={imagePreview} alt="" srcset="" className='rounded-md w-[100px] h-[100px]' />
                        <button onClick={(e) => removeImage(e)}><X size={25} className='bg-base-300 rounded-full p-1 absolute -top-2 -right-2 hover:cursor-pointer' /></button>
                    </div>
                }
            </article>
            <div className='w-full flex items-center justify-center'>
                <input type="text" value={messageTyped} placeholder='Type a message...' onChange={(e) => setMessageTyped(e.target.value)} className='w-[100%] p-3 mr-3 border-2 border-primary rounded-md focus:outline-none' />
                <div className='flex justify-center items-center m-2 hover:cursor-pointer'>
                    <input type="file" hidden ref={fileInputRef} onChange={(e) => handleImageChange(e)} />
                    <ImagesIcon size={30} onClick={() => fileInputRef.current?.click()} />
                </div>
                <button disabled={!messageTyped && !imagePreview} onClick={handleSendMessage} className='flex justify-center items-center m-2 hover:cursor-pointer'>
                    <Send size={30} />
                </button>
            </div>
        </form>
    )
}

export default SendMessage
