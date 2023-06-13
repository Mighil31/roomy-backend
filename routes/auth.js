import { Router } from "express";
import UserRepository from "../repository/UserRepository.js";
import { v4 as uuidv4 } from "uuid";
import auth from "../middleware/auth.js";
import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

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
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const [user, userByEmailFields] = await UserRepository.getUserByEmail(
        email
      );
      if (user.length == 0) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user[0].password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        user: {
          userID: user[0].userID,
        },
      };
      jsonwebtoken.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err)
            return res.status(500).json({ errors: [{ msg: "JWT Issue" }] });
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error);
      return res.status(500).json({ errors: [{ msg: "Database issue" }] });
    }
  }
);

export default router;
