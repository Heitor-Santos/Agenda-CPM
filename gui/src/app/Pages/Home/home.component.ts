import { ChangeDetectorRef, Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { getAvaliacoes } from '../../../requests/avaliacao'
import { getTurmas } from '../../../requests/turma'
import { Avaliacao, Turma } from '../../../../../common/interfaces'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class HomeComponent {
  columnsToDisplay: string[] = ["data", "disciplina","professor"]
  turmas:Turma[]
  avaliacoes: Avaliacao[]
  expandedElement: Avaliacao | null;
  selected:string
  isLoading: boolean;
  constructor(private changeDetectorRefs: ChangeDetectorRef, private router: Router){}
  async ngOnInit() {
    this.turmas = await (await getTurmas()).data
    this.selected = this.turmas[0]?.nome || '' 
    this.avaliacoes = await getAvaliacoes(this.selected)
    this.isLoading = false;
  }
  async changeTurma(){
    console.log("oi")
    this.isLoading = true
    console.log("oi")
    await this.sleep(2000)
    this.isLoading = false;
    console.log('ola')
    this.avaliacoes = await getAvaliacoes(this.selected)
    console.log(this.avaliacoes)
    this.changeDetectorRefs.detectChanges()
  }
  async sleep(timeout: number){
    return new Promise<void>((res,rej)=>{
      setTimeout(()=>res(),timeout)
    })
  }
}