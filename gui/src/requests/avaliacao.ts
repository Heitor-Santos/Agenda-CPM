import { Avaliacao, RequestResult } from '../../../common/interfaces'

let avaliacoes: Avaliacao[] = [
  {
    "professor": "Spears Henson",
    "professorEmail": "spearshenson@velos",
    "descricao": "Velit minim ad cillum aliqua dolor adipisicing id consequat anim aliquip. Consequat veniam ad incididunt velit fugiat in magna. Ullamco labore quis excepteur anim dolor esse excepteur magna. Do esse tempor adipisicing pariatur deserunt adipisicing ullamco magna.",
    "turma": "5º A",
    "data": "12/02/2021",
    "disciplina": "anim",
    "titulo": "laboris excepteur ex",
    'id':'1'
  },
  {
    "professor": "Bullock Fields",
    "professorEmail": "bullockfields@extragen",
    "descricao": "Aliquip incididunt fugiat voluptate sint pariatur ea ex. Nisi proident laboris in consectetur elit. Esse Lorem veniam consequat veniam amet officia et qui qui est fugiat et.",
    "turma": "7º A",
    "data": "12/02/2021",
    "disciplina": "labore",
    "titulo": "consequat in veniam",
    'id':'2'
  },
  {
    "professor": "Frances Harris",
    "professorEmail": "francesharris@emoltra",
    "descricao": "Sint aliquip cillum consectetur magna velit Lorem non irure esse. Id minim occaecat adipisicing dolore dolor pariatur ut incididunt ad labore. Cupidatat id et veniam mollit nulla deserunt nostrud nulla ipsum aliqua aliqua officia.",
    "turma": "7º A",
    "data": "12/02/2021",
    "disciplina": "consectetur",
    "titulo": "deserunt enim reprehenderit",
    'id':'3'
  },
  {
    "professor": "Frances Harris",
    "professorEmail": "francesharris@emoltra",
    "descricao": "Dolor id enim ex elit est occaecat ut ex ex. Cupidatat proident sit laborum ipsum velit consectetur eu. Consequat laboris Lorem ullamco ea voluptate in ut eu culpa nisi non ad. Exercitation in officia consequat cupidatat amet nulla. Aliquip consectetur consequat quis fugiat elit excepteur enim amet in deserunt amet est minim fugiat.",
    "turma": "6º A",
    "data": "12/02/2021",
    "disciplina": "sit",
    "titulo": "anim non ullamco",
    'id':'4'
  },
  {
    "professor": "Frances Harris",
    "professorEmail": "francesharris@emoltra",
    "descricao": "Sit eiusmod sunt amet eu eiusmod. In amet amet proident dolore voluptate pariatur aliqua velit voluptate amet in incididunt anim. Duis duis sunt esse eiusmod voluptate duis sit id.",
    "turma": "8º A",
    "data": "12/02/2021",
    "disciplina": "sunt",
    "titulo": "culpa adipisicing culpa",
    'id':'5'
  },
  {
    "professor": "Frances Harris",
    "professorEmail": "francesharris@emoltra",
    "descricao": "Duis veniam commodo ipsum minim excepteur exercitation eiusmod adipisicing dolor. Aliqua aliqua cupidatat deserunt aute ipsum voluptate culpa nostrud commodo veniam. Officia quis consectetur qui minim est anim esse id.",
    "turma": "6º A",
    "data": "12/02/2021",
    "disciplina": "voluptate",
    "titulo": "proident ut reprehenderit",
    'id':'6'
  },
  {
    "professor": "Frances Harris",
    "professorEmail": "francesharris@emoltra",
    "descricao": "Ullamco sit elit voluptate ut eu quis est ipsum qui labore. Ipsum cillum sit mollit nisi ullamco eiusmod labore laboris qui. Id do aute in duis sit laborum qui. Sint labore ea tempor aliqua nostrud pariatur fugiat aliquip elit ipsum. Commodo proident ipsum occaecat duis. Ullamco esse do sunt est.",
    "turma": "6º A",
    "data": "12/02/2021",
    "disciplina": "sint",
    "titulo": "incididunt id esse",
    'id':'7'
  },
  {
    "professor": "Frances Harris",
    "professorEmail": "francesharris@emoltra",
    "descricao": "Elit duis sint aute cupidatat magna minim ad nulla consectetur id sint anim irure. Ea magna fugiat mollit tempor in fugiat Lorem esse. Aute nostrud qui officia velit.",
    "turma": "7º A",
    "data": "12/02/2021",
    "disciplina": "voluptate",
    "titulo": "proident do occaecat",
    'id':'8'
  },
  {
    "professor": "Frances Harris",
    "professorEmail": "francesharris@emoltra",
    "descricao": "Enim incididunt irure occaecat labore mollit amet non ullamco proident. Minim exercitation et minim voluptate sunt deserunt laboris voluptate. Dolor cupidatat id ea pariatur tempor id sint. Fugiat eiusmod deserunt ex cupidatat. Eu labore dolor sunt enim sint dolore culpa aliquip irure proident enim.",
    "turma": "7º A",
    "data": "12/02/2021",
    "disciplina": "ullamco",
    "titulo": "cillum magna cillum",
    'id':'9'
  },
  {
    "professor": "Frances Harris",
    "professorEmail": "francesharris@emoltra",
    "descricao": "Culpa magna eu in pariatur duis tempor mollit deserunt ea aliquip enim ex. Sint laboris officia magna quis exercitation aliqua aute aliqua veniam dolore officia. Mollit eiusmod aute qui id irure commodo. Consectetur ipsum do voluptate consequat elit ullamco ullamco laboris laborum. Voluptate sint laboris voluptate anim.",
    "turma": "5º A",
    "data": "12/02/2021",
    "disciplina": "est",
    "titulo": "qui tempor reprehenderit",
    'id':'10'
  },
  {
    "professor": "Frances Harris",
    "professorEmail": "francesharris@emoltra",
    "descricao": "Id ipsum in excepteur sint id in. Aliqua adipisicing proident eu cupidatat fugiat irure anim ullamco ut exercitation nisi. Exercitation labore fugiat ea non ea minim velit exercitation.",
    "turma": "8º A",
    "data": "12/02/2021",
    "disciplina": "nisi",
    "titulo": "pariatur adipisicing ipsum",
    'id':'11'
  },
  {
    "professor": "Frances Harris",
    "professorEmail": "francesharris@emoltra",
    "descricao": "Laborum pariatur non eiusmod et labore ea ipsum nisi laboris aliqua sit est. Aliquip officia excepteur minim consectetur deserunt. Officia dolore commodo do consectetur anim. Cillum voluptate pariatur ex ipsum occaecat anim minim in sit incididunt.",
    "turma": "5º A",
    "data": "12/02/2021",
    "disciplina": "quis",
    "titulo": "ea cillum culpa",
    'id':'12'
  },
  {
    "professor": "Frances Harris",
    "professorEmail": "francesharris@emoltra",
    "descricao": "Est irure deserunt consequat sit exercitation veniam aute ex sunt deserunt aliquip. Ut eiusmod sint amet adipisicing. Pariatur do nulla aute est consequat. Nulla pariatur in sit duis adipisicing exercitation enim aute excepteur ad et deserunt. Non dolore elit quis Lorem cillum. Mollit cupidatat dolor est aliqua velit voluptate aliquip. Magna esse id id aute.",
    "turma": "5º A",
    "data": "12/02/2021",
    "disciplina": "aliqua",
    "titulo": "ex ex reprehenderit",
    'id':'13'
  },
  {
    "professor": "Frances Harris",
    "professorEmail": "francesharris@emoltra",
    "descricao": "Incididunt sit tempor ipsum quis eu labore. Mollit aliquip nisi amet non culpa officia excepteur consequat adipisicing. Officia anim quis magna eiusmod pariatur elit amet consectetur veniam ad qui proident duis aliqua.",
    "turma": "6º A",
    "data": "12/02/2021",
    "disciplina": "sint",
    "titulo": "ut cillum proident",
    'id':'14'
  },
  
]

