import express from "express";
import { createPost, getAllPosts } from "../controllers/post";
import { verifyToken } from "../middlewares/auth";

const router = express.Router();
router.post("/", verifyToken, createPost);
router.get("/", getAllPosts);

export default router;
