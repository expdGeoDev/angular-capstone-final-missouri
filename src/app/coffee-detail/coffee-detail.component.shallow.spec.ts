import { ComponentFixture,  TestBed } from '@angular/core/testing';
import { CoffeeDetailComponent } from './coffee-detail.component';
import { CoffeeService } from '../coffee-service';
import {  NO_ERRORS_SCHEMA } from '@angular/core';
import { Transition } from '@uirouter/angular';
import { By } from '@angular/platform-browser';
import { Coffee } from '../model/coffee';

describe('CoffeeDetailComponent - Shallow Tests', () => {

  let fixture: ComponentFixture<CoffeeDetailComponent>;
  let mockCoffeeSvc: jasmine.SpyObj<CoffeeService>;
  let mockTransition : jasmine.SpyObj<Transition>;
  let coffee : Coffee = {
    "id": 1, "active": true,
    "roaster": 'bye', "variety": 'Arabica',
    "size": 24, "roast": 'Light',
    "format": 'Beans', "grind": 1,
    "origin": [''], "singleOrigin": true,
    "tastingNotes": ""
  };
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
    fixture.componentInstance.coffee = coffee
  });

  it('Validate input element content - Roaster Attr ', async () =>{
      fixture.detectChanges();
      await fixture.whenStable();
      let roasterEl = fixture.debugElement.query(By.css('#roaster')).nativeElement;
      expect(roasterEl.value).toContain(coffee.roaster)
  });

  it('Validate select element content - Roast Type Attr', async () =>{
    fixture.detectChanges();
    await fixture.whenStable();
    let roasterEl = fixture.debugElement.query(By.css('#roastType')).nativeElement;
    expect(roasterEl.value).toContain(coffee.roast)
  });

  it('Validate range element content - Grind Attr', async () =>{
    fixture.detectChanges();
    await fixture.whenStable();
    let roasterEl = fixture.debugElement.query(By.css('#grind')).nativeElement;
    expect(roasterEl.value).toContain(coffee.grind)
  });
  
  it('Validate checkbox element content - Single Origin Attr ', async ()=>{
    fixture.detectChanges();
    await fixture.whenStable();
    let roasterEl = fixture.debugElement.query(By.css('#singleOriginSlider')).nativeElement;
    expect(roasterEl.checked).toEqual(coffee.singleOrigin)
  })

  it('Validate radio element content - Variety Attr', async() =>{
    fixture.detectChanges();
    await fixture.whenStable();
    let radioId = '#rd' + coffee.variety
    let roasterEl = fixture.debugElement.query(By.css(radioId)).nativeElement;
    expect(roasterEl.checked).toBeTrue();
    
  })
});
