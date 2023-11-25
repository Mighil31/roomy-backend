import { Router } from "express";
import UserRepository from "../repository/UserRepository.js";
import { v4 as uuidv4 } from "uuid";
import auth from "../middleware/auth.js";
import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import {
  validateLoginUser,
  loginUser,
  getCurrentUser,
} from "../controllers/userController.js";

const router = Router();

// @route   GET api/auth
// @desc    Verify Token, Get Payload
// @access  Public
router.get("/", auth, getCurrentUser);

// @route   POST api/auth
// @desc    Authenticate user, Get token
// @access  Public
router.post("/", validateLoginUser, loginUser);

export default router;
