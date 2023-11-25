import { Router } from "express";
import auth from "../middleware/auth.js";
import { handleRefreshToken } from "../controllers/refreshTokenController.js";

const router = Router();

// @route   GET api/refresh
// @desc    get refresh token
// @access  Public
router.get("/", handleRefreshToken);

export default router;
