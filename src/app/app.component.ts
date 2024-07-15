import { Component } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';
import {routerStates} from './app.routes'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UIRouterModule, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {


  title = 'angular-capstone';
  protected readonly routerStates = routerStates;
}
