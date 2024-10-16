import express from "express";
import { searchPosts, filterPosts } from "../controllers/post.controller.js";

const router = express.Router()

// router.get("/test", (req, res) => {
//     console.log("router works!")
// })
// router.post("/test", (req, res) => {
//     console.log("router works!")
// })
// router.put("/test", (req, res) => {
//     console.log("router works!")
// })
// router.delete("/test", (req, res) => {
//     console.log("router works!")
// })

router.get("/search", searchPosts);
router.get("/filter", filterPosts);


export default router;