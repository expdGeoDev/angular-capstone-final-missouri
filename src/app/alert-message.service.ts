import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertMessageService {

  private subject = new Subject<any>();

  success(message: string) {
    this.alert('success', message);
  }

  error(message: string) {
    this.alert('error', message);
  }

  alert(type: string, message: string) {
    this.subject.next({ type, message });
  }

  clear() {
    this.subject.next(null);
  }

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

}
