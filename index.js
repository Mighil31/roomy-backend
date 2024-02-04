import express from "express";
import Post from "./routes/post.js";
import User from "./routes/user.js";
import Auth from "./routes/auth.js";
import cors from "cors";
import Refresh from "./routes/refresh.js";
import cookieParser from "cookie-parser";
import Logout from "./routes/logout.js";
import Chat from "./routes/chat.js";
import initializeSocket from "./utils/sockets.js";
import http from "http";
const app = express();
const server = http.createServer(app);
app.use(express.json({ extended: false }));

const io = initializeSocket(server);

// CORS
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://35.154.214.36");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

var corsOptions = {
  origin: "http://35.154.214.36",
  // optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(cookieParser());

app.use("/api/post", Post);
app.use("/api/user", User);
app.use("/api/auth", Auth);
app.use("/api/refresh", Refresh);
app.use("/api/logout", Logout);
app.use("/api/chat", Chat);

server.listen(5000, () => {
  console.log(`App listening on port 5000!`);
});
