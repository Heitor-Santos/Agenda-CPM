export interface Turma{
    nome: string
}
export interface RequestResult{
    data?: any,
    error?: string
}
export interface Avaliacao{
    id: string
    professor: string,
    professorEmail:string,
    descricao: string,
    turma: string,
    data: Date,
    disciplina: string,
    titulo: string
}

export interface Professor{
    nome: string,
    email: string,
    senha: string,
    code?: string
}
export interface ProfessorPublic{
    nome: string,
    email: string,
}