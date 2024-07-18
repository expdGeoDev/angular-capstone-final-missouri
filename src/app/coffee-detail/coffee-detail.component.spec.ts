import { TestBed } from '@angular/core/testing';
import { Transition } from '@uirouter/angular';
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
  let mockTransition : jasmine.SpyObj<Transition>;

  beforeEach(async () => {
    mockCoffeeSvc = jasmine.createSpyObj(['getAll','getById','addCoffee','updateCoffee']);
    mockAlertSvc = jasmine.createSpyObj(['success'])
    mockTransition = jasmine.createSpyObj(['params'])
    await TestBed.configureTestingModule({
      imports: [CoffeeDetailComponent],
      providers:[{
        provide : CoffeeService, useValue: mockCoffeeSvc},
        {provide : Transition, useValue :mockTransition}
      ],
      schemas:[NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    
    mockTransition.params.and.returnValue([{'data': null}])
    component = new CoffeeDetailComponent(mockCoffeeSvc, mockAlertSvc, mockTransition);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('saveCoffee should call addCoffee success', () =>{
      let coffee: Coffee = {
        "id": 0, "active": true,
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

  it('saveCoffee should call updateCoffee success', () =>{
        let coffee: Coffee = {
          "id": 1, "active": true,
          "roaster": 'bye', "variety": 'Arabica',
          "size": 24, "roast": 'Light',
          "format": 'Beans', "grind": 1,
          "origin": [''], "singleOrigin": false,
          "tastingNotes": ""
      }
      mockCoffeeSvc.updateCoffee.and.returnValue()
      component.saveCoffee(coffee)
      expect(mockCoffeeSvc.updateCoffee).toHaveBeenCalled()
      expect(mockAlertSvc.success).toHaveBeenCalled()

    });
});
