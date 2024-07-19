import { Component } from '@angular/core';
import { Transition } from '@uirouter/angular';
import { Coffee, FormatType, RoastType, Size, VarietyType } from '../model/coffee';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoffeeService } from '../coffee-service';
import { AlertMessageService } from '../alert-message.service';

@Component({
  selector: 'app-coffee-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './coffee-detail.component.html',
  styleUrls: ['./coffee-detail.component.css']
})
export class CoffeeDetailComponent {

  roastOptions: RoastType[] = ['Blonde', 'Espresso', 'Light', 'Medium', 'Medium-dark', 'Dark'];
  formatOptions: FormatType[] = ['Beans', 'Ground', 'K-pod'];
  sizes: Size[] = [8, 12, 14, 16, 18, 20, 24];
  varietyOptions: VarietyType[] = ['Arabica', 'Robusta', 'Excelsa', 'Liberica'];
  coffee: Coffee;

  constructor(private coffeeSvc: CoffeeService, private alertService: AlertMessageService, private transition: Transition) {
    const data: Coffee = this.transition.params()['data'];
    this.coffee = data ? this.ensureNumericId(data) : this.initializeDefaultCoffee();
    console.log(this.coffee);
  }

  private ensureNumericId(coffee: Coffee): Coffee {
    coffee.id = Number(coffee.id);
    return coffee;
  }

  private initializeDefaultCoffee(): Coffee {
    return {
      id: 0,
      active: true,
      roaster: '',
      variety: this.varietyOptions[2],
      size: this.sizes[0],
      roast: this.roastOptions[0],
      format: this.formatOptions[0],
      grind: 1,
      origin: [''],
      singleOrigin: false,
      tastingNotes: ''
    };
  }

  public saveCoffee(coffee: Coffee): void {
    coffee = this.ensureNumericId(coffee);
    console.log(coffee);
  
    if (coffee.id !== 0) {
      this.coffeeSvc.updateCoffee(coffee).subscribe({
        next: (updatedCoffee) => {
          console.log('Coffee Updated', updatedCoffee);
          this.alertService.success('Coffee updated successfully!');
          this.coffee = this.initializeDefaultCoffee();
        },
        error: (error) => {
          console.error('Error updating coffee', error);
          this.alertService.error('Failed to update coffee.');
        }
      });
    } else {
      this.coffeeSvc.addCoffee(coffee).subscribe({
        next: (newCoffee) => {
          console.log('New Coffee Added', newCoffee);
          this.alertService.success('Coffee added successfully!');
          this.coffee = this.initializeDefaultCoffee();
        },
        error: (error) => {
          console.error('Error adding coffee', error);
          this.alertService.error('Failed to add coffee.');
        }
      });
    }
  }
}
