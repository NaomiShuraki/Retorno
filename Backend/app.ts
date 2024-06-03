import express from "express";
import expressRateLimit from "express-rate-limit";
import { catchAll } from "./Middleweres/chatchAll";
import { sanitize } from "./Middleweres/satitize";
import users from "./Controllers/usersController";
import chat from "./Controllers/chatController";
import message from "./Controllers/messageController";
import path from "path";
import { MessaeType } from "./Models/typs/users";
import { Socket } from "socket.io";
import cors from "cors";
import { getMessages } from "./Logics/message";

const server = express();
server.use(cors());
server.use(
  "/api",
  expressRateLimit({
    max: 100,
    windowMs: 1000,
  })
);
server.use(express.json());
server.use(sanitize);
server.use("/api", users);
server.use("/api", chat);
server.use("/api", message);

const publicDirectoryPath = path.join(__dirname, "../public");
// express.static - middlewere for using static file, like css, html...
// this is used so we are not going to use a route for connect the front-side
server.use(express.static(publicDirectoryPath));
server.use(catchAll);
export const app = server.listen(4000, () => {
  console.log("Server listening on port 4000");
});

const io = require("socket.io")(app, {
  allowEIO3: true,
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket: Socket) => {
  console.log("connection")
 socket.on("chat-message", async(msg: MessaeType) =>{
  io.to(msg.reciver).emit("get-message", msg)
  console.log(msg)
 })
 socket.emit("get-message", "hi")
 
  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("disconnect user")
  });
});
