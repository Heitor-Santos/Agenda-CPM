import {RequestResult, Turma} from '../../../common/interfaces'
import axios from 'axios'

const location = window.location.href;
const baseName = location.split('/')[0];

const api = axios.create({baseURL: location.includes('http://localhost:4200/') ? 'http://localhost:3333/api/turma' : `${baseName}/api/turma`})

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