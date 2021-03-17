import { getAllProfessores, getProfessorCode, updateProfessorCode, rmvProfessor, login} from '../controllers/professor-controller';
import mongoose from 'mongodb'
import { Router } from 'express';

export default function (db: mongoose.Db): Router {
    const routes: Router = Router();

    routes.get('/professores', (req, res) => getAllProfessores(req, res, db))
    routes.get('/prof-code', (req, res) => getProfessorCode(req, res, db))
    routes.put('/prof-code', (req, res) => updateProfessorCode(req,res,db))
    routes.delete('/', (req, res) => rmvProfessor(req, res, db))
    routes.post('/login',(req,res)=> login(req,res,db))
    return routes
}