import {Turma} from '../../../common/interfaces'

const turmas: Turma[] = [{nome:"5º A"},{nome:"6º A"},{nome:"7º A"},{nome:"8º A"}]

export function getTurmas():Turma[]{
    return turmas;
}

export function addTurma(nome:string):Turma{
    if(jaExisteTurma(nome)) return null;
    turmas.push({nome})
    return turmas[turmas.length-1];
}

export function remTurma(nome:string):Turma{
    if(naoExisteTurma) return null
    let turmaIndex = turmas.findIndex(turma=>turma.nome==nome)  
    let turma = turmas[turmaIndex]
    turmas.splice(turmaIndex,1)
    return turma;
}

function jaExisteTurma(nome:string):Turma{
    return turmas.find(turma=>turma.nome==nome)
}

function naoExisteTurma(nome:string):boolean{
    if (turmas.findIndex(turma=>turma.nome==nome)==-1) return true
    return false;
}