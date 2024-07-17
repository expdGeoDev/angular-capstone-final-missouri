import { Component, OnInit } from '@angular/core';
import { OrderService } from './order.service';
import { Coffee } from '../../model/Coffee';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { values } from '@uirouter/angular';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  orders: Coffee[] = [];
  filterFields = { roaster: '', size: '', roast: '', format: '' };

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
    });
  }

  getFiltered() {
    console.log(this.filterFields.roaster,
      this.filterFields.size,
      this.filterFields.roast,
      this.filterFields.format
    );

    if (
      this.filterFields.roaster === ''
      && Number(this.filterFields.size) === 0
      && this.filterFields.roast.toString() === ''
      && this.filterFields.format.toString() === ''
    ) {
      return this.orders;
    }
    else {
      return this.orders
        .filter((order) =>
          this.filterFields.roaster != '' ? order.roaster.toLocaleLowerCase().includes(this.filterFields.roaster.toLocaleLowerCase()) : order.roaster
        )
        .filter((order) =>
          Number(this.filterFields.size) != 0 ? order.size.toString().includes(this.filterFields.size) : order.size
        )
        .filter((order) =>
          this.filterFields.roast.toString() != '' ? order.roast?.toString().toLocaleLowerCase().includes(this.filterFields.roast.toString().toLocaleLowerCase()) : order.roast
        )
        .filter((order) =>
          this.filterFields.format.toString() != '' ? order.format?.toString().toLocaleLowerCase().includes(this.filterFields.format.toString().toLocaleLowerCase()) : order.format
        );
    }
  }

  tableAction(action: string) {
    console.log("Table Action: " + action)
  }
}
