import { invite } from '../controllers/admin-controller';
import ensureAuthenticated from '../helpers/ensureAuthenticated';
import mongoose from 'mongodb'
import { Router } from 'express';

export default function (db: mongoose.Db): Router {
    const routes: Router = Router();

    routes.post('/invite',ensureAuthenticated, (req,res)=> invite(req,res,db))
    return routes
}