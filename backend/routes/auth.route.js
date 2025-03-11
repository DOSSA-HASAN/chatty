import express from "express"
import { checkAuth, login, logout, register, updateProfile } from "../controllers/auth.controller.js";
import { verifyUser } from "../lib/verify.js";

const router = express.Router()

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.put('/update-profile',  verifyUser, updateProfile)
router.get('/check', verifyUser, checkAuth)

export default router