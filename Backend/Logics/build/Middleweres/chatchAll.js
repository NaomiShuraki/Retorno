"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAll = void 0;
var logger_1 = require("../Utils/logger");
var catchAll = function (err, res, next) {
    var statusCode = err.status;
    console.log(err.message);
    // Log the error
    (0, logger_1.logger)(err.message);
    if (statusCode) {
        // Send back the error to the front
        res.status(statusCode).send(err.message);
    }
    else {
        res.status(200);
    }
};
exports.catchAll = catchAll;
