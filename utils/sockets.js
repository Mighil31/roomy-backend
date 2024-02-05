import { Server } from "socket.io";

const initializeSocket = (server) => {
  const io = new Server(server, {
    path: "/socket",
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  console.log("INIT");
  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data) => {
      console.log(data);
      socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });

  io.engine.on("connection_error", (err) => {
    // console.log(err.req); // the request object
    console.log(err.code); // the error code, for example 1
    console.log(err.message); // the error message, for example "Session ID unknown"
    // console.log(err.context); // some additional error context
  });

  return io;
};

export default initializeSocket;
