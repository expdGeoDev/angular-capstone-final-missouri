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
    // this.http.get<any>('assets/config.json').subscribe(
    //   config => {
    //     this.rootUrl = config.apiUrl;
    //     console.log(this.data);
    //   }
    // );
  }

  getAll() : Observable<Coffee[]>{
    console.log()
    let finalUrl = this.rootUrl
    return this.http.get<Coffee[]>(finalUrl)

  }

  getById(id:string) : Observable<Coffee[]>{
    return this.http.get<Coffee[]>(this.rootUrl+'/'+id)
  }

  addCoffee(coffee:Coffee):Observable<Coffee>{
    return this.http.post<Coffee>(this.rootUrl, coffee)
  }
}

