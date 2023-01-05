const { instrument } = require("@socket.io/admin-ui");
// const { Server } = require("socket.io");
// const { createServer } = require("http");
// const httpServer = createServer();
// const io = new Server(httpServer, {
//   cors: {
//     origin: ["https://admin.socket.io"],
//     credentials: true,
//   },
// });

// instrument(io, {
//   auth: false,
//   mode: "development",
// });
// httpServer.listen(3000);

const io = require("socket.io")(3000, {
  cors: {
    // origins: ["http://localhost:8080", "https://admin.socket.io/"],
    origin: ["https://admin.socket.io", "http://localhost:8080"],
    credentials: true,
    // methods: ["GET", "POST"],
  },
});

const userIO = io.of("/user");
userIO.on("connection", () => {
  console.log("connected to user namespace");
});

io.on("connection", (socket) => {
  socket.on("send-message", (message, room) => {
    console.log(room);
    if (room === "") {
      socket.broadcast.emit("receive-message", message);
    } else {
      socket.to(room).emit("receive-message", message);
    }
  });
  socket.on("join-room", (room, cb) => {
    socket.join(room);
    cb(`Joined room: ${room}`);
  });
});

instrument(io, { auth: false });
