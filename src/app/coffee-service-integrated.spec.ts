import { TestBed } from "@angular/core/testing";
import { CoffeeService } from "./coffee-service";
import {HttpClientTestingModule, HttpTestingController}from "@angular/common/http/testing"
import { Coffee } from "./model/coffee";
describe('Coffee Service Integrated Test', () =>{

    let httpTestController : HttpTestingController;
    let coffeSvc : CoffeeService;
    
    beforeEach(() =>{
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers:[CoffeeService]
        })

        httpTestController = TestBed.inject(HttpTestingController);
        coffeSvc = TestBed.inject(CoffeeService);
    });

    describe('getCoffeeById', () =>{
        it('should call get with the correct URL', () =>{
            coffeSvc.getById(1).subscribe(coffee => {
                expect((coffee.id).toString()).toBe('1');
                expect(coffee.roaster).toBe("Tim Horton's");
            });

            const req = httpTestController.expectOne('http://localhost:8100/coffees/1');
            req.flush({id:'1', roaster: "Tim Horton's"});
            
            expect(req.request.method).toBe('GET');
            httpTestController.verify();
        });
    })

    describe('getAll', () =>{
        it('should call getAll with the correct URL', () =>{
            coffeSvc.getAll().subscribe();
            const req = httpTestController.expectOne('http://localhost:8100/coffees/?active=true');
            expect(req.request.method).toBe('GET');
        })
    })

    
    describe('updateCoffee', () =>{
        it('should call updateCoffee with the correct URL', () =>{

            let coffee: Coffee = {
                      "id": 2, "active": true,
                      "roaster": 'bye', "variety": 'Arabica',
                      "size": 24, "roast": 'Light',
                      "format": 'Beans', "grind": 1,
                      "origin": [''], "singleOrigin": false,
                      "tastingNotes": ""
            }

            coffeSvc.updateCoffee(coffee);
            const req = httpTestController.expectOne('http://localhost:8100/coffees/2');
            expect(req.request.method).toBe('PUT');
            
        })
    })

    describe('delete Coffee', () => {        
        
        it('should call deleteCoffee with the correct URL', () =>{

            let coffee: Coffee = {
                    "id": 2, "active": true,
                    "roaster": 'bye', "variety": 'Arabica',
                    "size": 24, "roast": 'Light',
                    "format": 'Beans', "grind": 1,
                    "origin": [''], "singleOrigin": false,
                    "tastingNotes": ""
            }

            coffeSvc.deleteCoffee(coffee);
            const req = httpTestController.expectOne('http://localhost:8100/coffees/2');
            expect(req.request.method).toBe('PUT');
        
        })
    })
        
    

})