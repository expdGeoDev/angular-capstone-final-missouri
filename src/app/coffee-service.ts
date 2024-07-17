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

  constructor(private http: HttpClient) {
    this.loadConfig();
    console.log(config)
  }

  private loadConfig(){
    this.rootUrl = this.data['apiUrl'];
  }

  getAll() : Observable<Coffee[]>{
    return this.http.get<Coffee[]>(this.rootUrl + '/?active=true')
  }

  getById(id:number) : Observable<Coffee>{
    return this.http.get<Coffee>(this.rootUrl+'/'+id)
  }


  addCoffee(coffee:Coffee):Observable<Coffee>{
    return this.http.post<Coffee>(this.rootUrl, coffee)
  }

  updateCoffee(coffee:Coffee){
    this.http.put<Coffee>(this.rootUrl + '/' + coffee.id, coffee).subscribe();
  }

  deleteCoffee(coffee:Coffee) {
    coffee.active = false;
    this.http.put<Coffee>(this.rootUrl + '/' + coffee.id, coffee).subscribe();
  }

}

