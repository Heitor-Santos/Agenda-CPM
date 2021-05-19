import { getAvaliacoesByTurma, getAvaliacoesByProfessor, newAvaliacao, rmvAvaliacao } from '../controllers/avaliacao-controller';
import ensureAuthenticated from '../helpers/ensureAuthenticated';
import mongoose from 'mongodb'
import { Router } from 'express';

export default function (db: mongoose.Db): Router {
    const routes: Router = Router();

    routes.get('/avaliacoes', (req, res) => getAvaliacoesByTurma(req, res, db))
    routes.get('/avaliacoes-professor', ensureAuthenticated, (req, res) => getAvaliacoesByProfessor(req, res, db))
    routes.delete('/', ensureAuthenticated, (req, res) => rmvAvaliacao(req, res, db))
    routes.post('/', ensureAuthenticated, (req, res) => newAvaliacao(req, res, db))
    return routes
}