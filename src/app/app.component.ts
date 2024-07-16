import { Component } from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { UIRouterModule } from '@uirouter/angular';
import {routerStates} from './app.routes'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoffeeDetailComponent } from './coffee-detail/coffee-detail.component';


@Component({
  selector: 'app-root',
  standalone: true,

  templateUrl: './app.component.html',
  imports: [NavbarComponent, UIRouterModule, CommonModule, FormsModule],
  styleUrl: './app.component.css',
})
export class AppComponent {


  title = 'angular-capstone';

  protected readonly routerStates = routerStates;
}
