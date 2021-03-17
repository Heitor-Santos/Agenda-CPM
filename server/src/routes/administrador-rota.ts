import { invite } from '../controllers/admin-controller';

import mongoose from 'mongodb'
import { Router } from 'express';

export default function (db: mongoose.Db): Router {
    const routes: Router = Router();

    routes.post('/invite',(req,res)=> invite(req,res,db))
    return routes
}