import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    username: {type: String, unique: true, required: true},
    profilePic: {type: String, default: ""},
})

export const User = mongoose.model('user', UserSchema)