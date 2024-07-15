import { Component } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';
import { CoffeeService } from './coffee-service';
import { Coffee } from './model/coffee';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UIRouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private coffeeSvc: CoffeeService) { }
  coffee : any;

  title = 'angular-capstone';

  printResponse(){
    this.coffeeSvc.getAll().subscribe(coffee => {
      this.coffee = coffee;
    }
  )
    console.log(this.coffee);
  }


  printResponse2(){
    this.coffeeSvc.getById('2').subscribe(coffee => {
      this.coffee = coffee;
    }
  )
    console.log(this.coffee);
  }

}
