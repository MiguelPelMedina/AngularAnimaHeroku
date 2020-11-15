import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ISpell } from 'src/Interfaces/Spell';
import { ISpellGrade } from 'src/Interfaces/Spell';
import { catchError} from 'rxjs/operators'
import { throwError as observableThrowError} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SpellService {

  url: string = "assets/data/AnimaStructure_prueba.json"

  constructor(private http: HttpClient) { }

  getSpells(): Observable<ISpell[]>{
    return this.http
              .get<ISpell[]>(this.url)
              .pipe(
                catchError(this.errorHandler)
              )
  }
  errorHandler(error: HttpErrorResponse){
    return observableThrowError(error.message);
  }
}
