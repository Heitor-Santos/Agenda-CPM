import { Component, Inject } from '@angular/core';
import { getTurmas } from '../../../requests/turma'
import { Avaliacao, RequestResult, Turma } from '../../../../../common/interfaces'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getAvaliacoesByProfessor, newAvaliacao, rmvAvaliacao } from 'src/requests/avaliacao';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { sendInvite } from 'src/requests/professor';


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
  constructor(public dialog: MatDialog, public snackBar: MatSnackBar, public formBuilder: FormBuilder) { }
  ngOnInit() {
    this.isLoading = false
    this.isLoadingCriar = false
    this.selected = ''
    this.isLoadingInvite = false;
    this.errMsg = 'Esse campo é obrigatório'
    this.registerForm = this.formBuilder.group({
      turma: [, { validators: [Validators.required], updateOn: "change" }],
      disciplina: [, { validators: [Validators.required], updateOn: "change", }],
      titulo: [, { validators: [Validators.required], updateOn: "change" }],
      data: [, { validators: [Validators.required], updateOn: "change" }],
      desc: [, { validators: [Validators.required], updateOn: "change" }],
    });
    //this.turmas = getTurmas()
    this.avaliacoes = getAvaliacoesByProfessor('francesharris@emoltra')
  }
  async createAvaliacao() {
    const desc = (<HTMLInputElement>document.getElementById('inputDesc')).value
    const data = (<HTMLInputElement>document.getElementById('inputData')).value
    const disciplina = (<HTMLInputElement>document.getElementById('inputDisciplina')).value
    const titulo = (<HTMLInputElement>document.getElementById('inputTitulo')).value
    this.isLoadingCriar = true
    await this.sleep(2000)
    const newAval = {
      "professor": "Frances Harris",
      "professorEmail": "francesharris@emoltra",
      "descricao": desc,
      "turma": this.selected,
      "data": data,
      "disciplina": disciplina,
      "titulo": titulo,
      "id": '17'
    }
    //const result: RequestResult = await newAvaliacao(newAval);
    this.selected = ''
    this.isLoadingCriar = false;
    // if (result.data) {
    //   //this.avaliacoes.push(newAval)
    //   this.openSnack("Avaliação criada com sucesso", "snack-success")
    // }
    // else this.openSnack(result.error, "snack-error");
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
  async sendProfInvite(){
    this.isLoadingInvite = true;
    const profEmail = (<HTMLInputElement>document.getElementById('inputProfessor')).value
    const response = await sendInvite(profEmail);
    await this.handleSnack("Convite enviado com sucesso", response);
    this.isLoadingInvite = false;
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