import { Component, Input } from '@angular/core';
import { any, Transition } from '@uirouter/angular';
import { Coffee, FormatType, RoastType, VarietyType } from '../model/coffee';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoffeeService } from '../coffee-service';
import { AlertMessageService } from '../alert-message.service';


@Component({
  selector: 'app-coffee-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './coffee-detail.component.html',
  styleUrl: './coffee-detail.component.css'
})
export class CoffeeDetailComponent {
  constructor(private coffeeSvc : CoffeeService, private alertService: AlertMessageService, private transition: Transition){
    const data = this.transition.params()['data'];
    this.coffee = data ? data : this.initializeDefaultCoffee()
    
  };
  roastOptions : RoastType[] = ['Light','Medium','Medium-dark', 'Dark']
  formatOptions : FormatType[] = ['Beans','Ground','K-pod'] 
  varietyOptions : VarietyType [] = ['Arabica', 'Robusta', 'Excelsa', 'Liberica'];
  coffee: Coffee;

  private initializeDefaultCoffee(): Coffee {
    return {
      id: 0,
      active: true,
      roaster: '',
      variety: this.varietyOptions[0],
      size: 24,
      roast: this.roastOptions[0],
      format: this.formatOptions[0],
      grind: 1,
      origin: [''],
      singleOrigin: false,
      tastingNotes: ""
    };
  }
  

  public saveCoffee(coffee:Coffee){
    console.log(coffee);
    if (coffee.id != 0){
        this.coffeeSvc.updateCoffee(coffee);
        this.alertService.success('Coffee updated successfully!');
      }else{
      this.coffeeSvc.addCoffee(coffee).subscribe(newCoffee =>{
        this.alertService.success('Coffee added successfully!');
      })
    }
  }
}

