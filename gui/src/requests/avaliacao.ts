import { Avaliacao, RequestResult } from '../../../common/interfaces'
import axios from 'axios'

const location = window.location.href;
const baseName = location.split('/')[0];

const api = axios.create({ baseURL: location.includes('http://localhost:4200/') ? 'http://localhost:3333/api/aval' : `${baseName}/api/aval` })

export async function getAvaliacoes(turma: string): Promise<Avaliacao[]> {
  const data = (await api.get('/avaliacoes?turma=' + turma)).data
  return JSON.parse(data.data)
}

export async function getAvaliacoesByProfessor(email: string): Promise<RequestResult> {
  try {
    const token = localStorage.getItem("AgendaCPMToken");
    const response = await api.get('/avaliacoes-professor?email=' + email, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    });
    return response.data;
  }
  catch (err) {
    return err.response.data
  }
}
export async function rmvAvaliacao(id: string): Promise<RequestResult> {
  try {
    const token = localStorage.getItem("AgendaCPMToken");
    const response = await api.delete("/?id="+id, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    });
    return response.data;
  }
  catch (err) {
    return err.response.data
  }
}
export async function newAvaliacao(aval): Promise<RequestResult> {
  try {
    const token = localStorage.getItem("AgendaCPMToken");
    const response = await api.post("/", aval, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    });
    return response.data;
  }
  catch (err) {
    return err.response.data
  }
}