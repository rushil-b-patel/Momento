import type { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import type { AuthRequest } from "../middlewares/auth";

const prisma = new PrismaClient();

export const createPost = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { description, location, dateTaken, imageUrl } = req.body;

    const post = await prisma.post.create({
      data: {
        description,
        location,
        dateTaken: dateTaken ? new Date(dateTaken) : null,
        imageUrl,
        userId: req.userId!,
      },
    });

    res.status(201).json({ message: "Post created", post });
  } catch (err) {
    next(err);
  }
};

export const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await prisma.post.findMany({
      include: { user: { select: { id: true, name: true } } },
      orderBy: { createdAt: "desc" },
    });
    res.json(posts);
  } catch (err) {
    next(err);
  }
};
