const io = require("socket.io")(3000, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("send-message", (message) => {
    socket.broadcast.emit("receive-message", message);
    console.log(message);
  });
});
