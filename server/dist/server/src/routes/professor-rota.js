"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const professor_controller_1 = require("../controllers/professor-controller");
const ensureAuthenticated_1 = __importDefault(require("../helpers/ensureAuthenticated"));
const express_1 = require("express");
function default_1(db) {
    const routes = express_1.Router();
    routes.get('/professores', ensureAuthenticated_1.default, (req, res) => professor_controller_1.getAllProfessores(req, res, db));
    routes.get('/prof-code', (req, res) => professor_controller_1.getProfessorCode(req, res, db));
    routes.put('/prof-code', (req, res) => professor_controller_1.updateProfessorCode(req, res, db));
    routes.delete('/', ensureAuthenticated_1.default, (req, res) => professor_controller_1.rmvProfessor(req, res, db));
    routes.post('/login', (req, res) => professor_controller_1.login(req, res, db));
    routes.post('/signup', (req, res) => professor_controller_1.signup(req, res, db));
    routes.post('/change-pass', (req, res) => professor_controller_1.changePass(req, res, db));
    return routes;
}
exports.default = default_1;
//# sourceMappingURL=professor-rota.js.map