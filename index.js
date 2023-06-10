import express from "express";
import Post from "./routes/post.js";
import User from "./routes/user.js";
import Auth from "./routes/auth.js";

const app = express();

app.use(express.json({ extended: false }));

app.use("/api/post", Post);
app.use("/api/user", User);
app.use("/api/auth", Auth);

app.listen(5000, () => {
  console.log(`App listening on port 5000!`);
});
