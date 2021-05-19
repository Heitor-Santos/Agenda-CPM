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
  avaliacoesRaw: Avaliacao[]
  expandedElement: Avaliacao | null
  selected:string
  isLoading: boolean
  avaliacoes: any[]
  constructor(private changeDetectorRefs: ChangeDetectorRef, private router: Router){}
  async ngOnInit() {
    this.turmas = await (await getTurmas()).data
    this.selected = this.turmas[0]?.nome || '' 
    this.avaliacoesRaw = await getAvaliacoes(this.selected);
    this.avaliacoes = this.avaliacoesRaw as any;
    this.avaliacoes.map(aval=>{
      aval.data = new Date(aval.data).toLocaleDateString()
    })
    this.isLoading = false;
  }
  async changeTurma(){
    this.isLoading = true
    await this.sleep(2000)
    this.isLoading = false;
    this.avaliacoesRaw = await getAvaliacoes(this.selected);
    this.avaliacoes = this.avaliacoesRaw as any;
    this.avaliacoes.map(aval=>{
      aval.data = new Date(aval.data).toLocaleDateString()
    })
    this.changeDetectorRefs.detectChanges()
  }
  async sleep(timeout: number){
    return new Promise<void>((res,rej)=>{
      setTimeout(()=>res(),timeout)
    })
  }
}