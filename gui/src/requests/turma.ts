import {RequestResult, Turma} from '../../../common/interfaces'
import axios from 'axios'

const turmas: Turma[] = [{nome:"5º A"},{nome:"6º A"},{nome:"7º A"},{nome:"8º A"}]
const api = axios.create({baseURL:'http://localhost:3333/turma'})

export async function getTurmas():Promise<RequestResult>{
    const response = await api.get('/turmas')
    return response.data
}

export async function addTurma(nome:string):Promise<RequestResult>{
    const response = await api.post("/",{turma:nome});
    return response.data
}

export async function remTurma(nome:string):Promise<RequestResult>{
    const response = await api.delete(`/?turma=${nome}`);
    return response.data
}

function jaExisteTurma(nome:string):Turma{
    return turmas.find(turma=>turma.nome==nome)
}

function naoExisteTurma(nome:string):boolean{
    if (turmas.findIndex(turma=>turma.nome==nome)==-1) return true
    return false;
}