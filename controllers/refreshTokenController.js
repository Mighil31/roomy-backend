import UserRepository from "../repository/UserRepository.js";
import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

export const handleRefreshToken = async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies || !cookies.jwt)
    return res.status(401).json({ msg: "no cookie" });
  // console.log(cookies.jwt);
  const refreshToken = cookies.jwt;

  try {
    const [user, userByEmailFields] =
      await UserRepository.getUserByRefreshToken(refreshToken);
    if (user.length == 0) {
      return res
        .status(403)
        .json({ errors: [{ msg: "Invalid refresh token" }] });
    }
    console.log(user);
    jsonwebtoken.verify(
      refreshToken,
      process.env.REFRESH_SECRET,
      (err, decoded) => {
        console.log(decoded);
        if (err || user[0].userId != decoded.user.userId)
          return res.sendStatus(403);
        const payload = {
          user: {
            userId: user[0].userId,
          },
        };
        const accessToken = jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "30s",
        });

        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: "Database issue" }] });
  }
};
