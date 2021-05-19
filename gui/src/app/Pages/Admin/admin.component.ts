import { Component, Inject } from '@angular/core';
import { addTurma, getTurmas, remTurma } from '../../../requests/turma'
import { ProfessorPublic, RequestResult, Turma } from '../../../../../common/interfaces'
import { getProfessores, remProf } from 'src/requests/professor';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { sendInvite } from 'src/requests/admin';
import { Router } from '@angular/router';

class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

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
  isLoadingInvite: boolean
  isLoadingTurma: boolean
  isLoadingCriar: boolean
  allowed: boolean = false;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new MyErrorStateMatcher()
  constructor(private router: Router,public dialog: MatDialog, public snackBar: MatSnackBar) { }

  async ngOnInit() {
    this.isLoading = false
    this.isLoadingInvite = false
    this.isLoadingTurma = false
    this.isLoadingCriar = false
    this.turmas = (await getTurmas()).data
    const profs = await getProfessores();
    if(profs.error) this.router.navigateByUrl("/")
    this.professores = (await getProfessores()).data
    this.allowed = true;
  }

  formalName(nome: string): string {
    const nomes = nome.split(' ')
    return nomes.length == 1 ? nomes[0] : `${nomes[0]} ${nomes[nomes.length - 1]}`
  }

  async createTurma() {
    const nomeTurma = (<HTMLInputElement>(document.getElementById('inputTurma'))).value
    if (nomeTurma == "") {
      return await this.openSnack("A turma não pode ter nome em branco", 'snack-warning')
    }
    this.isLoadingCriar = true
    const response = await addTurma(nomeTurma);
    await this.handleSnack("Turma criada com sucesso", response);
    this.isLoadingCriar = false;
    if (response.data) this.turmas.push(response.data)
  }

  async deleteTurma(index: number): Promise<void> {
    this.isLoadingTurma = true
    const response = await remTurma(this.turmas[index].nome)
    await this.handleSnack("Turma excluída", response);
    this.isLoadingTurma = false;
    if (response.data) this.turmas.splice(index, 1)
  }

  async sendProfInvite() {
    this.isLoadingInvite = true;
    const profEmail = (<HTMLInputElement>document.getElementById('inputProfessor')).value
    const response = await sendInvite(profEmail);
    await this.handleSnack("Convite enviado com sucesso", response);
    this.isLoadingInvite = false;
  }

  async deleteProf(index: number): Promise<void> {
    this.isLoading = true
    const response = await remProf(this.professores[index].email)
    await this.handleSnack("Professor excluído", response);
    this.isLoading = false
    if(response.data) this.professores.splice(index, 1)
  }
  
  async handleSnack(successMsg: string, apiRes: RequestResult) {
    const snacks = { "data": successMsg, "error": apiRes.error }
    const classes = { "data": "snack-success", "error": "snack-error" }
    const resultKey = Object.keys(apiRes)[0];
    await this.openSnack(snacks[resultKey], classes[resultKey])
  }

  async openSnack(msg: string, className: string) {
    this.snackBar.open(msg, undefined, {
      panelClass: [className],
      duration: 2000,
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