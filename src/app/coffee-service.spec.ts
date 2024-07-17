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
    });

    // expect(coffeeTest.roaster).toBe()



  })
});
