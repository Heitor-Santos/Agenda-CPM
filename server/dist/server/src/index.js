"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongodb_1 = __importDefault(require("mongodb"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes/routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
const INDEX_PATH = path_1.default.join(__dirname, '..', '..', '..', '..', 'gui', 'dist', 'Agenda-CPM');
app.use(express_1.default.static(INDEX_PATH));
app.get('/*', (_req, res) => {
    try {
        return res.sendFile(`${INDEX_PATH}/index.html`);
    }
    catch (err) {
        console.log(err);
        return res.send({ msg: err });
    }
});
const mongoString = process.env.MONGOSTRING;
const port = process.env.PORT;
const dbname = process.env.DB_NAME;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
let db;
mongodb_1.default.connect(mongoString, options, (err, client) => {
    if (!err) {
        db = client.db(dbname);
        console.log("Mongo conectado");
        db.collection('professores').updateMany({ code: { $exists: false } }, { $set: { "type": "professor" } });
        app.use('/api', routes_1.default(db));
        app.listen(port, () => {
            console.log(`Servidor ouvindo na porta ${port}`);
        });
    }
    else
        console.log('Erro ao conectar mongo: ', err.errmsg);
});
//# sourceMappingURL=index.js.map