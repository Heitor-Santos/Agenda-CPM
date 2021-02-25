import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongodb'
import cors from 'cors'
import routes from './routes/routes'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
const mongoString = process.env.MONGOSTRING as string;
const port = process.env.PORT as string;
const dbname = process.env.DB_NAME as string;
const options = { useNewUrlParser: true, useUnifiedTopology: true }
let db: mongoose.Db

mongoose.connect(mongoString, options, (err, client) => {
    if (!err) {
        db = client.db(dbname)
        console.log("Mongo conectado")
        app.use('/', routes(db))
        app.listen(port, () => {
            console.log(`Servidor ouvindo na porta ${port}`)
        })
    }
    else console.log('Erro ao conectar mongo: ', err.errmsg)
})