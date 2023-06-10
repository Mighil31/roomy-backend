import { Router } from "express";
import UserRepository from "../repository/UserRepository.js";
import { v4 as uuidv4 } from "uuid";
import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

const router = Router();

// @route   POST api/users
// @desc    Register User
// @access  Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = {
      name: req.body.name,
      email: req.body.email,
      userID: uuidv4(),
      password: "",
    };

    try {
      const [userByID, userByIDFields] = await UserRepository.getUserById(
        user.userID
      );
      if (userByID.length > 0) {
        return res.status(400).json({ errors: [{ msg: "Try again" }] });
      }
      const [userByEmail, userByEmailFields] =
        await UserRepository.getUserByEmail(user.email);
      if (userByEmail.length > 0) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ errors: [{ msg: "Database issue" }] });
    }

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(req.body.password, salt);

    try {
      const [rows, field] = await UserRepository.createUser(user);
      console.log(rows);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ errors: [{ msg: "Database issue" }] });
    }

    const payload = {
      user: {
        userID: user.userID,
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
  }
);

export default router;
