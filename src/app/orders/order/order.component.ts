import { Component, inject} from '@angular/core';
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

  constructor( ) { }
  coffeeSvc = inject(CoffeeService);


  ngOnInit() {
    this.loadPage();
  }
  loadPage(){
    this.coffeeSvc.getActives().subscribe(orders => {
      this.orders = orders;
    });
  }

  getFiltered() {
    return this.filter === ''
      ? this.orders
      : this.orders.filter((order) => order.roaster === this.filter);
  }
  deleteCoffe(coffee : Coffee){
    this.coffeeSvc.deleteCoffee(coffee);
    this.loadPage();
  }
  updateCoffe(coffee : Coffee){
    this.coffeeSvc.updateCoffee(coffee);
    this.loadPage();
  }
}
