import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client"
import authRoutes from "./routes/auth";
import postRoutes from "./routes/post";
import errorHandler from "./middlewares/errorHandler";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.json({ message: "Pixel API is running!" });
});

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Pixel backend running on port ${PORT}`));
