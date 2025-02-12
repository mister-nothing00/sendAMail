import express from "express";
import { loginUser, logoutUser, myProfile, registerUser, resetPassword, resetPasswordDinamic } from "../controllers/user.controller.js";
import {protectRoute} from "../middlewares/user.middleware.js";

const router= express.Router();


//Routes

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protectRoute, myProfile)
router.get("/logout", protectRoute, logoutUser);
router.post("/reset-password", resetPassword);
router.put("/reset-password/:token", resetPasswordDinamic); 


export default router;