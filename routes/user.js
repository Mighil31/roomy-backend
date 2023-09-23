import { Router } from "express";
import { createUser, validateRegistrationUser} from "../controllers/user.js";

const router = Router();

// @route   POST api/users
// @desc    Register User
// @access  Public
router.post("/", validateRegistrationUser, createUser);

export default router;
