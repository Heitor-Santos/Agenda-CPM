import { Request, Response } from 'express';
import mongoose from 'mongodb'
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { Professor, ProfessorPublic, RequestResult } from '../../../common/interfaces'
import auth from '../helpers/auth';

export async function getAllProfessores(req: Request, res: Response, db: mongoose.Db) {
    let response: RequestResult
    try {
        const professores: ProfessorPublic[] = await findProfessores(db)
        response = { data: professores }
    }
    catch (error) {
        response = { error: "Algo deu errado" }
    }
    return res.send(response)
}

async function findProfessores(db: mongoose.Db): Promise<ProfessorPublic[]> {
    const professores: ProfessorPublic[] = await db.collection('professores').find({ code: { $exists: false } }).project({ _id: 0, email: 1, nome: 1 }).toArray()
    return professores;
}

export async function getProfessorCode(req: Request, res: Response, db: mongoose.Db) {
    let response: RequestResult
    try {
        const professor: ProfessorPublic = await findProfessor(req.query.email as string, db)
        response = { data: professor }
    }
    catch (error) {
        response = { error: "Algo deu errado" }
    }
    return res.send(response)
}

async function findProfessor(email: string, db: mongoose.Db): Promise<ProfessorPublic> {
    const professor = await db.collection('professores').findOne({ email })
    const profPub: ProfessorPublic = { nome: professor.nome, email: professor.nome }
    return profPub;
}

export async function updateProfessorCode(req: Request, res: Response, db: mongoose.Db) {
    let response: RequestResult
    try {
        let chs = []
        let id = ''
        for (let i = 97; i < 123; i++) {
            chs.push(String.fromCharCode(i))
        }
        for (let i = 0; i < 10; i++) {
            chs.push(i + '')
        }
        for (let i = 0; i < 5; i++) {
            id = id.concat(chs[Math.floor(Math.random() * 36)])
        }
        let professor: ProfessorPublic = await updateProfessor(req.query.email as string, id, db)
        response = { data: professor }
    }
    catch (error) {
        response = { error: "Algo deu errado" }
    }
    return res.send(response)
}

async function updateProfessor(email: string, code: string, db: mongoose.Db): Promise<ProfessorPublic> {
    const professor = await db.collection('professores').updateOne({ email }, { $set: { code: code } })
    return await findProfessor(email, db);
}

export async function rmvProfessor(req: Request, res: Response, db: mongoose.Db) {
    let response: RequestResult
    const prof = await db.collection('professores').findOne({ email: req.user.email });
    if (prof.type != "administrador") {
        return res.send({ error: "Você não possui permissão para essa operação" });
    }
    try {
        await deleteProfessor(req.query.email as string, db)
        response = { data: { succes: "excluído" } }
    }
    catch (error) {
        response = { error: "Algo deu errado" }
    }
    return res.send(response)
}

async function deleteProfessor(email: string, db: mongoose.Db): Promise<void> {
    await db.collection('professores').deleteOne({ email })
}

export async function login(req: Request, res: Response, db: mongoose.Db) {
    const userReq = req.body;
    const user = await findProfessorPrivate(userReq.email as string, db);
    if (!user) {
        return res.status(401).send({ error: "Usuário não existe" });
    }
    const passwordMatched = await compare(userReq.password as string, user.senha);
    if (!passwordMatched) {
        return res.status(403).send({ error: "Combinação email/senha incorreta" });
    }
    const SECONDS = 7 * 24 * 60 * 60
    const token = sign({}, auth.jwt.secret, {
        subject: user.email,
        expiresIn: auth.jwt.expiresIn,
    });
    return res.send({ data: { user, token, expiresIn: SECONDS } })
}

async function findProfessorPrivate(email: string, db: mongoose.Db): Promise<Professor> {
    const professor = await db.collection('professores').findOne({ email })
    return professor;
}

export async function signup(req: Request, res: Response, db: mongoose.Db) {
    const userReq = req.body;
    const user = await findProfessorPrivate(userReq.email as string, db);
    if (user) {
        return res.status(401).send({ error: "Uma conta com esse email já existe" });
    }
    const invite = await db.collection('invites').findOne({ email: userReq.email });
    if (!invite || invite.token != userReq.token) {
        return res.status(403).send({ error: "token de acesso inválido" });
    }
    userReq["type"] = "professor";
    userReq["password"] = await hash(userReq["password"], 12);
    await db.collection('professores').insertOne(userReq)
    return res.send({ data: { user } });
}
