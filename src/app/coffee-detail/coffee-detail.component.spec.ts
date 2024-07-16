import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeDetailComponent } from './coffee-detail.component';
import { CoffeeService } from '../coffee-service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CoffeeDetailComponent', () => {
  let component: CoffeeDetailComponent;
  let fixture: ComponentFixture<CoffeeDetailComponent>;
  let mockCoffeeSvc;

  beforeEach(async () => {
    mockCoffeeSvc = jasmine.createSpyObj(['getAll','getById','addCoffee']);
    await TestBed.configureTestingModule({
      imports: [CoffeeDetailComponent],
      providers:[{
        provide : CoffeeService, useValue: mockCoffeeSvc}
      ],
      schemas:[NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoffeeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
