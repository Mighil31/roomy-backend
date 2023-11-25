import { Router } from "express";
import auth from "../middleware/auth.js";
import { logout } from "../controllers/logoutController.js";

const router = Router();

// @route   GET api/logout
// @desc    logout
// @access  Public
router.get("/", logout);

export default router;
