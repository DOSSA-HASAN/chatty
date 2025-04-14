import mongoose from "mongoose"
import cloudinary from "../lib/cloudinary.js"
import Message from "../models/message.model.js"
import { User } from "../models/user.model.js"
import { getRecieverSocketId, io } from "../lib/socket.js"

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password")

        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log(`An error occured while fetching users: ${error.stack}`);
        return res.status(500).json({ message: "Could not fetch users" })
    }

}

export const getMessages = async (req, res) => {
    try {
        let userToChatId = req.params.id
        const senderId = req.user._id

        if (mongoose.isObjectIdOrHexString(userToChatId)) {
            userToChatId = mongoose.Types.ObjectId.createFromHexString(userToChatId)
        }


        const messages = await Message.find({
            $or: [
                { senderId: senderId, recieverId: userToChatId },
                { senderId: userToChatId, recieverId: senderId }
            ]
        })

        return res.status(200).json(messages)
    } catch (error) {
        console.log(`An error occured in getting messages: ${error.message}`);
        return res.status(500).json({ message: "could not fetch chat" })
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body
        const { id: recieverId } = req.params
        const senderId = req.user._id

        if (!text && !image)
            return res.status(400).json({ message: "Message must include text or image" })

        let imageUrl;
        if (image) {
            const uploadedImage = await cloudinary.uploader.upload(image)
            imageUrl = uploadedImage.secure_url
        }

        const newMessage = new Message({
            senderId,
            recieverId,
            text,
            image: imageUrl
        })

        await newMessage.save();

        const recieverSocketId = getRecieverSocketId(recieverId)
        if (recieverSocketId) {
            io.to(recieverSocketId).emit("newMessage", newMessage)
        }

        return res.status(201).json(newMessage)

    } catch (error) {
        console.log(`Could not send message: ${error.stack}`);
        return res.status(500).json({ message: "unable to send message" })
    }
}