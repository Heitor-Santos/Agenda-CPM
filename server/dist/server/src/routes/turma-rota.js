"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const turma_controller_1 = require("../controllers/turma-controller");
const ensureAuthenticated_1 = __importDefault(require("../helpers/ensureAuthenticated"));
const express_1 = require("express");
function default_1(db) {
    const routes = express_1.Router();
    routes.get('/turmas', (req, res) => turma_controller_1.getAllTurmas(req, res, db));
    routes.post('/', ensureAuthenticated_1.default, (req, res) => turma_controller_1.addTurma(req, res, db));
    routes.delete('/', ensureAuthenticated_1.default, (req, res) => turma_controller_1.rmvTurma(req, res, db));
    return routes;
}
exports.default = default_1;
//# sourceMappingURL=turma-rota.js.map