"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.invite = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_1 = __importDefault(require("../helpers/auth"));
const sendEmail_1 = require("../helpers/sendEmail");
async function invite(req, res, db) {
    const prof = await db.collection('professores').findOne({ email: req.user.email });
    if (prof.type != "administrador") {
        return res.send({ error: "Você não possui permissão para essa operação" });
    }
    const email = req.body.email;
    const token = jsonwebtoken_1.sign({}, auth_1.default.jwt.secret, {
        subject: email,
        expiresIn: auth_1.default.jwt.expiresIn,
    });
    const link = `${process.env.FRONT_URL}/signup?token=${token}`;
    try {
        await sendEmail_1.sendInvite(email, link);
        await insertInvite(email, token, db);
        return res.send({ data: "Convite enviado" });
    }
    catch (error) {
        return res.send({ error: "Não pudemos enviar o convite" });
    }
}
exports.invite = invite;
async function insertInvite(email, token, db) {
    await db.collection('invites').insertOne({ email, token });
}
//# sourceMappingURL=admin-controller.js.map