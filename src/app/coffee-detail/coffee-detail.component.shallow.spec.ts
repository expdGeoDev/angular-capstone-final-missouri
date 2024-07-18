import { TestBed } from '@angular/core/testing';

import { CoffeeDetailComponent } from './coffee-detail.component';
import { CoffeeService } from '../coffee-service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CoffeeDetailComponent - Shallow Tests', () => {
  let component: CoffeeDetailComponent;
  let mockAlertSvc;
  let mockCoffeeSvc;

  beforeEach(async () => {
    mockCoffeeSvc = jasmine.createSpyObj(['getAll','getById','addCoffee']);
    mockAlertSvc = jasmine.createSpyObj([''])
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
});
