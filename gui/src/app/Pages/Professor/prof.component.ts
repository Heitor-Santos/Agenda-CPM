import { Component, Inject } from '@angular/core';
import { getTurmas } from '../../../requests/turma'
import { Avaliacao, RequestResult, Turma } from '../../../../../common/interfaces'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getAvaliacoesByProfessor, newAvaliacao, rmvAvaliacao } from 'src/requests/avaliacao';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-prof',
  templateUrl: './prof.component.html',
  styleUrls: ['./prof.component.scss'],
})
export class ProfessorComponent {
  avaliacoes: Avaliacao[]
  isLoading: boolean
  isLoadingCriar: boolean
  selected: string
  turmas: Turma[]
  registerForm: FormGroup
  errMsg: string
  isLoadingInvite: boolean;
  profEmail: string;
  profName: string;
  allowed: boolean = false;
  constructor(public dialog: MatDialog, public snackBar: MatSnackBar, public formBuilder: FormBuilder, private router: Router) { }
  async ngOnInit() {
    this.isLoading = false
    this.isLoadingCriar = false
    this.selected = ''
    this.isLoadingInvite = false;
    this.errMsg = 'Esse campo é obrigatório';
    const prof = JSON.parse(localStorage.getItem("AgendaCPMuser")); 
    this.profEmail = prof["email"];
    this.profName = prof["nome"];
    this.registerForm = this.formBuilder.group({
      turma: [, { validators: [Validators.required], updateOn: "change" }],
      disciplina: [, { validators: [Validators.required], updateOn: "change", }],
      titulo: [, { validators: [Validators.required], updateOn: "change" }],
      data: [, { validators: [Validators.required], updateOn: "change" }],
      desc: [, { validators: [Validators.required], updateOn: "change" }],
    });
    this.turmas = (await getTurmas()).data;
    const response = await getAvaliacoesByProfessor(this.profEmail)
    if(response.error && response.error=="JWT token is missing" || response.error=="Invalid JWT token"){
      this.router.navigateByUrl("/")
    }
    this.allowed = true;
    this.avaliacoes = response.data
    this.avaliacoes.map(aval=>aval.data = new Date(aval.data));
  }
  async createAvaliacao() {
    const desc = (<HTMLInputElement>document.getElementById('inputDesc')).value
    const data = (<HTMLInputElement>document.getElementById('inputData')).value
    const disciplina = (<HTMLInputElement>document.getElementById('inputDisciplina')).value
    const titulo = (<HTMLInputElement>document.getElementById('inputTitulo')).value
    this.isLoadingCriar = true
    const newAval = {
      "professor": this.profName,
      "professorEmail": this.profEmail,
      "descricao": desc,
      "turma": this.selected,
      "data": data,
      "disciplina": disciplina,
      "titulo": titulo,
    }
    const result: RequestResult = await newAvaliacao(newAval);
    const resAval = result.data;
    this.selected = ''
    if (resAval) {
      resAval.data = new Date(resAval.data);
      this.avaliacoes.push(resAval)
      this.openSnack("Avaliação criada com sucesso", "snack-success")
    }
    else this.openSnack(result.error, "snack-error");
    this.isLoadingCriar = false;
  }
  async openSnack(msg: string, className: string) {
    this.snackBar.open(msg, undefined, {
      panelClass: [className],
      duration: 2000,
    })
  }
  async handleSnack(successMsg: string, apiRes: RequestResult){
    const snacks = {"data":successMsg,"error":apiRes.error}
    const classes = {"data":"snack-success","error":"snack-error"}
    const resultKey = Object.keys(apiRes)[0];
    await this.openSnack(snacks[resultKey],classes[resultKey])
  }

  async sleep(timeout: number) {
    return new Promise<void>((res, rej) => {
      setTimeout(() => res(), timeout)
    })
  }
  openDialogAval(index: number) {
    const aval = this.avaliacoes[index]
    const dialogRef = this.dialog.open(DialogInfoAval, {
      width: '250px',
      data: { aval: aval }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.removeAvaliacao(this.avaliacoes[index].id)
        return
      }
    });
  }
  async removeAvaliacao(id: string) {
    this.isLoading = true
    await this.sleep(2000)
    rmvAvaliacao(id)
    this.avaliacoes = this.avaliacoes.filter(aval=>aval.id!=id);
    this.isLoading = false
    this.openSnack('Avaliação removida com sucesso', 'snack-success')
  }
}
@Component({
  selector: 'delete-aval.dialog',
  templateUrl: 'delete-aval.dialog.html',
})
export class DialogInfoAval {

  constructor(
    public dialogRef: MatDialogRef<DialogInfoAval>,
    @Inject(MAT_DIALOG_DATA) public data: { aval: Avaliacao }) { }

  cancel(): void {
    this.dialogRef.close();
  }
}