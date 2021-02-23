import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { PaisSmall, Pais } from '../interfaces/paises.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private _baseUrl: string = 'https://restcountries.eu/rest/v2';
  private _regiones: string[] = ['africa','americas','asia','europe','oceania']

  get regiones(){
    return [...this._regiones];
  }

  constructor(
    private http: HttpClient
  ) { }

  getPaisesPorRegion(region: string){
    const url: string = `${this._baseUrl}/region/${region}?fields=alpha3Code;name`;
    return this.http.get<PaisSmall[]>(url);
  }

  getPaisPorCodigo(codigo: string){

    if(!codigo){
      return of(null);
    }

    const url = `${this._baseUrl}/alpha/${codigo}`;
    return this.http.get<Pais>(url);
  }

  getPaisPorCodigoSmall(codigo: string){

    const url = `${this._baseUrl}/alpha/${codigo}?fields=alpha3Code;name`;
    return this.http.get<PaisSmall>(url);
  }

  getPaisesPorCodigos(borders: string[]){
    if(!borders){
      return of([]);
    }

    const peticiones: Observable<PaisSmall>[] = [];

    borders.forEach(codigo => {
      const peticion = this.getPaisPorCodigoSmall(codigo);
      peticiones.push(peticion);
    });

    return combineLatest(peticiones);

  }

}
