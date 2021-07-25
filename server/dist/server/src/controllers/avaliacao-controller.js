"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newAvaliacao = exports.rmvAvaliacao = exports.getAvaliacoesByProfessor = exports.getAvaliacoesByTurma = void 0;
const uuidv4_1 = require("uuidv4");
async function getAvaliacoesByTurma(req, res, db) {
    let response;
    try {
        const avaliacoes = await findAvaliacoes({ turma: req.query.turma, data: { $gte: new Date().toISOString() } }, db);
        response = { data: JSON.stringify(avaliacoes) };
    }
    catch (error) {
        response = { error: "Algo deu errado" };
    }
    return res.send(response);
}
exports.getAvaliacoesByTurma = getAvaliacoesByTurma;
async function getAvaliacoesByProfessor(req, res, db) {
    let response;
    try {
        const avaliacoes = await findAvaliacoes({ professorEmail: req.query.email }, db);
        response = { data: avaliacoes };
    }
    catch (error) {
        response = { error: "Algo deu errado" };
    }
    return res.send(response);
}
exports.getAvaliacoesByProfessor = getAvaliacoesByProfessor;
async function findAvaliacoes(query, db) {
    const avaliacoes = await db.collection('avaliacoes').find(query).project({ _id: 0 }).sort({ data: 1 }).toArray();
    return avaliacoes;
}
async function rmvAvaliacao(req, res, db) {
    let response;
    try {
        let aval = await db.collection('avaliacoes').findOne({ id: req.query.id });
        await db.collection('avaliacoes').deleteOne({ id: req.query.id });
        response = { data: aval };
    }
    catch (error) {
        response = { error: "Algo deu errado" };
    }
    return res.send(response);
}
exports.rmvAvaliacao = rmvAvaliacao;
async function newAvaliacao(req, res, db) {
    console.log(req.body);
    let split = req.body.data.split('/');
    let formartData = [split[1], split[0], split[2]].join('/');
    req.body.data = formartData;
    if (differenceOfDays(new Date(formartData), new Date()) < 15) {
        return res.send({ 'error': "Você só pode criar avaliações para daqui a 15 dias" });
    }
    if (await turmaTemDuasAvaliacoes(req.body.turma, formartData, db)) {
        return res.send({ 'error': "Essa turma já tem duas avaliações" });
    }
    if (await jaExisteAvaliacao(req.body, db)) {
        return res.send({ 'error': "Você já criou essa avaliação" });
    }
    let response;
    try {
        let aval = Object.assign({ id: uuidv4_1.uuid() }, req.body);
        aval.data = new Date(aval.data).toISOString();
        console.log(aval);
        await db.collection('avaliacoes').insertOne(aval);
        response = { data: aval };
    }
    catch (error) {
        response = { error: "Algo deu errado" };
    }
    return res.send(response);
}
exports.newAvaliacao = newAvaliacao;
async function turmaTemDuasAvaliacoes(turma, date, db) {
    const avals = await findAvaliacoes({ turma, data: new Date(date) }, db);
    return (avals.length >= 2);
}
async function jaExisteAvaliacao(avaliacao, db) {
    const aval = await db.collection('avaliacoes').findOne(avaliacao);
    return aval != null;
}
function differenceOfDays(futuro, passado) {
    return (futuro.getTime() - passado.getTime()) / (1000 * 3600 * 24);
}
//# sourceMappingURL=avaliacao-controller.js.map