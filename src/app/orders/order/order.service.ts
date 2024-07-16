import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coffee } from '../../model/Coffee'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient
  ) { }

  getOrders(): Observable<Coffee[]> {
    return this.http.get<Coffee[]>('/api/coffees');
  }
}
