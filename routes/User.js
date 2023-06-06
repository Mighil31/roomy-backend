import { Router } from "express";
import UserRepository from "../repository/UserRepository.js";

const router = Router();

router.get("/", async (req, res) => {
  console.log("First");
  try {
    const [rows, fields] = await UserRepository.getUsers();
    console.log(rows);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve users" });
  }
});

export default router;
