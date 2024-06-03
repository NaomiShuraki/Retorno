import { sqlConfig } from "../Utils/appConfig";
import {User, chatUser} from "../Models/typs/users"

const sql = require("mssql");


export const dataChatConnect = async (credentials: chatUser): Promise<string> => {
    try {
      let pool = await sql.connect(sqlConfig);
      let request = await pool.request();
      request.input("Email", sql.VarChar(50), credentials.email);
        request.input("SenderSocketID", sql.VarChar(), credentials.senderSocketID);
        request.input("AdminSocketID", sql.VarChar(), credentials.adminSocketID);
         await request.execute(`UPDATE_SenderSocketID_AdminSocketID_CONNECTION`);
         console.log("connection update succsesfuly")
         return "user updated succesfully"
      }catch (error) {
        console.log("error registeration" + error);
      }
  };

  export const getEmail = async (): Promise<User> => {
    try {
      let pool = await sql.connect(sqlConfig);
      let request = await pool.request();
      request.input("email", sql.VarChar(50), "jeny@gmail.com");
      const reqExa =   await request.execute(`GET_ADMINSOCKETID`);
      console.log(reqExa.recordsets[0][0].level)
        const data = reqExa.recordsets[0][0]
        return data as User
      }catch (error) {
        console.log("error registeration" + error);
      }
  };


  export const disconnectUser = async (socketID:string): Promise<void> => {
    try {
      let pool = await sql.connect(sqlConfig);
      let request = await pool.request();
      request.input("SocketID", sql.VarChar(), socketID);
      await request.execute(`DICONNECT_USER`);
      }catch (error) {
        console.log("error registeration" + error);
      }
  };

  export const disconnectAdmin = async (): Promise<void> => {
    try {
      let pool = await sql.connect(sqlConfig);
      let request = await pool.request();
      await request.execute(`DISCONNECT_ADMIN_SOCKETID`);
      }catch (error) {
        console.log("error registeration" + error);
      }
  };

  export const getUserSocketConnection = async (email:string): Promise<string> => {
    try {
      let pool = await sql.connect(sqlConfig);
      let request = await pool.request();
      request.input("email", sql.VarChar(50), email);
      const reqExa =   await request.execute(`GET_USERS_BY_EMAIL`);
      console.log(reqExa.recordsets[0][0].level)
        const data = reqExa.recordsets[0][0]
        return data 
      }catch (error) {
        console.log("error registeration" + error);
      }
  };