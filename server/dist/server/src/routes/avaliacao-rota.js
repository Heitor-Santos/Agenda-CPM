"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const avaliacao_controller_1 = require("../controllers/avaliacao-controller");
const ensureAuthenticated_1 = __importDefault(require("../helpers/ensureAuthenticated"));
const express_1 = require("express");
function default_1(db) {
    const routes = express_1.Router();
    routes.get('/avaliacoes', (req, res) => avaliacao_controller_1.getAvaliacoesByTurma(req, res, db));
    routes.get('/avaliacoes-professor', ensureAuthenticated_1.default, (req, res) => avaliacao_controller_1.getAvaliacoesByProfessor(req, res, db));
    routes.delete('/', ensureAuthenticated_1.default, (req, res) => avaliacao_controller_1.rmvAvaliacao(req, res, db));
    routes.post('/', ensureAuthenticated_1.default, (req, res) => avaliacao_controller_1.newAvaliacao(req, res, db));
    return routes;
}
exports.default = default_1;
//# sourceMappingURL=avaliacao-rota.js.map