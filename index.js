import express from "express";
import Post from "./routes/post.js";
import User from "./routes/user.js";
import Auth from "./routes/auth.js";
import cors from "cors";
const app = express();

app.use(express.json({ extended: false }));

// CORS
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(cors())

app.use("/api/post", Post);
app.use("/api/user", User);
app.use("/api/auth", Auth);

app.listen(5000, () => {
  console.log(`App listening on port 5000!`);
});
