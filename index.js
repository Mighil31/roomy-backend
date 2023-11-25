import express from "express";
import Post from "./routes/post.js";
import User from "./routes/user.js";
import Auth from "./routes/auth.js";
import cors from "cors";
import Refresh from "./routes/refresh.js";
import cookieParser from "cookie-parser";
import Logout from "./routes/logout.js";
const app = express();

app.use(express.json({ extended: false }));

// CORS
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(cors());

app.use(cookieParser());

app.use("/api/post", Post);
app.use("/api/user", User);
app.use("/api/auth", Auth);
app.use("/api/refresh", Refresh);
app.use("/api/logout", Logout);

app.listen(5000, () => {
  console.log(`App listening on port 5000!`);
});
