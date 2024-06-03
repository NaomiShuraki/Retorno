"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashing = exports.verifyToken = exports.getNewTokenAdmins = exports.getNewToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var crypto_1 = __importDefault(require("crypto"));
var secretKey = "myMuseKey";
var getNewToken = function (customer) {
    delete customer.password;
    // Create container for the user object
    var container = { customer: customer };
    // Create expiration time '/ options object
    var options = { expiresIn: '3h' };
    // Generate the token
    var token = jsonwebtoken_1.default.sign(container, secretKey, options);
    return { token: token, user: customer };
};
exports.getNewToken = getNewToken;
var getNewTokenAdmins = function (admin) {
    delete admin.password;
    // Create container for the user object
    var container = { admin: admin };
    // Create expiration time '/ options object
    var options = { expiresIn: '3h' };
    // Generate the token
    var token = jsonwebtoken_1.default.sign(container, secretKey, options);
    return { token: token, user: admin };
};
exports.getNewTokenAdmins = getNewTokenAdmins;
var verifyToken = function (request) {
    return new Promise(function (resolve, reject) {
        try {
            var header = request.header("authorization");
            if (!header) {
                resolve(false);
                return;
            }
            var token = header.substring(7);
            if (!token) {
                resolve(false);
                return;
            }
            jsonwebtoken_1.default.verify(token, secretKey, function (err) {
                if (err) {
                    resolve(false);
                    return;
                }
                resolve(true);
            });
        }
        catch (err) {
            reject(err);
        }
    });
};
exports.verifyToken = verifyToken;
var salt = "wowWhatASaltTasty";
var hashing = function (text) {
    if (!text)
        return null;
    var hashedText = crypto_1.default.createHmac("sha512", salt).update(text).digest("hex");
    return hashedText;
};
exports.hashing = hashing;
