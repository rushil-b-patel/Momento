import express from "express";
import { createPost, getAllPosts } from "../controllers/post.ts";
import { verifyToken } from "../middlewares/auth.ts";

const router = express.Router();
router.post("/", verifyToken, createPost);
router.get("/", getAllPosts);

export default router;
