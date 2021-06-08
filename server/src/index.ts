import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongodb'
import cors from 'cors'
import routes from './routes/routes'
import dotenv from 'dotenv'
import path from 'path';

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

const INDEX_PATH = path.join(
    __dirname,
    '..',
    '..',
    '..',
    '..',
    'gui',
    'dist',
    'Agenda-CPM'
);

const mongoString = process.env.MONGOSTRING as string;
const port = process.env.PORT as string;
const dbname = process.env.DB_NAME as string;
const options = { useNewUrlParser: true, useUnifiedTopology: true }
let db: mongoose.Db

mongoose.connect(mongoString, options, (err, client) => {
    if (!err) {
        db = client.db(dbname)
        console.log("Mongo conectado")
        db.collection('professores').updateMany({ code: { $exists: false } }, { $set: { "type": "professor" } })
        app.use('/api', routes(db));
        app.use(express.static(INDEX_PATH));
        app.get('/*', (_req: Request, res: Response) => {
            try{
                return res.sendFile(`${INDEX_PATH}/index.html`);
            }
            catch(err){
                console.log(err);
                return res.send({msg:err})
            }
        });
        app.listen(port, () => {
            console.log(`Servidor ouvindo na porta ${port}`)
        })
    }
    else console.log('Erro ao conectar mongo: ', err.errmsg)
})