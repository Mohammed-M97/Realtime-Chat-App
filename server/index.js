const express = require("express");
const app = express();
const http = require("http");
// use cors library to deal with other url
const cors = require("cors");
// server is class from socket.io library
const { Server } = require("socket.io");
app.use(cors());

// use http library to generate a server
const server = http.createServer(app);


// instantiate the server 
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// start connection
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // 
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});


// test if the server is working and use port 3001 because port 3000 is the main for the project 
server.listen(3001, () => {
  console.log("SERVER RUNNING");
});