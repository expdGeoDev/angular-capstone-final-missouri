import { Component } from '@angular/core';
import { OrderService } from './order.service';
import { Coffee } from '../../model/Coffee';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [NgFor],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  orders: Coffee[] = [];
  filter: string = '';

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.orderService.getOrders().subscribe(orders => {
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
