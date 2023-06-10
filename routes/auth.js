import { Router } from "express";
import UserRepository from "../repository/UserRepository.js";
import { v4 as uuidv4 } from "uuid";
import auth from "../middleware/auth.js";

const router = Router();

// @route   GET api/auth
// @desc    Verify Token, Get Payload
// @access  Public
router.get("/", auth, async (req, res) => {
  try {
    const [user, userField] = await UserRepository.getUserById(req.user.userID);
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error in /api/auth route" });
  }
});

router.post("/", async (req, res) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
    userID: uuidv4(),
    password: "",
  };
  console.log(user);
  // try {
  //   const [rows, fields] = await UserRepository.getUsers();
  //   console.log(rows);
  //   res.json(rows);
  // } catch (error) {
  //   res.status(500).json({ error: "Failed to retrieve users" });
  // }

  res.json(user);
});

export default router;
