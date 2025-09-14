let io;

function init(server) {
  const { Server } = require("socket.io");
  io = new Server(server, {
    cors: {
      origin: ["https://letter-we.onrender.com", "http://localhost:5173"],
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected to Socket.io");

    socket.on("join", (userId) => {
      socket.join(`user_${userId}`);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected from Socket.io");
    });
  });

  return io;
}

function getIo() {
  if (!io) throw new Error("Socket.io not initialized!");
  return io;
}

module.exports = { init, getIo };
