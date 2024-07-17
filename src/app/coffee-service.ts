import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coffee } from './model/coffee';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as config from '../assets/config.json'

@Injectable({
  providedIn: 'root'
})
export class CoffeeService {
  private rootUrl: string  = '';
  data : any = config

  constructor(private http: HttpClient) {
    this.loadConfig();
    console.log(config)
  }

  private loadConfig(){
    this.rootUrl = this.data['apiUrl'];
    console.log('Root url ' + this.rootUrl);
  }

  getAll() : Observable<Coffee[]>{
    return this.http.get<Coffee[]>(this.rootUrl)
  }
  getActives() : Observable<Coffee[]>{
    console.log('Getting all actives')
    return this.http.get<Coffee[]>(this.rootUrl + '/?active=true')
  }
  getById(id:string) : Observable<Coffee[]>{
    return this.http.get<Coffee[]>(this.rootUrl+'/'+id)
  }

  getLastCoffee(): Observable<Coffee> {
    return this.getAll().pipe(
      map(coffees => coffees[coffees.length - 1])
    );
  }
  addCoffee(coffee: Coffee): Observable<Coffee> {
    return this.getLastCoffee().pipe(
      map(lastCoffee => {
        const newId = lastCoffee ? Math.floor(lastCoffee.id) + 1 : 1;
        coffee.id = newId;
        return coffee;
      }),
      switchMap(newCoffee => this.http.post<Coffee>(this.rootUrl, newCoffee))
    );
  }
  updateCoffee(coffee:Coffee){
    this.http.put<Coffee>(this.rootUrl + '/' + coffee.id, coffee).subscribe();
  }
  deleteCoffee(coffee:Coffee) {
    coffee.active = false;
    this.http.put<Coffee>(this.rootUrl + '/' + coffee.id, coffee).subscribe();
  }
}

