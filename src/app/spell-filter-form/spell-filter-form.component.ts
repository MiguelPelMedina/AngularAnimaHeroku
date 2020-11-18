import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ISpell } from 'src/Interfaces/Spell';
import { SpellListComponent } from '../spell-list/spell-list.component';
import { SpellService } from '../spell.service';

@Component({
  selector: 'app-spell-filter-form',
  templateUrl: './spell-filter-form.component.html',
  styleUrls: ['./spell-filter-form.component.css']
})
export class SpellFilterFormComponent implements OnInit {
  //componentes Angular
  @ViewChild('spellListComponent') spellListComponent: SpellListComponent
  //Lista de elementos
  spellList:ISpell[]  = [];
  filteredSpellList:ISpell[] = [];
  //Elementos del filtro
  name: string = '';
  nivelMinimo: number = 1;
  nivelMaximo: number = 100;
  sortByOptions: string[] = ['Nombre', 'Nivel','Via'];
  sortSelected: string = 'Nivel';
  mantenimientoOptions = ["sí","no","Diario"];
  selectedMantenimientoOptions;
  accionOptions = ["Activa", "Pasiva"];
  selectedAccionOptions;
  //Elementos del filtro de Via
  viaSelectable = true;
  viaRemovable = true;
  viaList: string[] = ["Luz"];
  allViaList: string[] = ["Luz","Oscuridad","Fuego","Agua","Aire","Tierra","Ilusión","Creación","Esencia","Destrucción","Nigromancia","Libre Acceso"
  ,"Caos","Guerra","Literae","Muerte","Música","Nobleza","Paz","Pecado","Conocimiento","Sangre","Sueños","Tiempo","Umbral","Vacío"];
  filteredVias: Observable<string[]>;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('ViaInput') ViaInput: ElementRef<HTMLInputElement>;
  @ViewChild('viaAutocomplete') viaAutocomplete: MatAutocomplete;

  viaCtrl = new FormControl();
  //#region constructores
  constructor(private spellService: SpellService) { 
    this.filteredVias = this.viaCtrl.valueChanges.pipe(
      startWith(null),
      map((via: string | null) =>via ? this._filterVia(via) : this.allViaList.slice()));
  }
  //#endregion

  //#region Funtions
  ngOnInit(): void {
    this.spellService.getSpells().subscribe(data => {
      this.spellList = data;
      this.filterSpells();
      }
      );
      this.selectedAccionOptions = this.accionOptions;
      this.selectedMantenimientoOptions = this.mantenimientoOptions;
  }
  addVia(event: MatChipInputEvent): void{
    const input = event.input;
    const value = event.value;

    if((value || '').trim()){
      this.viaList.push(value.trim());
    }
    if(input)
      input.value = '';
    this.viaCtrl.setValue(null);
  }

  removeVia(via: string): void {
    const index = this.viaList.indexOf(via);

    if (index >= 0) {
      this.viaList.splice(index, 1);
    }
  }
  selectedVia(event: MatAutocompleteSelectedEvent){
    this.viaList.push(event.option.viewValue);
    this.ViaInput.nativeElement.value = '';
    this.viaCtrl.setValue(null);
  }
  private _filterVia(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allViaList.filter(via => via.toLowerCase().indexOf(filterValue) === 0);
  }
  filterSpells(){
    this.filteredSpellList = this.spellList.filter((element)=>{
      if(element.Nombre.includes(this.name) &&
        element.Nivel >= this.nivelMinimo &&
        element.Nivel <= this.nivelMaximo &&
        (this.viaList.length === 0 || this.viaList.includes(element.Via)) &&
        this.selectedMantenimientoOptions.includes(element.mantenimiento) &&
        this.selectedAccionOptions.includes(element.Accion)){
        return true;
      }
    }).sort((spell1: ISpell ,spell2:ISpell)=>{
      switch(this.sortSelected){
        case 'Nombre':
          return spell1.Nombre.localeCompare(spell2.Nombre);
          break;
        case 'Via':
          return spell1.Via.localeCompare(spell2.Via);
          break;
        case 'Nivel':
            return spell1.Nivel - spell2.Nivel;
          break;
      }
      return 1;
    });
    this.spellListComponent.ResetPaginator();//Ponemos las páginas en el primer elemento
    console.log('name: '+this.name+' nivel minimo: '+this.nivelMinimo+' nivel maximo: '+this.nivelMaximo);
  }
  //#endregion
}
