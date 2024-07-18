import { Component, OnInit } from '@angular/core';
import { OrderService } from './order.service';
import { Coffee } from '../../model/Coffee';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  orders: Coffee[] = [];
  filterFields = { roaster: '', size: '', roast: '', format: '' };

  pagNItems: number = 10;
  pagTItems: number = 0;
  pagCount: number = 0;
  pagSelect: number = 1;
  itemStart: number = 0;
  itemEnd: number = 0;

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
      this.getFiltered()
    });
  }

  getFiltered() {

    let ordersFiltered: Coffee[] = [];
    let userFilter: boolean = false;
    if (
      this.filterFields.roaster === ''
      && Number(this.filterFields.size) === 0
      && this.filterFields.roast.toString() === ''
      && this.filterFields.format.toString() === ''
    ) {
      ordersFiltered = this.orders
    }
    else {
      ordersFiltered = this.orders
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
        )
      userFilter = true;
    }

    this.pagTItems = ordersFiltered.length;
    this.pagCount = Math.ceil(ordersFiltered.length / this.pagNItems);

    if (userFilter) { this.pagSelect = 1 }
    this.setSlice(this.pagSelect);

    return ordersFiltered.slice(this.itemStart, this.itemEnd);
  }

  setSlice(pagSelected: number) {
    if (pagSelected > 0 && pagSelected <= this.pagCount) {
      this.pagSelect = pagSelected;
      this.itemStart = (this.pagSelect * this.pagNItems) - this.pagNItems;
      this.itemEnd = (this.itemStart + this.pagNItems) - (this.pagSelect * this.pagNItems > this.pagTItems ? this.pagTItems - this.itemStart : 0);
    }
  }
}
