import { Router } from "express";
import { createUser, validateUser} from "../controllers/user.js";

const router = Router();

// @route   POST api/users
// @desc    Register User
// @access  Public
router.post("/", validateUser, createUser);

export default router;
