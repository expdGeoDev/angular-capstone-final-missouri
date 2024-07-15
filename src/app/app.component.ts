import { Component } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UIRouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-capstone';
}
