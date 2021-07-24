"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePass = exports.signup = exports.login = exports.rmvProfessor = exports.updateProfessorCode = exports.getProfessorCode = exports.getAllProfessores = void 0;
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_1 = __importDefault(require("../helpers/auth"));
async function getAllProfessores(req, res, db) {
    let response;
    try {
        const professores = await findProfessores(db);
        response = { data: professores };
    }
    catch (error) {
        response = { error: "Algo deu errado" };
    }
    return res.send(response);
}
exports.getAllProfessores = getAllProfessores;
async function findProfessores(db) {
    const professores = await db.collection('professores').find({ code: { $exists: false } }).project({ _id: 0, email: 1, nome: 1 }).toArray();
    return professores;
}
async function getProfessorCode(req, res, db) {
    let response;
    try {
        const professor = await findProfessor(req.query.email, db);
        response = { data: professor };
    }
    catch (error) {
        response = { error: "Algo deu errado" };
    }
    return res.send(response);
}
exports.getProfessorCode = getProfessorCode;
async function findProfessor(email, db) {
    const professor = await db.collection('professores').findOne({ email });
    const profPub = { nome: professor.nome, email: professor.nome };
    return profPub;
}
async function updateProfessorCode(req, res, db) {
    let response;
    try {
        let chs = [];
        let id = '';
        for (let i = 97; i < 123; i++) {
            chs.push(String.fromCharCode(i));
        }
        for (let i = 0; i < 10; i++) {
            chs.push(i + '');
        }
        for (let i = 0; i < 5; i++) {
            id = id.concat(chs[Math.floor(Math.random() * 36)]);
        }
        let professor = await updateProfessor(req.query.email, id, db);
        response = { data: professor };
    }
    catch (error) {
        response = { error: "Algo deu errado" };
    }
    return res.send(response);
}
exports.updateProfessorCode = updateProfessorCode;
async function updateProfessor(email, code, db) {
    const professor = await db.collection('professores').updateOne({ email }, { $set: { code: code } });
    return await findProfessor(email, db);
}
async function rmvProfessor(req, res, db) {
    let response;
    const prof = await db.collection('professores').findOne({ email: req.user.email });
    if (prof.type != "administrador") {
        return res.send({ error: "Você não possui permissão para essa operação" });
    }
    try {
        await deleteProfessor(req.query.email, db);
        response = { data: { succes: "excluído" } };
    }
    catch (error) {
        response = { error: "Algo deu errado" };
    }
    return res.send(response);
}
exports.rmvProfessor = rmvProfessor;
async function deleteProfessor(email, db) {
    await db.collection('professores').deleteOne({ email });
}
async function login(req, res, db) {
    const userReq = req.body;
    const user = await findProfessorPrivate(userReq.email, db);
    if (!user) {
        return res.status(401).send({ error: "Usuário não existe" });
    }
    const passwordMatched = await bcryptjs_1.compare(userReq.password, user.senha);
    if (!passwordMatched) {
        return res.status(403).send({ error: "Combinação email/senha incorreta" });
    }
    const SECONDS = 7 * 24 * 60 * 60;
    const token = jsonwebtoken_1.sign({}, auth_1.default.jwt.secret, {
        subject: user.email,
        expiresIn: auth_1.default.jwt.expiresIn,
    });
    return res.send({ data: { user, token, expiresIn: SECONDS } });
}
exports.login = login;
async function findProfessorPrivate(email, db) {
    const professor = await db.collection('professores').findOne({ email });
    return professor;
}
async function signup(req, res, db) {
    const userReq = req.body;
    console.log(userReq);
    const user = await findProfessorPrivate(userReq.email, db);
    if (user) {
        return res.status(401).send({ error: "Uma conta com esse email já existe" });
    }
    const invites = await (db.collection('invites').find({ email: userReq.email })).toArray();
    if (!invites.length || !invites.some(invite => invite.token == userReq.token)) {
        return res.status(403).send({ error: "token de acesso inválido" });
    }
    delete userReq["token"];
    userReq["type"] = "professor";
    userReq["senha"] = await bcryptjs_1.hash(userReq["password"], 12);
    delete userReq["password"];
    let safety_answer = userReq["safety_answer"].normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    safety_answer = safety_answer.toLowerCase();
    userReq["safety_answer"] = await bcryptjs_1.hash(safety_answer, 12);
    console.log(userReq);
    await db.collection('professores').insertOne(userReq);
    return res.send({ data: { user } });
}
exports.signup = signup;
async function changePass(req, res, db) {
    const userReq = req.body;
    const user = await findProfessorPrivate(userReq.email, db);
    if (!user) {
        return res.status(401).send({ error: "Usuário não existe" });
    }
    const questionMatched = userReq.safety_question == user.safety_question;
    let safety_answer = userReq["safety_answer"].normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    safety_answer = safety_answer.toLowerCase();
    const answerMatched = await bcryptjs_1.compare(safety_answer, user.safety_answer);
    if (!questionMatched || !answerMatched) {
        return res.status(403).send({ error: "Combinação pergunta/resposta incorreta" });
    }
    const newPassword = await bcryptjs_1.hash(userReq["password"], 12);
    await db.collection('professores').updateOne({ email: userReq.email }, { $set: { senha: newPassword } });
    return res.send({ data: { user } });
}
exports.changePass = changePass;
//# sourceMappingURL=professor-controller.js.map