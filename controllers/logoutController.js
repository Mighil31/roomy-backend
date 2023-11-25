import UserRepository from "../repository/UserRepository.js";
import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

export const logout = async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  try {
    const [user, userByEmailFields] =
      await UserRepository.getUserByRefreshToken(refreshToken);
    if (user.length == 0) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return res.sendStatus(204);
    }

    await UserRepository.deleteRefreshToken(user[0].userId);
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: "Database issue" }] });
  }
};
