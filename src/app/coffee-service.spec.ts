import { TestBed } from '@angular/core/testing';

import { CoffeeService } from './coffee-service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Coffee } from './model/coffee';

describe('CoffeeService Unit Test', () => {
  let service: CoffeeService;
  

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule],
      providers:[CoffeeService]
    });
    TestBed.inject(HttpClient);
    service = TestBed.inject(CoffeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get by id should match coffee-data.json', (done) =>{
    let coffeeTest : Coffee;
    service.getById(1).subscribe(coffee => {
      coffeeTest = coffee;
      console.log('Coffef Test' , coffeeTest);
      expect(coffeeTest.roaster).toBe("Tim Horton's teste");
      done()
    })
  })

  it('getActives should not contain coffee with active equals false', (done) =>{
    service.getActives().subscribe(coffees => {
      let inactiveCount = coffees.filter(c => c.active === false).length;
      expect(inactiveCount).toBe(0)
      done()
    })
  })
  
  it('Last id attribute is equal to data size', (done) =>{
    service.getAll().subscribe(coffees => {
      let allCount = coffees.length;
      expect(allCount).toBe(service.lastId)
      done()
    })
  })

  it('should add a coffee to the list', (done) =>{
    let mariCoffee: Coffee = {
      "id": 0, "active": true,
      "roaster": 'MariCoffee', "variety": 'Arabica',
      "size": 24, "roast": 'Light',
      "format": 'Beans', "grind": 1,
      "origin": [''], "singleOrigin": false,
      "tastingNotes": ""
    }
   
    service.addCoffee(mariCoffee).subscribe( coffee => {
     service.getAll().subscribe(coffees =>{
       expect(coffees).toContain(mariCoffee)
       done()
      })
    })
  });

  it('Should update coffee data', (done) =>{
    let mariCoffee: Coffee = {
      "id": 2, "active": true,
      "roaster": 'MariCoffee', "variety": 'Arabica',
      "size": 24, "roast": 'Light',
      "format": 'Beans', "grind": 1,
      "origin": [''], "singleOrigin": false,
      "tastingNotes": ""
    };
    service.updateCoffee(mariCoffee).subscribe( c => {
      service.getById(2).subscribe(coffee => {
        expect(coffee.roaster).toEqual('MariCoffee')
        done()
      })
    })
  });
  
  it('Should update coffee data', (done) =>{
    let mariCoffee: Coffee = {
      "id": 2, "active": true,
      "roaster": 'MariCoffee', "variety": 'Arabica',
      "size": 24, "roast": 'Light',
      "format": 'Beans', "grind": 1,
      "origin": [''], "singleOrigin": false,
      "tastingNotes": ""
    };
    service.deleteCoffee(mariCoffee).subscribe( c => {
      service.getById(2).subscribe(coffee => {
        expect(coffee.active).toBeFalse();
        done()
      })
    })
  });
});
