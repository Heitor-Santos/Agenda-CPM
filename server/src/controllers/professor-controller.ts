import { Request, Response } from 'express';
import mongoose from 'mongodb'
import { ProfessorPublic, RequestResult } from '../../../common/interfaces'

export async function getAllProfessores(req: Request, res: Response, db: mongoose.Db) {
    let response: RequestResult
    try {
        const professores: ProfessorPublic[] = await findProfessores(db)
        response = { data: JSON.stringify(professores) }
    }
    catch (error) {
        response = { error: error.valueString() }
    }
    return res.send(response)
}

async function findProfessores(db: mongoose.Db): Promise<ProfessorPublic[]> {
    const professores: ProfessorPublic[] = await db.collection('professores').find({}).project({ _id: 0, email:1, nome:1}).toArray()
    return professores;
}

export async function getProfessorCode(req: Request, res: Response, db: mongoose.Db) {
    let response: RequestResult
    try {
        const professor: ProfessorPublic = await findProfessor(req.query.email as string, db)
        response = { data: JSON.stringify(professor) }
    }
    catch (error) {
        response = { error: error.valueString() }
    }
    return res.send(response)
}

async function findProfessor(email: string, db: mongoose.Db): Promise<ProfessorPublic> {
    const professor = await db.collection('professores').findOne({ email })
    const profPub: ProfessorPublic ={nome:professor.nome, email: professor.nome}
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
            chs.push(i+'')
        }
        for (let i = 0; i < 5; i++) {
            id = id.concat(chs[Math.floor(Math.random() * 36)])
        }
        let professor : ProfessorPublic = await updateProfessor(req.query.email as string, id, db)
        response = {data: JSON.stringify(professor)}
    }
    catch (error) {
        response = { error: error.valueString() }
    }
    return res.send(response)
}

async function updateProfessor(email: string, code: string, db: mongoose.Db): Promise<ProfessorPublic> {
    const professor = await db.collection('professores').updateOne({ email }, { $set: { code: code } })
    return await findProfessor(email, db);
}

export async function rmvProfessor(req: Request, res: Response, db: mongoose.Db) {
    let response: RequestResult
    try {
        await deleteProfessor(req.query.email as string, db)
        response = { data: 'null' }
    }
    catch (error) {
        response = { error: error.valueString() }
    }
    return res.send(response)
}

async function deleteProfessor(email: string, db: mongoose.Db): Promise<void> {
    await db.collection('professores').deleteOne({ email })
}