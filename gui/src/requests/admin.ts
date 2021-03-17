import { Professor, ProfessorPublic, RequestResult } from '../../../common/interfaces'
import axios from 'axios'


const api = axios.create({baseURL:'http://localhost:3333/admin'})

export async function sendInvite(email:string):Promise<RequestResult>{
    const response = await api.post('/invite',{email});
    return response.data;
}