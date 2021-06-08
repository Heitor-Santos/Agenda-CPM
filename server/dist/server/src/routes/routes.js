"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const avaliacao_rota_1 = __importDefault(require("./avaliacao-rota"));
const professor_rota_1 = __importDefault(require("./professor-rota"));
const turma_rota_1 = __importDefault(require("./turma-rota"));
const administrador_rota_1 = __importDefault(require("./administrador-rota"));
function default_1(db) {
    const routes = express_1.Router();
    routes.use('/aval', avaliacao_rota_1.default(db));
    routes.use('/prof', professor_rota_1.default(db));
    routes.use('/turma', turma_rota_1.default(db));
    routes.use('/admin', administrador_rota_1.default(db));
    return routes;
}
exports.default = default_1;
//# sourceMappingURL=routes.js.map