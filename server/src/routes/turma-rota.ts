import { addTurma, getAllTurmas,rmvTurma } from '../controllers/turma-controller';
import mongoose from 'mongodb'
import { Router } from 'express';

export default function (db: mongoose.Db): Router {
    const routes: Router = Router();

    routes.get('/turmas', (req, res) => getAllTurmas(req, res, db))
    routes.get('/add-turma', (req, res) => addTurma(req, res, db))
    routes.put('/rmv-turma', (req, res) => rmvTurma(req,res,db))
    return routes
}