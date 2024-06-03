"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = exports.corsConfig = exports.mongoDB_url = exports.sqlConfig = void 0;
var developmentConfig = {
    host: "localhost",
    user: "root",
    password: "",
    database: "My-Muse",
    port: 3001
};
var productionConfig = {
    host: "myWebsite.com",
    user: "root",
    password: "",
    database: "My-Muse",
    port: 3001
};
exports.sqlConfig = {
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
};
exports.mongoDB_url = "mongodb+srv://nshuraki:petra6138@cluster0.dplgmin.mongodb.net/";
exports.corsConfig = { origin: "".concat(process.env.CLIENT), credentials: true, optionSuccessStatus: 200 };
exports.appConfig = process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig;
