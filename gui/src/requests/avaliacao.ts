import { Avaliacao, RequestResult } from '../../../common/interfaces'
import axios from 'axios'

let avaliacoes: Avaliacao[] = []

export async function getAvaliacoes(turma: string): Promise<Avaliacao[]> {
  const data = (await axios.get('http://localhost:3333/aval/avaliacoes?turma='+turma)).data
  console.log(data)
  return JSON.parse(data.data)
}

export function getAvaliacoesByProfessor(email: string): Avaliacao[] {
  return avaliacoes.filter(aval => aval.professorEmail == email)
}
export function rmvAvaliacao(id: string):RequestResult{
  avaliacoes = avaliacoes.filter(aval=>aval.id!=id);
  return {data:'sucesso'}
}
export function newAvaliacao(aval: Avaliacao): RequestResult {
  let split = aval.data.toLocaleDateString().split('/');
  let formartData = [split[1],split[0],split[2]].join('/')
  if(differenceOfDays(new Date(formartData), new Date())<15){
    return {'error': "Você só pode criar avaliações para daqui a 15 dias"}
  }
  if (turmaTemDuasAvaliacoes(aval.turma, aval.data.toLocaleDateString())) {
    return { 'error': "Essa turma já tem duas avaliações" }
  }
  if (avaliacoes.find(avaliacao => isTheSameAvaliacao(avaliacao, aval))){
    return {'error': "Você já criou essa avaliação"}
  }
  avaliacoes.push(aval)
  return {'data':JSON.stringify(aval)}
}
function turmaTemDuasAvaliacoes(turma: string, date: string): boolean {
  const avals = avaliacoes.filter(aval => aval.turma == turma && aval.data.toLocaleDateString() == date)
  return (avals.length == 2)
}

function isTheSameAvaliacao(avaliacao, aval): boolean{
  return (avaliacao.data == aval.data &&
  avaliacao.descricao == aval.descricao &&
  avaliacao.disciplina == aval.disciplina &&
  avaliacao.professor == aval.professor &&
  avaliacao.professorEmail == aval.professorEmail &&
  avaliacao.titulo == aval.titulo &&
  avaliacao.turma == aval.turma)
}
function differenceOfDays(futuro: Date, passado: Date): number{
  return (futuro.getTime()-passado.getTime())/(1000 * 3600 * 24)
}