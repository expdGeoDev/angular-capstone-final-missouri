import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coffee } from './model/coffee';
import { Observable } from 'rxjs';
import * as config from '../assets/config.json'


@Injectable({
  providedIn: 'root'
})
export class CoffeeService {
  private rootUrl: string  = '';
  data : any = config
  lastId : number = 0;

  constructor(private http: HttpClient) {
    this.loadConfig();
    this.getAll().subscribe( list =>{
      this.lastId = list.length++;
    })
    }


  private loadConfig(){
    this.rootUrl = this.data['apiUrl'];
  }

  getAll() : Observable<Coffee[]>{
    return this.http.get<Coffee[]>(this.rootUrl)
  }
  getActives() : Observable<Coffee[]>{
    return this.http.get<Coffee[]>(`${this.rootUrl}?active=true`);
  }

  getById(id: number): Observable<Coffee> {
    return this.http.get<Coffee>(`${this.rootUrl}/${id}`);
  }

  addCoffee(coffee: Coffee): Observable<Coffee> {
    coffee.id = ++this.lastId;
    return this.http.post<Coffee>(this.rootUrl, coffee);
  }

  updateCoffee(coffee: Coffee): Observable<Coffee> {
    return this.http.put<Coffee>(`${this.rootUrl}/${coffee.id}`, coffee);
  }

  deleteCoffee(coffee: Coffee): Observable<Coffee> {
    coffee.active = false;
    return this.http.put<Coffee>(`${this.rootUrl}/${coffee.id}`, coffee);
  }
}
