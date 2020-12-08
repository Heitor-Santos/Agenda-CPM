import { ChangeDetectorRef, Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { getAvaliacoes } from '../requests/avaliacao'
import { getTurmas } from '../requests/turma'
import { Avaliacao, Turma } from '../../../common/interfaces'
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AppComponent {
  columnsToDisplay: string[] = ["data", "disciplina","professor"]
  turmas:Turma[]
  avaliacoes: Avaliacao[]
  expandedElement: Avaliacao | null;
  selected:string="5º A"
  constructor(private changeDetectorRefs: ChangeDetectorRef){}
  ngOnInit() {
    this.turmas = getTurmas()
    this.avaliacoes = getAvaliacoes(this.selected)
  }
  changeTurma(){
    console.log("oi")
    this.avaliacoes = getAvaliacoes(this.selected)
    console.log(this.avaliacoes)
    this.changeDetectorRefs.detectChanges()
  }
}