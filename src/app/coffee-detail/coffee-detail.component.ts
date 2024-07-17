import { Component } from '@angular/core';
import { Coffee, FormatType, RoastType, VarietyType } from '../model/coffee';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoffeeService } from '../coffee-service';


@Component({
  selector: 'app-coffee-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './coffee-detail.component.html',
  styleUrl: './coffee-detail.component.css'
})
export class CoffeeDetailComponent {

  constructor(private coffeeSvc : CoffeeService){};

  roastOptions : RoastType[] = ['Light','Medium','Medium-dark', 'Dark']
  formatOptions : FormatType[] = ['Beans','Ground','K-pod'] 
  varietyOptions : VarietyType [] = ['Arabica', 'Robusta', 'Excelsa', 'Liberica'];

  coffee: Coffee = {
      "id": 0,
			"active": true,
			"roaster": '',
			"variety": this.varietyOptions[1],
			"size": 24,
			"roast": this.roastOptions[0],
			"format": this.formatOptions[0],
			"grind": 1,
			"origin": [''],
			"singleOrigin": false,
			"tastingNotes": ""
  }

  public saveCoffee(coffee:Coffee){
    this.coffeeSvc.addCoffee(coffee).subscribe(newCoffee =>{
      console.log('New Coffee Added' + newCoffee);
    })
  }
}

