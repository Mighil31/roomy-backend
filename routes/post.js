import { Router } from "express";
const router = Router();

router.post("/", async (req, res) => {
  return res.json({
    ok: "ok",
  });
});

export default router;
