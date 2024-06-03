"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const bookRouter_1 = require("./routes/bookRouter");
const authRouter_1 = require("./routes/authRouter");
dotenv_1.default.config();
mongoose_1.default
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Mongo Connected"))
    .catch(() => console.error("Mongo connection error"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); // to read/get json
app.use(express_1.default.urlencoded({ extended: true })); // to read formData
app.use(express_1.default.static("public")); // to serve static files
// allow dari semua URL / origin tertentu
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173"],
}));
app.use("/api/v1/books", bookRouter_1.bookRouter);
app.use("/auth", authRouter_1.authRouter);
app.listen(8000);
