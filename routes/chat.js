import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  // getConversations,
  createConversations,
} from "../controllers/chatController.js";
const router = Router();

// router.post("/:userId/conversations", auth, getConversations);
router.post("/", auth, createConversations);

export default router;
