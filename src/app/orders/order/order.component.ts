import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { StateService } from '@uirouter/angular';
import { NgFor, NgIf  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UIRouterModule } from '@uirouter/angular';
import { CommonModule } from '@angular/common';
import { CoffeeService } from '../../coffee-service';
import { Coffee } from '../../model/coffee';
import { AlertMessageService } from '../../alert-message.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [NgFor, NgIf, UIRouterModule, CommonModule, FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit{
  coffees : Coffee[] = [];
  filter: string = '';
  filterFields = { roaster: '', size: '', roast: '', format: '' };
  pagNItems: number = 10;
  pagTItems: number = 0;
  pagCount: number = 0;
  pagSelect: number = 1;
  itemStart: number = 0;
  itemEnd: number = 0;  

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
    this.coffeeSvc.getActives()
    .subscribe(coffes => {
      this.coffees = coffes;
      this.getFiltered()
    });
  }

  getFiltered() {
    let coffesFiltered: Coffee[] = [];
    let userFilter: boolean = false;
    if (
      this.filterFields.roaster === ''
      && Number(this.filterFields.size) === 0
      && this.filterFields.roast.toString() === ''
      && this.filterFields.format.toString() === ''
    ) {
      coffesFiltered = this.coffes
    }
    else {
      coffesFiltered = this.coffesFiltered
        .filter((coffee) =>
          this.filterFields.roaster != '' ? order.roaster.toLocaleLowerCase().includes(this.filterFields.roaster.toLocaleLowerCase()) : order.roaster
        )
        .filter((coffee) =>
          Number(this.filterFields.size) != 0 ? order.size.toString().includes(this.filterFields.size) : order.size
        )
        .filter((coffee) =>
          this.filterFields.roast.toString() != '' ? order.roast?.toString().toLocaleLowerCase().includes(this.filterFields.roast.toString().toLocaleLowerCase()) : order.roast
        )
        .filter((coffee) =>
          this.filterFields.format.toString() != '' ? order.format?.toString().toLocaleLowerCase().includes(this.filterFields.format.toString().toLocaleLowerCase()) : order.format
        )
      userFilter = true;
    }

    this.pagTItems = coffesFiltered.length;
    this.pagCount = Math.ceil(coffesFiltered.length / this.pagNItems);

    if (userFilter) { this.pagSelect = 1 }
    this.setSlice(this.pagSelect);

    return coffesFiltered.slice(this.itemStart, this.itemEnd);
  }

  setSlice(pagSelected: number) {
    if (pagSelected > 0 && pagSelected <= this.pagCount) {
      this.pagSelect = pagSelected;
      this.itemStart = (this.pagSelect * this.pagNItems) - this.pagNItems;
      this.itemEnd = (this.itemStart + this.pagNItems) - (this.pagSelect * this.pagNItems > this.pagTItems ? this.pagTItems - this.itemStart : 0);
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
