"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var chatchAll_1 = require("./Middleweres/chatchAll");
var satitize_1 = require("./Middleweres/satitize");
var dal_1 = require("./Utils/dal");
var usersController_1 = __importDefault(require("./Controllers/usersController"));
var path_1 = __importDefault(require("path"));
var cors_1 = __importDefault(require("cors"));
var storage = require('node-sessionstorage');
(0, dal_1.connectmMgoDB)();
var server = (0, express_1.default)();
server.use((0, cors_1.default)());
server.use('/api', (0, express_rate_limit_1.default)({
    max: 3,
    windowMs: 1000,
}));
server.use(express_1.default.json());
server.use(satitize_1.sanitize);
server.use("/api", usersController_1.default);
var publicDirectoryPath = path_1.default.join(__dirname, '../public');
// express.static - middlewere for using static file, like css, html...
// this is used so we are not going to use a route for connect the front-side
server.use(express_1.default.static(publicDirectoryPath));
server.use(chatchAll_1.catchAll);
exports.app = server.listen(3001, function () {
    console.log("Server listening on port 3001");
});
var io = require("socket.io")(exports.app, {
    allowEIO3: true,
    cors: {
        origin: true,
        methods: ['GET', 'POST'],
        credentials: true
    }
});
;
io.on("connection", function (socket) {
    socket.on("send-token", function (username) {
        console.log(username);
        socket.on("chat-message", function (msg) {
            io.to(username, msg.socketId).emit("chat-message", msg);
            console.log(msg);
        });
    });
    console.log("Connected: ");
    socket.on("disconnect", function () {
        console.log("Disconnected: ");
    });
});
