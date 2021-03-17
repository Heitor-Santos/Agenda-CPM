import { Professor, ProfessorPublic, RequestResult } from '../../../common/interfaces'
import axios from 'axios'
const professores: Professor[] = [
    {
        "nome": "Spears Henson",
        "email": "spearshenson@velos",
        "senha": "97116854-7c05-4d1d-9de9-66fe4b9875a9"
    },
    {
        "nome": "Bullock Fields",
        "email": "bullockfields@extragen",
        "senha": "85228f27-a14c-4252-b21a-8399e5fd6b14"
    },
    {
        "nome": "Frances Harris",
        "email": "francesharris@emoltra",
        "senha": "c853a1da-ed52-4306-996a-313491bad175"
    },
    {
        "nome": "Maritza Solis",
        "email": "maritzasolis@limozen",
        "senha": "2d322494-1160-4f20-aeac-ffb6cbbf7beb"
    },
    {
        "nome": "Mendoza Hudson",
        "email": "mendozahudson@peticular",
        "senha": "7b1a9e4f-1156-4ba4-b08b-82a1c1a91307"
    },
    {
        "nome": "Melton Stein",
        "email": "meltonstein@softmicro",
        "senha": "927e4099-9964-480f-ae53-4e795ce68e5e"
    },
    {
        "nome": "Corinne Levine",
        "email": "corinnelevine@comverges",
        "senha": "2041e41d-7d11-43f4-b71c-10a70fdec6d0"
    },
    {
        "nome": "Atkinson Wynn",
        "email": "atkinsonwynn@proflex",
        "senha": "b5b6a067-5252-43c3-9233-09d636dfc034"
    },
    {
        "nome": "Iris Flores Santos",
        "email": "irisflores@zerbina",
        "senha": "465655d4-0a0e-4660-b0e3-d944be396949"
    },
    {
        "nome": "Corina Brock",
        "email": "corinabrock@urbanshee",
        "senha": "ee509861-f8ed-4fd5-822d-28006503e13a",
        "code": 'ih56s7'
    }
]

const api = axios.create({baseURL:'http://localhost:3333/prof'})
export async function getProfessores(): Promise<RequestResult> {
    const response = await api.get('/professores')
    return response.data
}

export function getProfCode(profEmail:string):string{
    return professores.find(prof=>prof.email==profEmail).code
}

export async function sendInvite(email:string):Promise<RequestResult>{
    console.log("AQUI")
    const response = await api.post('/invite',{email});
    return response.data;
}

export async function remProf(profEmail: string):Promise<RequestResult>{
    const response = await api.delete(`?email=${profEmail}`)
    return response.data
}

export function updateProfCode(profEmail: string):string{
    let chs = []
    let id = ''
    for (let i = 97; i < 123; i++) {
      chs.push(String.fromCharCode(i))
    }
    for(let i=0;i<10;i++){
      chs.push(i)
    }
    for (let i = 0; i < 5; i++) {
      id = id.concat(chs[Math.floor(Math.random() * 36)])
    }
    let indexToUpdate = professores.findIndex(prof=>prof.email==profEmail)
    return professores[indexToUpdate].code = id
}