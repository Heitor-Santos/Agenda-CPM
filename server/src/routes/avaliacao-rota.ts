import { getAvaliacoesByTurma, getAvaliacoesByProfessor, newAvaliacao, rmvAvaliacao } from '../controllers/avaliacao-controller';
import mongoose from 'mongodb'
import { Router } from 'express';

export default function (db: mongoose.Db): Router {
    const routes: Router = Router();

    routes.get('/avaliacoes', (req, res) => getAvaliacoesByTurma(req, res, db))
    routes.get('/avaliacoes-professor', (req, res) => getAvaliacoesByProfessor(req, res, db))
    routes.delete('/avaliacao', (req, res) => rmvAvaliacao(req, res, db))
    routes.post('/avaliacao', (req, res) => newAvaliacao(req, res, db))
    return routes
}