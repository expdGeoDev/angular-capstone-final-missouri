import { Component } from '@angular/core';
import { Coffee, FormatType, RoastType } from '../model/coffee';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-coffee-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './coffee-detail.component.html',
  styleUrl: './coffee-detail.component.css'
})
export class CoffeeDetailComponent {

  roastOptions : RoastType[] = ['dark','light','medium','medium-dark']
  formatOptions : FormatType[] = ['beans','ground','k-pod'] 
  coffee: Coffee = {
      "id": 845,
			"active": true,
			"roaster": "Counter Culture",
			"variety": '',
			"size": 24,
			"roast": "dark",
			"format": "k-pod",
			"grind": 8,
			"origin": ['Brasil'],
			"singleOrigin": true,
			"tastingNotes": "test"
  }
}
