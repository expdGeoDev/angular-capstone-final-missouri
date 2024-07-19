import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { StateService } from '@uirouter/angular';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UIRouterModule } from '@uirouter/angular';
import { CommonModule } from '@angular/common';
import { CoffeeService } from '../../coffee-service';
import { Coffee } from '../../model/coffee';
import { AlertMessageService } from '../../alert-message.service';
import { CoffeeDetailComponent } from "../../coffee-detail/coffee-detail.component";


@Component({
  selector: 'app-order',
  standalone: true,
  imports: [NgFor, NgIf, UIRouterModule, CommonModule, FormsModule, CoffeeDetailComponent],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'] // Corrigido para styleUrls
})
export class OrderComponent implements OnInit {
  coffees: Coffee[] = [];
  filter: string = '';
  filterFields = { roaster: '', size: '', roast: '', format: '' };
  pagNItems: number = 10;
  pagTItems: number = 0;
  pagCount: number = 0;
  pagSelect: number = 1;
  itemStart: number = 0;
  itemEnd: number = 0;  


  selectedCoffee: Coffee | null = null;
  isModalOpen: boolean = false;

  @Output() messageEvent = new EventEmitter<string>();

  constructor(private coffeeSvc: CoffeeService, private alertService: AlertMessageService, private stateService: StateService) { }

  ngOnInit() {
    this.loadPage();
  }

  sendMessage() {
    this.messageEvent.emit('Message from Child');
  }

  loadPage() {
    this.coffeeSvc.getActives().subscribe({
      next: (coffees) => {
        this.coffees = coffees;
      },
      error: (error) => {
        console.error('Error loading coffees', error);
        this.alertService.error('Failed to load coffees.');
      }
    });
  }

  getFiltered() {
    let coffeesFiltered: Coffee[] = [];
    let userFilter: boolean = false;

    if (
      this.filterFields.roaster === ''
      && Number(this.filterFields.size) === 0
      && this.filterFields.roast.toString() === ''
      && this.filterFields.format.toString() === ''
    ) {
      coffeesFiltered = this.coffees;
    } else {
      coffeesFiltered = this.coffees
        .filter((coffee) =>
          this.filterFields.roaster !== '' ? coffee.roaster.toLocaleLowerCase().includes(this.filterFields.roaster.toLocaleLowerCase()) : true
        )
        .filter((coffee) =>
          Number(this.filterFields.size) !== 0 ? coffee.size.toString().includes(this.filterFields.size) : true
        )
        .filter((coffee) =>
          this.filterFields.roast.toString() !== '' ? coffee.roast?.toString().toLocaleLowerCase().includes(this.filterFields.roast.toString().toLocaleLowerCase()) : true
        )
        .filter((coffee) =>
          this.filterFields.format.toString() !== '' ? coffee.format?.toString().toLocaleLowerCase().includes(this.filterFields.format.toString().toLocaleLowerCase()) : true
        );
    }

    this.pagTItems = coffeesFiltered.length;
    this.pagCount = Math.ceil(coffeesFiltered.length / this.pagNItems);

    if (userFilter) { this.pagSelect = 1; }
    this.setSlice(this.pagSelect);

    return coffeesFiltered.slice(this.itemStart, this.itemEnd);
  }

  setSlice(pagSelected: number) {
    if (pagSelected > 0 && pagSelected <= this.pagCount) {
      this.pagSelect = pagSelected;
      this.itemStart = (this.pagSelect * this.pagNItems) - this.pagNItems;
      this.itemEnd = (this.itemStart + this.pagNItems) - (this.pagSelect * this.pagNItems > this.pagTItems ? this.pagTItems - this.itemStart : 0);
    }
  }

  deleteCoffee(coffee: Coffee): void {
    this.coffeeSvc.deleteCoffee(coffee).subscribe({
      next: () => {
        console.log('Coffee Deleted');
        this.alertService.success('Coffee deleted successfully!');
        // Atualiza a lista local de cafés
        this.coffees = this.coffees.filter(c => c.id !== coffee.id);
      },
      error: (error) => {
        console.error('Error deleting coffee', error);
        this.alertService.error('Failed to delete coffee.');
      }
    });
  }

  // editCoffee(coffee: Coffee) {
  //   this.stateService.go('coffee-detail', { data: coffee });
  // }
  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  editCoffee(coffee: Coffee) {
    this.selectedCoffee = coffee;
    this.openModal(); // Abre o modal para edição
  }
}
