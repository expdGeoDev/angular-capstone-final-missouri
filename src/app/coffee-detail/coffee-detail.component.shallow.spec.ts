import { ComponentFixture,  TestBed } from '@angular/core/testing';

import { CoffeeDetailComponent } from './coffee-detail.component';
import { CoffeeService } from '../coffee-service';
import { ChangeDetectionStrategy, ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { Transition } from '@uirouter/angular';
import { Coffee } from '../model/coffee';
import { By } from '@angular/platform-browser';
describe('CoffeeDetailComponent - Shallow Tests', () => {
  let fixture: ComponentFixture<CoffeeDetailComponent>;
  let mockCoffeeSvc: jasmine.SpyObj<CoffeeService>;
  let mockTransition : jasmine.SpyObj<Transition>;

  let coffee: Coffee = {
    "id": 1, "active": true,
    "roaster": 'bye', "variety": 'Arabica',
    "size": 24, "roast": 'Light',
    "format": 'Beans', "grind": 1,
    "origin": [''], "singleOrigin": false,
    "tastingNotes": ""
  }
  beforeEach(async () => {

    mockCoffeeSvc = jasmine.createSpyObj(['getAll','getById','addCoffee','updateCoffee']);
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
    fixture = TestBed.createComponent(CoffeeDetailComponent);

  });

  it('Validate roaster label content', () =>{
    fixture.detectChanges();
    let roasterEl = fixture.debugElement.query(By.css('#lblRoaster')).nativeElement;
    expect(roasterEl.textContent).toContain('Roaster*')

  });

  it('Validate roaster input content', async () =>{

    // fixture.detectChanges();
    // let roasterEl = fixture.debugElement.query(By.css('#roaster')).nativeElement;
    // console.log('Roaster El' , roasterEl)
    // expect(roasterEl.value).toContain('bye')
    expect(fixture.componentInstance.coffee.roaster).toEqual('Initial Value') 
    fixture.componentInstance.coffee = {
        "id": 1, "active": true,
        "roaster": 'bye', "variety": 'Arabica',
        "size": 24, "roast": 'Light',
        "format": 'Beans', "grind": 1,
        "origin": [''], "singleOrigin": false,
        "tastingNotes": ""
      };
      expect(fixture.componentInstance.coffee.roaster).toEqual('bye') 
      fixture.detectChanges();
      await fixture.whenStable();
      let roasterEl = fixture.debugElement.query(By.css('#roaster')).nativeElement;
      console.log('Roaster El' , roasterEl)
      console.log(roasterEl.value)
      expect(roasterEl.value).toContain('bye')
  });
});
