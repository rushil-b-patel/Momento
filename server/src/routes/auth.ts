import express from "express";
import { register, login, getCurrentUser, refresh } from "../controllers/auth";
import { verifyToken } from "../middlewares/auth";

const router = express.Router();
router.post("/refresh", refresh);
router.post("/register", register);
router.post("/login", login);
router.get("/me", verifyToken, getCurrentUser);

export default router;
