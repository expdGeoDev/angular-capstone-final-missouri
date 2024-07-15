import { Component } from '@angular/core';
import {CoffeeService} from '../coffee-service'
import { Coffee } from '../model/coffee';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-coffee-svc-test',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './coffee-svc-test.component.html',
  styleUrl: './coffee-svc-test.component.css'
})
export class CoffeeSvcTestComponent {

    coffees? : Observable<Coffee[]>;
    constructor(private coffeeSvc : CoffeeService){

    }

    ngOnInit(){
     this.coffees = this.coffeeSvc.getAll().pipe();
    //  .subscribe(coffeess => {
    //     console.log(coffeess)
    //   });
    }

}
