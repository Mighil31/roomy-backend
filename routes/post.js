import { Router } from "express";
import { createPost, getFeed } from "../controllers/postController.js";
import auth from "../middleware/auth.js";
const router = Router();

router.post("/", auth, createPost);

router.get("/", auth, getFeed);

export default router;
