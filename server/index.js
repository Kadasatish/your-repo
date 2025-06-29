const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // allow frontend
  },
});

let cameraState = false;

io.on("connection", (socket) => {
  console.log("Client connected");

  // Send current state to newly connected client
  socket.emit("toggle", cameraState);

  socket.on("toggle", (state) => {
    cameraState = state;
    io.emit("toggle", cameraState); // broadcast to all
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});
