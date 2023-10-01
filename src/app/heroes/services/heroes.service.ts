import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs'
import { Hero } from '../interfaces/hero.interface';
import { environments } from 'src/environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }


  getHeroes():Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }


  getHeroById(id: string): Observable<Hero | undefined>{
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${ id }`)
    .pipe(
      catchError( error => of(undefined) )
    );
  }

  getSuggestions( query: string ):Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${ query }&_limit=6`)
  }

  /**
   * enpoint put
   * Método para agregar un nuevo héroe al backend.
   * @param hero Recibe un Héroe como parametro.
   * @returns retorna un observable con un nuevo héroe.
   */
  addHero( hero: Hero ): Observable<Hero>{
    return this.http.post<Hero>(`${this.baseUrl}/heroes`, hero)
  }

  /**
   * endpoint patch
   * Método para modificar alguna propiedad del héroe.
   * @param hero Recibe un héroe con sus propiedades.
   * @returns retorna un héroe con la nueva propiedad asignada.
   */
  updateHero( hero: Hero ): Observable<Hero>{
    if(!hero.id ) throw Error('Hero id is required');
    return this.http.patch<Hero>(`${this.baseUrl}/heroes/${ hero.id}`, hero)
  }


  /**
   * endpoint delete
   *Método para eliminar un héroe.
   * @param id recibe un Id de un héroe
   * @returns retorna verdadero si es un 200 y no cae en error y false si tiene algun error.
   */
  deleteHeroById( id: string ): Observable<boolean>{
    return this.http.delete(`${this.baseUrl}/heroes/${ id }`)
    .pipe(
      map( resp => true ),
      catchError( err => of(false)),
    );
  }

}
