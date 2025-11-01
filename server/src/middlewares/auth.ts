import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId?: string;
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error("JWT_SECRET not set");
    return res.status(500).json({ message: "Internal configuration error" });
  }

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;

    if (typeof decoded !== "object" || !decoded.id) {
      return res.status(403).json({ message: "Invalid token payload" });
    }

    req.userId = decoded.id as string;
    next();
  } catch (err) {
    console.error("JWT verification error:", err);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