export function getAvaliacoes(turma: string): Avaliacao[] {
  return avaliacoes.filter(aval => aval.turma == turma)
}

export function getAvaliacoesByProfessor(email: string): Avaliacao[] {
  return avaliacoes.filter(aval => aval.professorEmail == email)
}
export function rmvAvaliacao(id: string):RequestResult{
  avaliacoes = avaliacoes.filter(aval=>aval.id!=id);
  return {data:'sucesso'}
}
export function newAvaliacao(aval: Avaliacao): RequestResult {
  let split = aval.data.split('/');
  let formartData = [split[1],split[0],split[2]].join('/')
  if(differenceOfDays(new Date(formartData), new Date())<15){
    return {'error': "Você só pode criar avaliações para daqui a 15 dias"}
  }
  if (turmaTemDuasAvaliacoes(aval.turma, aval.data)) {
    return { 'error': "Essa turma já tem duas avaliações" }
  }
  if (avaliacoes.find(avaliacao => isTheSameAvaliacao(avaliacao, aval))){
    return {'error': "Você já criou essa avaliação"}
  }
  avaliacoes.push(aval)
  return {'data':JSON.stringify(aval)}
}
function turmaTemDuasAvaliacoes(turma: string, date: string): boolean {
  const avals = avaliacoes.filter(aval => aval.turma == turma && aval.data == date)
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