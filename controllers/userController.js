import UserRepository from "../repository/UserRepository.js";
import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

export const validateRegistrationUser = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
];

export const createUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = {
    name: req.body.name,
    email: req.body.email,
    password: "",
  };

  try {
    const [userByEmail, userByEmailFields] =
      await UserRepository.getUserByEmail(user.email);

    if (userByEmail.length > 0) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: "Database issue" }] });
  }

  const salt = await bcrypt.genSalt(10);

  user.password = await bcrypt.hash(req.body.password, salt);

  let payload = {};

  try {
    const [rows, field] = await UserRepository.createUser(user);

    payload = {
      user: {
        userId: rows.insertId,
      },
    };

    const accessToken = jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const refreshToken = jsonwebtoken.sign(
      payload,
      process.env.REFRESH_SECRET,
      {
        expiresIn: "5d",
      }
    );

    await UserRepository.addRefreshToken(refreshToken, rows[0].userId);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: "Database issue" }] });
  }

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.json({ accessToken });

  // jsonwebtoken.sign(
  //   payload,
  //   process.env.JWT_SECRET,
  //   { expiresIn: 360000 },
  //   (err, token) => {
  //     if (err) return res.status(500).json({ errors: [{ msg: "JWT Issue" }] });
  //     res.json({ token });
  //   }
  // );
};

export const validateLoginUser = [
  check("email", "Please include a valid email").isEmail(),
  check("password", "Please enter a password").exists(),
];

export const loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  // console.log(req.body);
  if (!errors.isEmpty()) {
    console.log("First error");
    return res.status(400).json({ errors: errors.array() });
  }
  // console.log(req.body);
  const { email, password } = req.body;

  try {
    const [user, userByEmailFields] = await UserRepository.getUserByEmail(
      email
    );
    if (user.length == 0) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const payload = {
      user: {
        userId: user[0].userId,
      },
    };

    const accessToken = jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "30s",
    });

    const refreshToken = jsonwebtoken.sign(
      payload,
      process.env.REFRESH_SECRET,
      {
        expiresIn: "1d",
      }
    );

    await UserRepository.addRefreshToken(refreshToken, user[0].userId);

    // jsonwebtoken.sign(
    //   payload,
    //   process.env.JWT_SECRET,
    //   { expiresIn: "30s" },
    //   (err, token) => {
    //     if (err)
    //       return res.status(500).json({ errors: [{ msg: "JWT Issue" }] });
    //     res.json({ token });
    //   }
    // );
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken, userId: user[0].userId, username: user[0].name });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: "Database issue" }] });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const [user, userField] = await UserRepository.getUserById(req.user.userId);
    return res.json(user[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error in /api/auth route" });
  }
};
