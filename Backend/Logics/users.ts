import { User } from "../Models/typs/users";
import { getNewToken } from "../Utils/tokens";
const sql = require("mssql");
import { sqlConfig } from "../Utils/appConfig";
import bcrypt from "bcryptjs";

export const registeration = async (user: User): Promise<User | string> => {
  try {
    let pool = await sql.connect(sqlConfig);
    let request = await pool.request();
    request.input("Email", sql.VarChar(50), user.email);
    let findUser = await request.execute(`GET_USER`);
    if (findUser.recordsets[0].length == 0) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      console.log(hashedPassword);
      user.level = "user";
      request.input("Name", sql.VarChar(50), user.name);
      request.input("Level", sql.VarChar(50), user.level);
      request.input("Password", sql.VarChar(), hashedPassword);
      const newUser = getNewToken(user) as User;
      request.input("Token", sql.VarChar(), newUser.token);
      await request.execute(`ADD_USER`);
      return newUser;
    } else {
      return "need to log in";
    }

  } catch (error) {
    console.log("error registeration" + error);
  }
};

export const userLogin = async (user: User): Promise<User | string> => {
  try {
    let pool = await sql.connect(sqlConfig);
    let request = await pool.request();
    request.input("Email", sql.VarChar(50), user.email);
    const findUser = await request.execute(`GET_USER`);
    if (findUser.recordsets[0].length == 0) {
      return "can't find user. sign up!";
    } else if (findUser.recordsets[0].length == 1) {
      {
        const storedHashedPassword = findUser.recordsets[0][0];
        const isPasswordValid = await bcrypt.compare(
          user.password,
          storedHashedPassword.Password
        );
        if (isPasswordValid) {
          const newUser = getNewToken(findUser.recordsets[0][0]) as User;
          request.input("Token", sql.VarChar(), newUser.token);
          await request.execute(`UPDATE_TOKEN`)
          return newUser;
        } else {
          return "invalide credentials";
        }
      }
    }
  } catch (error) {
    throw "error login" + error;
  }
};
