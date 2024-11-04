import express from "express";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import session from "express-session";
import passport from "passport";
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";
import googleAuthRoutes from './routes/googleAuth.route.js';
import './controllers/googleAuth.controller.js';
import facebookAuthRoutes from './routes/facebookAuth.route.js';
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";

dotenv.config();

const app = express();

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
app.use("/gg", googleAuthRoutes);
app.use("/fb", facebookAuthRoutes);



app.listen(8800, () => {
    console.log("Server is running!");
});
