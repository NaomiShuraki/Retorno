import { AppConfigType } from "../Models/typs/appConfigTyp";



const developmentConfig: AppConfigType = {
    host: "localhost",
    user: "root",
    password: "",
    database: "My-Muse",
    port: 3001
}

const productionConfig: AppConfigType = {
    host: "myWebsite.com",
    user: "root",
    password: "",
    database: "My-Muse",
    port: 3001
}

export const sqlConfig = {
  user: 'sqluser',
  password: '5252',
  database: 'naomieDB',
  server: 'localhost',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
}
export const corsConfig = { origin: `${process.env.CLIENT}`, credentials: true, optionSuccessStatus: 200 }
export const appConfig: AppConfigType = process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig;

