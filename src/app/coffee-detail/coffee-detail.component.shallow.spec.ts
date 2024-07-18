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
    fixture.componentInstance.coffee = {
        "id": 1, "active": true,
        "roaster": 'bye', "variety": 'Arabica',
        "size": 24, "roast": 'Light',
        "format": 'Beans', "grind": 1,
        "origin": [''], "singleOrigin": false,
        "tastingNotes": ""
      };
  });

  it('Validate input element content - Roaster Attr ', async () =>{
      fixture.detectChanges();
      await fixture.whenStable();
      let roasterEl = fixture.debugElement.query(By.css('#roaster')).nativeElement;
      expect(roasterEl.value).toContain('bye')
  });

  it('Validate select element content - Roast Type Attr', async () =>{
    fixture.detectChanges();
    await fixture.whenStable();
    let roasterEl = fixture.debugElement.query(By.css('#roastType')).nativeElement;
    expect(roasterEl.value).toContain('Light')
  });

  it('Validate range element content - Grind Attr', async () =>{
    fixture.detectChanges();
    await fixture.whenStable();
    let roasterEl = fixture.debugElement.query(By.css('#grind')).nativeElement;
    expect(roasterEl.value).toContain(1)
  });
  
  it('Validate radio element content - Variety Attr ', async ()=>{
    fixture.detectChanges();
    await fixture.whenStable();
    let roasterEl = fixture.debugElement.query(By.css('#grind')).nativeElement;
    expect(roasterEl.value).toContain(1)
  })
});
