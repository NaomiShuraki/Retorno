import { useState, useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
import { io } from "socket.io-client";
import { MessaeType } from "Models/messageModel";
import "./chat.css";
import {
  disconnection,
  getAdminSocketID,
  getUserConnection,
  updateUserConnection,
} from "./connections";
import axios from "axios";

export const socketCo = io("http://localhost:4000/");

export const ChatPage = () => {
  const [message, setMessage] = useState<string>("");
  const [messagesList, setMessagesList] = useState<MessaeType[]>([]);
  let email = sessionStorage.getItem("email");

  const date = new Date();
  const formattedTime = date.toLocaleTimeString("locales", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  useEffect(() => {
    async function updateAdminConnection() {
      if(sessionStorage.getItem("email") ==="jeny@gmail.com" ){
        await axios.post("http://localhost:4000/api/chatData", {
          email: "jeny@gmail.com",
          senderSocketID: socketCo.id,
          adminSocketID: socketCo.id,
        });
      }
    }
    async function updateUserConnection() {
      await axios.post("http://localhost:4000/api/chatData", {
       email: sessionStorage.getItem("email"),
       senderSocketID: socketCo.id,
       adminSocketID: socketCo.id,
     });
   }

    socketCo.on("connect", () => {
      updateAdminConnection()
      updateUserConnection();
      console.log("connection");
      console.log(socketCo.id);
      socketCo.on("get-message", (msg: string) => {
        console.log(msg);
      });
    });
    socketCo.on("disconnect", () => {});
  }, []);

  const handleSendMessage = async () => {
    if (email !== null && email === "jeny@gmail.com") {
      let socketUser: any = await getAdminSocketID();
      if (message !== "") {
        let objMsg: any = {
          message: message,
          email: email,
          sender: socketUser.AdminSocketID,
          reciver: "",
          time: formattedTime,
        };
        socketCo.emit("chat-message", objMsg);
        setMessage("");
      }
    }else if(email !== null && email !== "jeny@gmail.com"){
      let socketUser: any = await getAdminSocketID();
      if (message !== "") {
        let objMsg: any = {
          message: message,
          email: email,
          sender: socketCo.id,
          reciver: socketUser.AdminSocketID,
          time: formattedTime,
        };
        console.log("userSocket:" ,objMsg.sender )
        socketCo.emit("chat-message", objMsg);
        setMessage("");
      }
    }
  };
  const returnHtml = (index: number, msg: MessaeType) => {
    if (msg.sender !== sessionStorage.getItem("sender")) {
      return (
        <div key={index} className="msg-div-left msg-fade-in">
          <p className="message-p">{msg.message}</p>
          <p className="time-p">{msg.time}</p>
        </div>
      );
    } else {
      return (
        <div key={index} className="msg-div-right msg-fade-in">
          <p className="message-p">{msg.message}</p>
          <p className="time-p">{msg.time}</p>
        </div>
      );
    }
  };
  return (
    <>
      <div className="chat-container-div">
        <div className="messages-container">
          {messagesList.map((msg, index) => (
            <div key={index}>{returnHtml(index, msg)}</div>
          ))}
        </div>

        <div className="inputs-containre">
          <input
            className="chat-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="chat-button" onClick={handleSendMessage}>
            <SendIcon />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
