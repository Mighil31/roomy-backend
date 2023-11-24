import { Router } from "express";
import { createPost, getPosts } from "../controllers/post.js";
import auth from "../middleware/auth.js";
const router = Router();

router.post("/", auth, createPost);

router.post("/all", auth, getPosts);

export default router;
