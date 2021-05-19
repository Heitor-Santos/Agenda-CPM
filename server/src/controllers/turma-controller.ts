import { Request, Response } from 'express';
import mongoose from 'mongodb'
import { Turma, RequestResult } from '../../../common/interfaces'

export async function getAllTurmas(req: Request, res: Response, db: mongoose.Db) {
    let response: RequestResult
    try {
        const turmas: Turma[] = await findTurmas(db)
        response = { data: turmas }
    }
    catch (error) {
        response = { error: "Algo deu errado" }
    }
    return res.send(response)
}

async function findTurmas(db: mongoose.Db): Promise<Turma[]> {
    const turmas: Turma[] = await db.collection('turmas').find({}).project({ _id: 0 }).toArray()
    return turmas;
}

export async function addTurma(req: Request, res: Response, db: mongoose.Db) {
    let response: RequestResult
    try {
        const prof = await db.collection('professores').findOne({ email: req.user.email });
        if (prof.type != "administrador") {
            return res.send({ error: "Você não possui permissão para essa operação" }); 
        }
        if (await existsTurma(req.body.turma as string, db)) {
            response = { error: 'Essa turma já existe' }
        }
        else {
            const turma: Turma = await createTurma(req.body.turma as string, db)
            response = { data: turma }
        }
    }
    catch (error) {
        response = { error: "Não conseguimos criar a turma" }
    }
    return res.send(response)
}

async function existsTurma(nome: string, db: mongoose.Db): Promise<boolean> {
    const turma = await db.collection('turmas').findOne({ nome })
    if (turma) return true
    return false
}

async function createTurma(nome: string, db: mongoose.Db): Promise<Turma> {
    await db.collection('turmas').insertOne({ nome })
    const turma = await db.collection('turmas').findOne({ nome })
    delete turma._id
    return turma
}

export async function rmvTurma(req: Request, res: Response, db: mongoose.Db) {
    let response: RequestResult
    try {
        const prof = await db.collection('professores').findOne({ email: req.user.email });
        if (prof.type != "administrador") {
            return res.send({ error: "Você não possui permissão para essa operação" }); 
        }
        if (await !existsTurma(req.query.turma as string, db)) {
            response = { error: 'Essa turma não existe' }
        }
        else {
            await deleteTurma(req.query.turma as string, db)
            response = { data: 'null' }
        }
    }
    catch (error) {
        response = { error: "Algo deu errado" }
    }
    return res.send(response)
}

async function deleteTurma(nome: string, db: mongoose.Db): Promise<void> {
    await db.collection('turmas').deleteOne({ nome })
}