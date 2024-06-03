import { useState, useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
import { io } from "socket.io-client";
import { MessaeType } from "Models/messageModel";
import "./chat.css";
import {
  disconnection,
  getAdminSocketID,
  getUserConnection,
  updateAdminConnection,
  updateUserConnection,
} from "./connections";

export const socketCo = io("http://localhost:4000/");

export const ChatPage = () => {
  const [message, setMessage] = useState<string>("");
  const [messagesList, setMessagesList] = useState<MessaeType[]>([]);
  let email = sessionStorage.getItem("email");
  let localStorageMessageList: MessaeType[] = [];
  const setUpSocket = async () => {
    if (email === "jeny@gmail.com") {
      await updateAdminConnection();
      console.log("socket", socketCo.id);
    } else {
      await updateUserConnection();
      console.log("socket", socketCo.id);
    }
    //set chat client-server:
    socketCo.on("connect", () => {
      //get msg from server
      socketCo.on("get-message", (serverMSG: MessaeType) => {
        console.log("serverMSG");
        localStorageMessageList.push(serverMSG);
        setMessagesList((prevMessages) => [...prevMessages, serverMSG]);
        localStorage.set(
          "messageList",
          JSON.stringify(localStorageMessageList)
        );
      });
    });
    socketCo.on("disconnect", () => {
      console.log("disco");
      disconnection(email);
      setInterval(setUpSocket, 3000);
    });
  };
  const date = new Date();
  const formattedTime = date.toLocaleTimeString("locales", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  useEffect(() => {
    setUpSocket();
    localStorage.setItem(
      "messageList",
      JSON.stringify(localStorageMessageList)
    );
    return () => {
      socketCo.disconnect();
    };
  }, []);
  const handleSendMessage = async () => {
    if (message !== "") {
      if (localStorage.getItem("messageList")!.length <=2) {
        let socketAdminID : any= await getAdminSocketID();
        if (email !== null) {
          let socketUser:any = await getUserConnection(email);
          let objMsg: MessaeType = {
            message: message,
            email: email,
            sender: socketUser.SenderSocketID,
            reciver: socketAdminID.AdminSocketID,
            time: formattedTime,
          };
          socketCo.emit("chat-message",objMsg );
          setMessage("");
        } else {
          let messageToParce = localStorage.getItem("messagesList");
          if (messageToParce! == null) {
            let parseMessage = JSON.parse(message);
            let objMsg: MessaeType = {
              message: message,
              email: email,
              sender: parseMessage.reciver,
              reciver: parseMessage.sender,
              time: formattedTime,
            };
            socketCo.emit("chat-message", objMsg);
            setMessage("");
            localStorageMessageList.splice(0, 1);
            localStorage.setItem(
              "messageList",
              JSON.stringify(localStorageMessageList)
            );
          }
        }
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


io.on("connection", (socket: Socket) => {
  console.log("connection")
  const count = io.engine.clientsCount;
  console.log(count)
 socket.on("chat-message", async(msg: MessaeType) =>{
  console.log("chat-message",msg.reciver)
io.to(msg.reciver.toString()).emit("get-message", msg)
console.log('get-message',msg)
 })
 
  socket.on("disconnect", () => {
    console.log("Disconnected user");
    socket.disconnect();
    const count = io.engine.clientsCount-1;
    console.log(count)
  });
});