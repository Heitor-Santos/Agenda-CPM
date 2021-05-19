import { addTurma, getAllTurmas,rmvTurma } from '../controllers/turma-controller';
import ensureAuthenticated from '../helpers/ensureAuthenticated';
import mongoose from 'mongodb'
import { Router } from 'express';

export default function (db: mongoose.Db): Router {
    const routes: Router = Router();

    routes.get('/turmas', (req, res) => getAllTurmas(req, res, db))
    routes.post('/', ensureAuthenticated, (req, res) => addTurma(req, res, db))
    routes.delete('/', ensureAuthenticated, (req, res) => rmvTurma(req,res,db))
    return routes
}