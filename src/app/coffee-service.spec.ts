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
      expect(coffeeTest.roaster).toBe("Tim Horton's");
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
  
});
