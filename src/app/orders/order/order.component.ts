import { Component } from '@angular/core';
import { CoffeeService } from '../../coffee-service';
import { Coffee, FormatType, RoastType } from '../../model/coffee';
import { NgFor } from '@angular/common';
import { UIRouterModule } from '@uirouter/angular';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [NgFor, UIRouterModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  orders: Coffee[] = [];
  filter: string = '';

  constructor(
    private coffeeSvc: CoffeeService
  ) { }

  ngOnInit() {
    this.coffeeSvc.getAll().subscribe(orders => {
      this.orders = orders;
      console.table(orders);
    });
  }

  getFiltered() {
    return this.filter === ''
      ? this.orders
      : this.orders.filter((order) => order.roaster === this.filter);
  }
}
