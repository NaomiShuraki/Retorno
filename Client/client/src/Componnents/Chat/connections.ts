import axios from "axios";
import { socketCo } from "./chat";
import { MessaeType, User } from "Models/messageModel";

export const updateUserConnection = async (): Promise<void> => {
  try {
     await axios.post("http://localhost:4000/api/chatData", {
      email: sessionStorage.getItem("email"),
      senderSocketID: socketCo.id,
      adminSocketID: socketCo.id

    });
  } catch (error) {
    console.log("error", error);
    throw error
  }
};

export const disconnection = async(email: string | null): Promise<void> =>{
  try {
   if(email === "jeny@gmail.com"){
   await disconnectUser()
  await disconnectAdmin()
   }else{
    await disconnectUser()
   }
 } catch (error) {
   console.log("error", error);
   throw error
 }
}
export const disconnectUser = async (): Promise<void> => {
  try {
     await axios.post("http://localhost:4000/api/disconnect/user", {
      socketID: socketCo.id
    });
  } catch (error) {
    console.log("error", error);
    throw error
  }
};
export const disconnectAdmin = async (): Promise<void> => {
  try {
     await axios.get("http://localhost:4000/api/disconnect/admin");
  } catch (error) {
    console.log("error", error);
    throw error
  }
};
export const getAdminSocketID =async ():Promise<string> =>{
  try {
   const req =  await axios.get("http://localhost:4000/api/adminConnection");
    return req.data
 } catch (error) {
   console.log("error", error);
   throw error
 }
}

export const getUserConnection =async (email: string):Promise<null | {}> =>{
  try {
   const req =  await axios.post("http://localhost:4000/api/getUserConnection", {email: email});
    return req.data
 } catch (error) {
   console.log("error", error);
   throw error
 }
}


/* export const getChatData = async (email: string): Promise<User> => {
    try {
      let req = await axios.post("http://localhost:4000/api/chatData", {
        email: email,
        socketId: socketCo?.id,
      });
      sessionStorage.setItem("senderUser", req.data);
      return req.data;
    } catch (err) {
      console.log("error", err);
      throw err; // Ensure an error is thrown to satisfy TypeScript's return type requirement
    }
  }; */


/* export const insertOrUpdateMessage = async (msg: MessaeType): Promise<MessaeType> => {
  try {
    let req = await axios.post("http://localhost:4000/api/message", {
      message: msg.message,
      reciver: msg.reciver,
      sender: msg.sender,
      time: msg.time
    });
    return req.data;
  } catch (error) {
    console.log("error", error);
    throw error
  }
};

export const getMessageData = async (sender:string | null, reciver:string | null): Promise<MessaeType | null> => {
  try {
    let req = await axios.post("http://localhost:4000/api/message/data", {
      sender: sender,
      reciver: reciver,
    });
    return req.data;
  } catch (err) {
    console.log("error", err);
    throw err; 
  }
}; */