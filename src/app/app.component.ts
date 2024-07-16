import { Component } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';
import {appRouting} from './app.routing'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,

  templateUrl: './app.component.html',
  imports: [UIRouterModule, CommonModule, FormsModule],
  styleUrl: './app.component.css',
})
export class AppComponent {


  title = 'angular-capstone';

  protected readonly routerStates = appRouting;
}
