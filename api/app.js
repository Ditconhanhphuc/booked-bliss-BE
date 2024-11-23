import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import session from "express-session";
import passport from "passport";
import authRoute from "./routes/auth.route.js";
import googleAuthRoutes from './routes/googleAuth.route.js';
import './controllers/googleAuth.controller.js';
import facebookAuthRoutes from './routes/facebookAuth.route.js';
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js"; 

dotenv.config();

const app = express();

app.use(cors({ origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);
app.use("/gg", googleAuthRoutes);
app.use("/fb", facebookAuthRoutes);



app.listen(8800, () => {
    console.log("Server is running!");
});
