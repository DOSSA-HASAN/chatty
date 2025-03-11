import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

export const verifyUser = async (req, res, next) => {

    const token = req.cookies.token

    try {

        if (!token)
            return res.status(401).json({ message: "No token found - Unauthorized" })

        const decodedUser = jwt.verify(token, process.env.JWT_SECRET)

        if (!decodedUser)
            return res.status(401).json({ message: "Unauthorized - invalid token" })

        const user = await User.findById(decodedUser.id).select("-password")

        if (!user)
            return res.status(404).json({ message: "User not found" })

        req.user = user
        next()

    } catch (error) {
        console.log(`An error occured while verifying the user in verify.js: ${error.stack}`);
        return res.status(500).json({ message: "Couldnt verify user" })
    }

}