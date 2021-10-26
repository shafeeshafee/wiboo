const express = require("express");
const app = express();
const socket = require("socket.io");
const cors = require("cors");
const PORT = 5000;
const seed = require("./seed");

seed();

app.use(express.json());
app.use(cors());

app.use("/auth", require("./routes/auth"));

const server = app.listen(PORT, () => {
  console.log("Server Running on Port 5000...");
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:1234",
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("User Joined Room: " + data);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data.content);
  });

  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED");
  });
});
