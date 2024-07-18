import { TestBed } from '@angular/core/testing';

import { CoffeeDetailComponent } from './coffee-detail.component';
import { CoffeeService } from '../coffee-service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Coffee } from '../model/coffee';
import { of } from 'rxjs';
import { AlertMessageService } from '../alert-message.service';

describe('CoffeeDetailComponent', () => {
  let component: CoffeeDetailComponent;
  let mockAlertSvc : jasmine.SpyObj<AlertMessageService>;
  let mockCoffeeSvc: jasmine.SpyObj<CoffeeService>;

  beforeEach(async () => {
    mockCoffeeSvc = jasmine.createSpyObj(['getAll','getById','addCoffee','addCoffee']);
    mockAlertSvc = jasmine.createSpyObj(['success'])
    await TestBed.configureTestingModule({
      imports: [CoffeeDetailComponent],
      providers:[{
        provide : CoffeeService, useValue: mockCoffeeSvc}
      ],
      schemas:[NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    
  
    component = new CoffeeDetailComponent(mockCoffeeSvc, mockAlertSvc);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('saveCoffee should call services methods success', () =>{
      let coffee: Coffee = {
        "id": 2, "active": true,
        "roaster": 'bye', "variety": 'Arabica',
        "size": 24, "roast": 'Light',
        "format": 'Beans', "grind": 1,
        "origin": [''], "singleOrigin": false,
        "tastingNotes": ""
    }
    mockCoffeeSvc.addCoffee.and.returnValue(of(coffee))
    component.saveCoffee(coffee)
    expect(mockCoffeeSvc.addCoffee).toHaveBeenCalled()
    expect(mockAlertSvc.success).toHaveBeenCalled()

  });
});
