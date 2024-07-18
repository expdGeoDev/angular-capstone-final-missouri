import { Component } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';
import {appRouting} from './app.routing'
import { FormsModule } from '@angular/forms';
import { AlertMessageComponent } from "./alert-message/alert-message.component";


@Component({
  selector: 'app-root',
  standalone: true,

  templateUrl: './app.component.html',
  imports: [UIRouterModule, FormsModule, AlertMessageComponent],
  styleUrl: './app.component.css',
})
export class AppComponent {


  title = 'angular-capstone';

  protected readonly routerStates = appRouting;
}
