import jwt from "jsonwebtoken";
import { Request } from "express";
import crypto from "crypto";
import { User } from "../Models/typs/users";

const secretKey = "myMuseKey";

export const getNewToken = (user: User): User => {
  delete user.password;

  // Create container for the user object
  const container = { user };

  // Create expiration time '/ options object
  const options = { expiresIn: "3h" };
  // Generate the token
  const token = jwt.sign(container, secretKey, options);
  user.token = token;
  return user;
};

export const verifyToken = (request: Request): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    try {
      const header = request.header("authorization");
      if (!header) {
        resolve(false);
        return;
      }
      const token = header.substring(7);
      if (!token) {
        resolve(false);
        return;
      }
      jwt.verify(token, secretKey, (err: any) => {
        if (err) {
          resolve(false);
          return;
        }
        resolve(true);
      });
    } catch (err: any) {
      reject(err);
    }
  });
};

const salt = "wowWhatASaltTasty";

export const hashing = (text: string): string => {
  if (!text) return null;

  const hashedText = crypto
    .createHmac("sha512", salt)
    .update(text)
    .digest("hex");

  return hashedText;
};
