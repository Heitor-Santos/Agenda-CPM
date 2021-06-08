"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_controller_1 = require("../controllers/admin-controller");
const ensureAuthenticated_1 = __importDefault(require("../helpers/ensureAuthenticated"));
const express_1 = require("express");
function default_1(db) {
    const routes = express_1.Router();
    routes.post('/invite', ensureAuthenticated_1.default, (req, res) => admin_controller_1.invite(req, res, db));
    return routes;
}
exports.default = default_1;
//# sourceMappingURL=administrador-rota.js.map