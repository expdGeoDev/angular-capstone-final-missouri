import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeSvcTestComponent } from './coffee-svc-test.component';
import { CoffeeService } from '../coffee-service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { Coffee } from '../model/coffee';

describe('CoffeeSvcTestComponent', () => {
  let component: CoffeeSvcTestComponent;
  let fixture: ComponentFixture<CoffeeSvcTestComponent>;
  let mockCoffeeService : jasmine.SpyObj<CoffeeService>;
  let COFFEES : Coffee[];

  beforeEach(async () => {
    mockCoffeeService = jasmine.createSpyObj(['getAll','getById','addCoffee']);
    COFFEES = [{      id: 1,
      active: true,
      roaster: "Tim Horton's",
      variety: "",
      size: 14,
      roast: "dark",
      format: "k-pod",
      grind: 8,
      origin: [],
      singleOrigin: true,
      tastingNotes: ""}]
    await TestBed.configureTestingModule({
      imports: [CoffeeSvcTestComponent],
      providers:[{
        provide : CoffeeService, useValue: mockCoffeeService}
      ],
      schemas:[NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoffeeSvcTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    mockCoffeeService.getAll.and.returnValue(of(COFFEES));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
