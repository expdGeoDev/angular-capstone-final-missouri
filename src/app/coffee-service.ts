import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coffee } from './model/coffee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoffeeService {
  private apiUrl: string = '';


  constructor(private http: HttpClient) {
    this.loadConfig();
  }
  private loadConfig(){
    this.http.get<any>('assets/config.json').subscribe(
      config => {
        this.apiUrl = config.apiUrl;
      }
    );
  }

  getAll() : Observable<Coffee[]>{
    return this.http.get<Coffee[]>(this.apiUrl + '/?active=true')
  }
  getById(id:string) : Observable<Coffee[]>{
    return this.http.get<Coffee[]>(this.apiUrl+'/'+id)
  }
  addCoffee(coffee:Coffee):Observable<Coffee>{
    return this.http.post<Coffee>(this.apiUrl, coffee)
  }
  updateCoffee(coffee:Coffee){
    this.http.put<Coffee>(this.apiUrl + '/' + coffee.id, coffee).subscribe();
  }
  deleteCoffee(coffee:Coffee) {
    coffee.active = false;
    this.http.put<Coffee>(this.apiUrl + '/' + coffee.id, coffee).subscribe();
  }
}

