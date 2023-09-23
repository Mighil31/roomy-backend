import { Router } from "express";
import UserRepository from "../repository/UserRepository.js";
import { v4 as uuidv4 } from "uuid";
import auth from "../middleware/auth.js";
import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { validateLoginUser, loginUser } from "../controllers/user.js";

const router = Router();

// @route   GET api/auth
// @desc    Verify Token, Get Payload
// @access  Public
router.get("/", auth, async (req, res) => {
  try {
    const [user, userField] = await UserRepository.getUserById(req.user.userID);
    return res.json(user[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error in /api/auth route" });
  }
});

// @route   POST api/auth
// @desc    Authenticate user, Get token
// @access  Public
router.post("/", validateLoginUser, loginUser);

export default router;
