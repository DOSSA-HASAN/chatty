import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/generateToken.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt"

export const register = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    if (!email || !password || !username)
      return res.status(400).json({ message: "Missing required fields" });

    const userEmail = await User.findOne({ email })
    const userName = await User.findOne({ username })

    if (userEmail || userName)
      return res.status(409).json({ message: "User with email or username already exists" })

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      email,
      password: hashedPassword,
      username
    })

    await newUser.save()

    return res.status(201).json({ message: "Account created successfully" })


  } catch (error) {
    console.log(`An error ocurred while registering user: ${error.stack}`);
    return res
      .status(500)
      .json({ message: "Sorry, couldnt register user please try again" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return res.status(400).json({ message: "Missing required fields" })

    const user = await User.findOne({ email })

    if (!user)
      return res.status(404).json({ message: "User does not exist, please create an account" })

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" })

    const token = generateToken(user._id)

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "Strict",
      secure: process.env.NODE_ENV !== "development"
    })

    res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        profilePic: user.profilePic
      },
      token
    })

  } catch (error) {
    console.log(`An error occured while logging in : ${error.stack}`);
    return res.status(500).json({ message: "An error occured while trying to log you in" })
  }

};

export const logout = (req, res) => {
  const token = req.cookies.token

  try {
    if (!token)
      return res.status(404).json({ message: "No user was logged in" })

    res.clearCookie("token")

    res.status(200).json({ message: "User logged out succesfully" })

  } catch (error) {
    console.log(`An error occured while logging out: ${error.stack}`);
    return res.status(500).json({ message: "An error occured while trying to log you outs" })
  }
};

export const updateProfile = async (req, res) => {
  const { profilePic } = req.body
  const id = req.user._id

  try {
    if (!profilePic)
      return res.status(400).json({ message: "missing profile pic" })

    const uploadResponse = await cloudinary.uploader.upload(profilePic)
    const updatedUser = await User.findByIdAndUpdate(id, { profilePic: uploadResponse.secure_url }, { new: true })

    return res.status(200).json(updatedUser)
  } catch (error) {
    console.log(`An error occured while updating users profile pic: ${error.stack}`);
    return res.status(500).json({ message: "Could not update profile pic" })
  }
}

export const checkAuth = (req, res) => {
  try {
    return res.status(200).json(req.user)
  } catch (error) {
    console.log(`Couldn not authenticate user : ${error.stack}`);
    return res.status(500).json({ message: "Authentication failed" })
  }
}
