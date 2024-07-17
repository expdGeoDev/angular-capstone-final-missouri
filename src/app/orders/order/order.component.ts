import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { StateService } from '@uirouter/angular';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UIRouterModule } from '@uirouter/angular';
import { CoffeeService } from '../../coffee-service';
import { Coffee } from '../../model/coffee';
import { AlertMessageService } from '../../alert-message.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [NgFor, UIRouterModule, FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  orders: Coffee[] = [];
  filterFields = { roaster: '', size: '', roast: '', format: '' };
  @Output() messageEvent = new EventEmitter<string>();


  constructor(private coffeeSvc : CoffeeService, private alertService: AlertMessageService, private stateService: StateService) {
    this.loadPage();
   }
  
   sendMessage() {
    this.messageEvent.emit('Message from Child');
  }
  ngOnInit() {
    this.loadPage();
  }
  loadPage(){
    this.coffeeSvc.getActives().subscribe(orders => {
      this.orders = orders;
    });
  }

  getFiltered() {
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

  deleteCoffe(coffee : Coffee){
    this.coffeeSvc.deleteCoffee(coffee);
    this.loadPage();
    this.alertService.success("Coffee Deleted Successfully");
  }
  editCoffee(coffee: Coffee) {
    this.stateService.go('coffee-detail', { data: coffee });
  }

}
