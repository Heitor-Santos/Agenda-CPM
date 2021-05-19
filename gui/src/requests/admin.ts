import { RequestResult } from '../../../common/interfaces'
import axios from 'axios'

const location = window.location.href;
const baseName = location.split('/')[0];

const api = axios.create({baseURL: location.includes('http://localhost:4200/') ? 'http://localhost:3333/api/admin' : `${baseName}/api/admin`})

export async function sendInvite(email:string):Promise<RequestResult>{
    const token = localStorage.getItem("AgendaCPMToken");
    const response = await api.post('/invite',{email}, {
        headers: {
            'Authorization': `Basic ${token}`
        }
    });
    return response.data;
}