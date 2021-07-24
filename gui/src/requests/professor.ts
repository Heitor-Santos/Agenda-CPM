import { RequestResult } from '../../../common/interfaces'
import axios from 'axios'

const location = window.location.href;
const baseName = location.split('/')[0];

const api = axios.create({ baseURL: location.includes('http://localhost:4200/') ? 'http://localhost:3333/api/prof' : `${baseName}/api/prof` })
export async function getProfessores(): Promise<RequestResult> {
    const token = localStorage.getItem("AgendaCPMToken");
    const response = await api.get('/professores', {
        headers: {
            'Authorization': `Basic ${token}`
        }
    })
    return response.data
}

export async function remProf(profEmail: string): Promise<RequestResult> {
    const token = localStorage.getItem("AgendaCPMToken");
    const response = await api.delete(`?email=${profEmail}`, {
        headers: {
            'Authorization': `Basic ${token}`
        }
    })
    return response.data
}

export async function login(email: string, password: string) {
    try {
        const response = await api.post("/login", { email, password })
        return response.data;
    }
    catch (err) {
        return err.response.data
    }
}

export async function signup(name: string, email: string, password: string, token: string,  safety_question: string, safety_answer: string) {
    try {
        const response = await api.post("/signup", { name, email, password, token, safety_question, safety_answer })
        return response.data;
    }
    catch (err) {
        return err.response.data
    }
}