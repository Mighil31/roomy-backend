import { Router } from "express";
import {
  createPost,
  getFeed,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import auth from "../middleware/auth.js";
const router = Router();

router.post("/", auth, createPost);

router.get("/", auth, getFeed);
router.put("/:postId", auth, updatePost);
router.delete("/:postId", auth, deletePost);

export default router;
