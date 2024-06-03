import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { bookRouter } from "./routes/bookRouter";
import { authRouter } from "./routes/authRouter";

dotenv.config();

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}.mp3qw2f.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority&appName=DevscaleDB`
  )
  .then(() => console.log("Mongo Connected"))
  .catch(() => console.error("Mongo connection error"));

const app = express();

app.use(express.json()); // to read/get json
app.use(express.urlencoded({ extended: true })); // to read formData
app.use(express.static("public")); // to serve static files

// allow dari semua URL / origin tertentu
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

app.use("/api/v1/books", bookRouter);
app.use("/auth", authRouter);

app.listen(8000);
