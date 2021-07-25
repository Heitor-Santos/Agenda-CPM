import { Request, Response } from 'express';
import mongoose from 'mongodb';
import { uuid } from 'uuidv4';
import { Avaliacao, RequestResult } from '../../../common/interfaces'

export async function getAvaliacoesByTurma(req: Request, res: Response, db: mongoose.Db) {
    let response: RequestResult
    try {
        const avaliacoes = await findAvaliacoes({ turma: req.query.turma, data: { $gte: new Date().toISOString() } }, db)
        response = { data: JSON.stringify(avaliacoes) }
    }
    catch (error) {
        response = { error: "Algo deu errado" }
    }
    return res.send(response)
}
export async function getAvaliacoesByProfessor(req: Request, res: Response, db: mongoose.Db) {
    let response: RequestResult

    try {
        const avaliacoes = await findAvaliacoes({ professorEmail: req.query.email }, db)
        response = { data: avaliacoes }
    }
    catch (error) {
        response = { error: "Algo deu errado" }
    }
    return res.send(response)
}

async function findAvaliacoes(query: Object, db: mongoose.Db): Promise<Avaliacao[]> {
    const avaliacoes: Avaliacao[] = await db.collection('avaliacoes').find(query).project({ _id: 0 }).sort({ data: 1 }).toArray()
    return avaliacoes;
}

export async function rmvAvaliacao(req: Request, res: Response, db: mongoose.Db) {
    let response: RequestResult
    try {
        let aval = await db.collection('avaliacoes').findOne({ id: req.query.id })
        await db.collection('avaliacoes').deleteOne({ id: req.query.id })
        response = { data: aval }
    }
    catch (error) {
        response = { error: "Algo deu errado" }
    }
    return res.send(response)
}
export async function newAvaliacao(req: Request, res: Response, db: mongoose.Db) {
    console.log(req.body)
    let split = req.body.data.split('/');
    let formartData = [split[1], split[0], split[2]].join('/')
    req.body.data = formartData;
    if (differenceOfDays(new Date(formartData), new Date()) < 15) {
        return res.send({ 'error': "Você só pode criar avaliações para daqui a 15 dias" })
    }
    if (await turmaTemDuasAvaliacoes(req.body.turma, formartData, db)) {
        return res.send({ 'error': "Essa turma já tem duas avaliações" })
    }
    if (await jaExisteAvaliacao(req.body, db)) {
        return res.send({ 'error': "Você já criou essa avaliação" })
    }
    let response: RequestResult
    try {
        let aval = Object.assign({ id: uuid() }, req.body)
        aval.data = new Date(aval.data).toISOString()
        console.log(aval)
        await db.collection('avaliacoes').insertOne(aval);
        response = { data: aval }
    }
    catch (error) {
        response = { error: "Algo deu errado" }
    }
    return res.send(response)
}

async function turmaTemDuasAvaliacoes(turma: string, date: string, db: mongoose.Db): Promise<boolean> {
    const avals = await findAvaliacoes({ turma, data: new Date(date) }, db)
    return (avals.length >= 2)
}

async function jaExisteAvaliacao(avaliacao: Avaliacao, db: mongoose.Db): Promise<boolean> {
    const aval = await db.collection('avaliacoes').findOne(avaliacao)
    return aval != null
}
function differenceOfDays(futuro: Date, passado: Date): number {
    return (futuro.getTime() - passado.getTime()) / (1000 * 3600 * 24)
}