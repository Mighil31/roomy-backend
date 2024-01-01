import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  getConversations,
  createConversations,
  createMessage,
  getConversationList,
} from "../controllers/chatController.js";
const router = Router();

router.get("/conversations", auth, getConversations);

// Get list of users that the logged in user has talked to
router.get("/list", auth, getConversationList);

router.post("/", auth, createConversations);
router.post("/message/:conversationId", auth, createMessage);

export default router;
