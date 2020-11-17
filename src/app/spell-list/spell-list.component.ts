import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Console, debug } from 'console';
import { element } from 'protractor';
import { SpellService } from '../spell.service';


@Component({
  selector: 'app-spell-list',
  templateUrl: './spell-list.component.html',
  styleUrls: ['./spell-list.component.css']
})
export class SpellListComponent implements OnInit {
  spellList = []
  spellListFilter = []
  displayedColumns: string[] = ["Name","Coste","IntR","Mantenimiento","Efecto"]
  ViaList: string[] = ["Luz","Oscuridad","Fuego","Agua","Aire","Tierra","Ilusión","Creación","Esencia","Destrucción","Nigromancia","Libre Acceso"
                      ,"Caos","Guerra","Literae","Muerte","Música","Nobleza","Paz","Pecado","Conocimiento","Sangre","Sueños","Tiempo","Umbral","Vacío"]
  index = 0
  //Paginator
  pageIndex:number = 0;
  pageSize:number = 20;
  lowValue:number = 0;
  highValue:number = 20;

  @ViewChild('paginator') paginator: MatPaginator;
  pageEvent: PageEvent;
//------------------------------------
  constructor(private spellService: SpellService) { }

//-----------------------------------------
  ngOnInit(): void {

    this.spellService.getSpells().subscribe(data => {
      this.spellList = data;
      this.spellListFilter = this.spellList.slice(0,30);
      }
      );
    
  }
  IncreaseIndex(){
    this.index += 1;
    if(this.index * 30 > this.spellList.length ) this.index = 0;
    this.spellListFilter = this.spellList.slice(30 * this.index , Math.min(30*(this.index + 1),this.spellList.length));
  }
  FilterSpellListByVia(via: string){
    console.log('filtrando por via: '+via);

    this.pageIndex = 0;
    this.pageSize = 20;
    this.lowValue = 0;
    this.highValue = 20;
    this.paginator.firstPage();
    this.spellListFilter = this.spellList.filter((element) => {
      return element.Via == via;
    });
  }

  getPaginatorData(event):PageEvent{
    console.log(event);
    if(event.pageIndex === this.pageIndex + 1){
       this.lowValue = this.lowValue + this.pageSize;
       this.highValue =  this.highValue + this.pageSize;
      }
   else if(event.pageIndex === this.pageIndex - 1){
      this.lowValue = this.lowValue - this.pageSize;
      this.highValue =  this.highValue - this.pageSize;
     }   
      this.pageIndex = event.pageIndex;
      return;
}

}
