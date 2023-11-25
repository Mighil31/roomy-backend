import { Router } from "express";
import { createPost, getPosts } from "../controllers/postController.js";
import auth from "../middleware/auth.js";
const router = Router();

router.post("/", auth, createPost);

router.post("/all", auth, getPosts);

export default router;
