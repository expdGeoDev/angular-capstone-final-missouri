import { Component } from '@angular/core';
import { AlertMessageService } from '../alert-message.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-message.component.html',
  styleUrl: './alert-message.component.css'
})
export class AlertMessageComponent {
  message: string | null = null;
  cssClass: string | null = null;

  constructor(private alertService: AlertMessageService) {}

  ngOnInit() {
    this.alertService.getAlert().subscribe(alert => {
      if (alert) {
        this.message = alert.message;
        this.cssClass = `alert-${alert.type}`;
      } else {
        this.message = null;
        this.cssClass = null;
      }
    });
  }

  clear() {
    this.alertService.clear();
  }
}
