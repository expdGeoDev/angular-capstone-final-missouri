import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OrderComponent } from './order.component';
import { CoffeeService } from '../../coffee-service';
import { AlertMessageService } from '../../alert-message.service';
import { StateService } from '@uirouter/angular';
import { coffees } from '../../../data/mock-coffee'
import { of } from 'rxjs';
describe('OrderComponent', () => {

  let component: OrderComponent;
  let mockAlertSvc : jasmine.SpyObj<AlertMessageService>;
  let mockCoffeeSvc: jasmine.SpyObj<CoffeeService>;
  let mockStateSvc : jasmine.SpyObj<StateService>;

  beforeEach(async () => {

    mockCoffeeSvc = jasmine.createSpyObj(['deleteCoffee','getById','addCoffee','updateCoffee', 'getActives']);
    mockAlertSvc = jasmine.createSpyObj(['success'])
    mockStateSvc = jasmine.createSpyObj(['go'])

    await TestBed.configureTestingModule({
      imports: [OrderComponent],
      providers: [
        {provide : CoffeeService, useValue: mockCoffeeSvc},
        {provide: StateService, useValue: mockStateSvc}
      ],
      schemas:[NO_ERRORS_SCHEMA]
    })
    .compileComponents();   
    mockCoffeeSvc.getActives.and.returnValue(of(coffees));
    component = new OrderComponent(mockCoffeeSvc, mockAlertSvc, mockStateSvc);
    component.ngOnInit();

  });

  it('Should be created', async() =>{   
    expect(component).toBeTruthy();    
  });

  it('deleteCoffee() should call deleteCoffee of service', () =>{
    mockCoffeeSvc.deleteCoffee.and.returnValue(of(coffees[0]));
    component.deleteCoffee(coffees[0]);
    expect(mockCoffeeSvc.deleteCoffee).toHaveBeenCalled();
  });

  
  it('edit() should call go method from StateService', () =>{
    component.editCoffee(coffees[0]);
    expect(mockStateSvc.go).toHaveBeenCalled();
  })

  it('Should filter by roaster', () =>{
    component.filterFields['roaster'] = 'Expresso'
    let filteredCoffees = component.getFiltered();
    console.log(filteredCoffees)
    expect(filteredCoffees.length).toEqual(10)
  })

  it('Should filter by Size', () =>{
    
    component.filterFields['size'] = '12'
    let filteredCoffees = component.getFiltered();
    expect(filteredCoffees.length).toEqual(8)
  })

  it('Should filter by Roast Type', () =>{
    component.filterFields['roast'] = 'Light'
    let filteredCoffees = component.getFiltered();
    expect(filteredCoffees.length).toEqual(10)
  })

  it('Should filter by Format Type', () =>{
    component.filterFields['format'] = 'Beans'
    let filteredCoffees = component.getFiltered();
    expect(filteredCoffees.length).toEqual(10)
  });

  it('Shoud slice correctly to Page 2', () => {
    component.getFiltered();
    component.setSlice(2);
    expect(component.pagSelect).toBe(2);
    expect(component.itemStart).toBe(11);
    expect(component.itemEnd).toBe(20);
    
  })

  it('Shoud slice correctly to Page 3', () => {
    component.getFiltered();
    component.setSlice(3);
    
    expect(component.pagSelect).toBe(3);
    expect(component.itemStart).toBe(21);
    expect(component.itemEnd).toBe(21);
    
  })
});
