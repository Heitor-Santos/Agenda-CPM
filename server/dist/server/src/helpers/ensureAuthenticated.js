"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_1 = __importDefault(require("./auth"));
function ensureAuthenticated(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.json({ "error": "JWT token is missing" });
        return;
    }
    const [, token] = authHeader.split(' ');
    try {
        const decoded = jsonwebtoken_1.verify(token, auth_1.default.jwt.secret);
        const { sub } = decoded;
        req.user = {
            email: sub,
        };
        return next();
    }
    catch {
        res.json({ "error": "Invalid JWT token" });
        return;
    }
}
exports.default = ensureAuthenticated;
//# sourceMappingURL=ensureAuthenticated.js.map