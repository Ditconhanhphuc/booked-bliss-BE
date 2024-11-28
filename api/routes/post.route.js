import express from "express";
import { getPosts, getPost, addPost, updatePost, deletePost} from "../controllers/post.controller.js";
import {verifyToken} from "../middleware/verifyToken.js"

const router = express.Router()

router.get("/", getPosts)
router.get("/:id", getPost)
router.post("/", verifyToken, addPost)
router.put("/:id", verifyToken, updatePost)
router.delete("/:id", verifyToken, deletePost)

router.get("/homePosts", getPosts)


export default router;