import express from "express";
import Post from "./routes/Post.js";
import User from "./routes/User.js";

const app = express();

app.use("/post", Post);
app.use("/user", User);

app.listen(5000, () => {
  console.log(`App listening on port 5000!`);
});
