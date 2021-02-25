import { Router } from 'express';
import mongoose from 'mongodb'
import aval from './avaliacao-rota'
import prof from './professor-rota'
import turma from './turma-rota'

export default function (db: mongoose.Db): Router {
    const routes: Router = Router();
    routes.use('/aval', aval(db))
    routes.use('/prof', prof(db))
    routes.use('/turma', turma(db))
    return routes
}