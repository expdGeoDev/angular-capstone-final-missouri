import { Component } from '@angular/core';
import { CoffeeService } from '../../coffee-service';
import { Coffee, FormatType, RoastType } from '../../model/coffee';
import { NgFor } from '@angular/common';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [NgFor, CommonModule, FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  coffees? : Observable<Coffee[]> ;
  filter: string = '';

  constructor(
    private coffeeSvc: CoffeeService
  ) { }

  ngOnInit() {
    this.coffees = this.coffeeSvc.getAll();
  }

  getFiltered() {
    // this.coffees?.subscribe(order => {
    // return this.filter === ''
    //   ? this.coffees
    //   : this.coffees.pipe((order) => order.roaster === this.filter)
    // });
    return this.coffees;
  }
}
