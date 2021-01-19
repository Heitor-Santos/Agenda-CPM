import {Component, Inject } from '@angular/core';
import { addTurma, getTurmas, remTurma } from '../../../requests/turma'
import { ProfessorPublic, Turma } from '../../../../../common/interfaces'
import { getProfessores, getProfCode, remProf, updateProfCode } from 'src/requests/professor';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  code: string
  professores: ProfessorPublic[]
  turmas: Turma[]
  isLoading: boolean
  isLoadingCode: boolean
  isLoadingTurma: boolean
  isLoadingCriar: boolean
  constructor(public dialog: MatDialog, public snackBar: MatSnackBar) { }
  ngOnInit() {
    this.isLoading = false
    this.isLoadingCode = false
    this.isLoadingTurma = false
    this.isLoadingCriar = false
    this.turmas = getTurmas()
    this.professores = getProfessores()
    this.code = getProfCode("corinabrock@urbanshee")
  }
  formalName(nome: string): string {
    const nomes = nome.split(' ')
    return `${nomes[0]} ${nomes[nomes.length - 1]}`
  }
  async createTurma(){
    const nomeTurma = (<HTMLInputElement>(document.getElementById('inputTurma'))).value
    if(nomeTurma==""){
      this.snackBar.open("A turma não pode ter nome em branco",undefined,{
        panelClass:['snack-warning'],
        duration: 2000
      })
      return
    }
    this.isLoadingCriar = true
    await this.sleep(3000)
    if(!addTurma(nomeTurma)){     
      this.snackBar.open("Já existe uma turma com esse nome",undefined,{
        panelClass:['snack-error'],
        duration: 2000
      })
    }
    else{
      this.snackBar.open("Turma criada",undefined,{
        panelClass:['snack-success'],
        duration: 2000
      })
    }
    this.isLoadingCriar = false;
    (<HTMLInputElement>(document.getElementById('inputTurma'))).value = ''
  }
  async deleteProf(index: number): Promise<void> {
    this.isLoading = true
    remProf(this.professores[index].email)
    await this.sleep(3000)
    this.professores.splice(index, 1)
    this.isLoading = false
    this.snackBar.open("Professor excluído",undefined,{
      panelClass:['snack-success'],
      duration: 2000
    })
  }
  openDialogDeleteProf(index: number): void {
    const dialogRef = this.dialog.open(DialogDeleteProf, {
      width: '250px',
      data: { profToDelete: this.professores[index] }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.deleteProf(index)
      }
    });
  }
  async deleteTurma(index: number): Promise<void> {
    this.isLoadingTurma = true
    remTurma(this.turmas[index].nome)
    await this.sleep(3000)
    this.turmas.splice(index, 1)
    this.isLoadingTurma = false
    this.snackBar.open("Turma excluída",undefined,{
      panelClass:['snack-success'],
      duration: 2000
    })
  }
  openDialogDeleteTurma(index: number): void {
    const dialogRef = this.dialog.open(DialogDeleteTurma, {
      width: '250px',
      data: { turmaToDelete: this.turmas[index] }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.deleteTurma(index)
      }
    });
  }
  async updateCode(): Promise<void> {
    this.isLoadingCode = true
    await this.sleep(3000)
    this.code = updateProfCode("corinabrock@urbanshee")
    this.isLoadingCode = false
  }
  async sleep(timeout: number) {
    return new Promise<void>((res, rej) => {
      setTimeout(() => res(), timeout)
    })
  }
}
@Component({
  selector: 'delete-prof.dialog',
  templateUrl: 'delete-prof.dialog.html',
})
export class DialogDeleteProf {

  constructor(
    public dialogRef: MatDialogRef<DialogDeleteProf>,
    @Inject(MAT_DIALOG_DATA) public data: { profToDelete: ProfessorPublic }) { }

  cancel(): void {
    this.dialogRef.close();
  }
}
@Component({
  selector: 'delete-turma.dialog',
  templateUrl: 'delete-turma.dialog.html',
})
export class DialogDeleteTurma {

  constructor(
    public dialogRef: MatDialogRef<DialogDeleteTurma>,
    @Inject(MAT_DIALOG_DATA) public data: { turmaToDelete: Turma }) { }

  cancel(): void {
    this.dialogRef.close();
  }
}