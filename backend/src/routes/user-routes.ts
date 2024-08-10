import {  Router  } from "express"
import { getAllUsers, userSignup, userLogin, verifyUser } from "../controllers/user-controllers.js";
import { signupValidator, validate, loginValidator } from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);

userRoutes.post("/signup", validate(signupValidator), userSignup);

userRoutes.post("/login", validate(loginValidator), userLogin);

// we're here checking if user has already logged in or not and we're getting status over here
userRoutes.get("/auth-status", verifyToken, verifyUser);

export default userRoutes;