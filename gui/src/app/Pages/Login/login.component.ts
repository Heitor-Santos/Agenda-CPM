import { ChangeDetectorRef, Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { getAvaliacoes } from '../../../requests/avaliacao'
import { getTurmas } from '../../../requests/turma'
import { Avaliacao, Turma } from '../../../../../common/interfaces'
import { Router } from '@angular/router';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class LoginComponent {
  columnsToDisplay: string[] = ["data", "disciplina","professor"]
  turmas:Turma[]
  avaliacoes: Avaliacao[]
  expandedElement: Avaliacao | null;
  selected:string="5º A"
  isLoading: boolean;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('',[
    Validators.required
  ])
  matcher = new MyErrorStateMatcher()
  constructor(private changeDetectorRefs: ChangeDetectorRef, private router: Router){}
  ngOnInit() {
    this.turmas = getTurmas()
    this.avaliacoes = getAvaliacoes(this.selected)
    this.isLoading = false;
  }
  async changeTurma(){
    console.log("oi")
    this.isLoading = true
    console.log("oi")
    await this.sleep(2000)
    this.isLoading = false;
    console.log('ola')
    this.avaliacoes = getAvaliacoes(this.selected)
    console.log(this.avaliacoes)
    this.changeDetectorRefs.detectChanges()
  }
  async sleep(timeout: number){
    return new Promise<void>((res,rej)=>{
      setTimeout(()=>res(),timeout)
    })
  }
}