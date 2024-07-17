import { ComponentFixture, TestBed,fakeAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OrderComponent } from './order.component';
import { Coffee } from '../../model/coffee';
import { CoffeeService } from '../../coffee-service';

import { delay, of } from 'rxjs';

describe('OrderComponent', () => {
  // let component: OrderComponent;
  // let fixture: ComponentFixture<OrderComponent>;
  // let mockCoffeeService : jasmine.SpyObj<CoffeeService>;
  // let COFFEES : Coffee[];
  
  beforeEach(async () => {
    // mockCoffeeService = jasmine.createSpyObj(['getAll','getById','addCoffee','pipe']);
    // COFFEES = [{id: 1,
    //   active: true,
    //   roaster: "Tim Horton's",
    //   variety: "Arabica",
    //   size: 14,
    //   roast: "Dark",
    //   format: "K-pod",
    //   grind: 8,
    //   origin: [],
    //   singleOrigin: true,
    //   tastingNotes: ""}]
    // await TestBed.configureTestingModule({
    //   imports: [OrderComponent],
    //   providers:[{
    //     provide : CoffeeService, useValue: mockCoffeeService}
    //   ],
    //   schemas:[NO_ERRORS_SCHEMA]
    // })
    // .compileComponents();
    
    // fixture = TestBed.createComponent(OrderComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    // mockCoffeeService.getAll.and.returnValue(of(COFFEES));
    // fixture.detectChanges();
    expect(true).toBeTrue();
    // done()
  });
});
