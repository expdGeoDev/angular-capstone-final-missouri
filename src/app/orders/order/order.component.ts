import { Component, inject} from '@angular/core';
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

  constructor( ) { }
  coffeeSvc = inject(CoffeeService);


  ngOnInit() {
    this.loadPage();
  }
  loadPage(){
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
  deleteCoffe(coffee : Coffee){
    this.coffeeSvc.deleteCoffee(coffee);
    this.loadPage();
  }
  updateCoffe(coffee : Coffee){
    this.coffeeSvc.updateCoffee(coffee);
    this.loadPage();
  }
}
