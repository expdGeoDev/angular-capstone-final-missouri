import { Component } from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { UIRouterModule } from '@uirouter/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [NavbarComponent, UIRouterModule],
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-capstone';
}