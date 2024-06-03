const sql = require("mssql");
import { MessaeType } from "../Models/typs/users";
import { sqlConfig } from "../Utils/appConfig";

export const insertOrUpdateMessage = async (
  message: MessaeType
): Promise<MessaeType> => {
  try {
    let pool = await sql.connect(sqlConfig);
    let request = await pool.request();
    request.input("Message", sql.VarChar(), message.message);
    request.input("Sender", sql.VarChar(), message.sender);
    request.input("Reciver", sql.VarChar(), message.reciver);
    request.input("Time", sql.VarChar(), message.time);
    console.log(request);
    let res = await request.execute(`ADD_UPDATE_MESSAGE`);
    return res.recordsets[0][0];
  } catch (error) {
    console.log("error updating message" + error);
  }
};

export const getMessages = async (
sender: string, reciver: string  ): Promise<MessaeType> => {
    try {
      let pool = await sql.connect(sqlConfig);
      console.log(sender, reciver)
      let request = await pool.request();
      request.input("Sender", sql.VarChar(), sender);
      request.input("Reciver", sql.VarChar(),reciver);
      let res = await request.execute(`GET_MESSAGE`);
      console.log("res.data" ,res.recordsets[0][0])
      return res.recordsets[0][0];
    } catch (error) {
      console.log("error updating message" + error);
    }
  };
  