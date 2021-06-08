"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rmvTurma = exports.addTurma = exports.getAllTurmas = void 0;
async function getAllTurmas(req, res, db) {
    let response;
    try {
        const turmas = await findTurmas(db);
        response = { data: turmas };
    }
    catch (error) {
        response = { error: "Algo deu errado" };
    }
    return res.send(response);
}
exports.getAllTurmas = getAllTurmas;
async function findTurmas(db) {
    const turmas = await db.collection('turmas').find({}).project({ _id: 0 }).toArray();
    return turmas;
}
async function addTurma(req, res, db) {
    let response;
    try {
        const prof = await db.collection('professores').findOne({ email: req.user.email });
        if (prof.type != "administrador") {
            return res.send({ error: "Você não possui permissão para essa operação" });
        }
        if (await existsTurma(req.body.turma, db)) {
            response = { error: 'Essa turma já existe' };
        }
        else {
            const turma = await createTurma(req.body.turma, db);
            response = { data: turma };
        }
    }
    catch (error) {
        response = { error: "Não conseguimos criar a turma" };
    }
    return res.send(response);
}
exports.addTurma = addTurma;
async function existsTurma(nome, db) {
    const turma = await db.collection('turmas').findOne({ nome });
    if (turma)
        return true;
    return false;
}
async function createTurma(nome, db) {
    await db.collection('turmas').insertOne({ nome });
    const turma = await db.collection('turmas').findOne({ nome });
    delete turma._id;
    return turma;
}
async function rmvTurma(req, res, db) {
    let response;
    try {
        const prof = await db.collection('professores').findOne({ email: req.user.email });
        if (prof.type != "administrador") {
            return res.send({ error: "Você não possui permissão para essa operação" });
        }
        if (await !existsTurma(req.query.turma, db)) {
            response = { error: 'Essa turma não existe' };
        }
        else {
            await deleteTurma(req.query.turma, db);
            response = { data: 'null' };
        }
    }
    catch (error) {
        response = { error: "Algo deu errado" };
    }
    return res.send(response);
}
exports.rmvTurma = rmvTurma;
async function deleteTurma(nome, db) {
    await db.collection('turmas').deleteOne({ nome });
}
//# sourceMappingURL=turma-controller.js.map