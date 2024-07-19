import { TestBed } from "@angular/core/testing";
import { CoffeeService } from "./coffee-service";
import {HttpClientTestingModule, HttpTestingController}from "@angular/common/http/testing"
import { Coffee } from "./model/coffee";


describe('Coffee Service Integrated Test', () =>{

    let httpTestController : HttpTestingController;
    let coffeSvc : CoffeeService;
    let baseUrl : string = 'http://localhost:8100/coffees'
    
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

            const req = httpTestController.match( baseUrl + '/1');
            req[0].flush({id:'1', roaster: "Tim Horton's"});
            
            expect(req[0].request.method).toBe('GET');
            
        });
    })

    describe('getAll', () =>{
        it('should call getAll with the correct URL', () =>{
            coffeSvc.getAll().subscribe();
            const req = httpTestController.match(baseUrl);
            expect(req[1].request.method).toBe('GET');
        })
    })

    describe('addCoffee', () =>{
        it('should call addCoffee with correct URL', () =>{
            let coffee: Coffee = {
                "id": 2, "active": true,
                "roaster": 'bye', "variety": 'Arabica',
                "size": 24, "roast": 'Light',
                "format": 'Beans', "grind": 1,
                "origin": [''], "singleOrigin": false,
                "tastingNotes": ""
            }

            coffeSvc.addCoffee(coffee).subscribe()
            const req = httpTestController.match(baseUrl);

            expect(req[1].request.method).toBe('POST');
            
        })
    })

    describe('getActivies', () =>{
        it('should call getActives with the correct URL', () =>{
            coffeSvc.getActives().subscribe();
            const req = httpTestController.expectOne(baseUrl + '?active=true');
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

            coffeSvc.updateCoffee(coffee).subscribe();
            const req = httpTestController.expectOne(baseUrl + '/2');
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

            coffeSvc.deleteCoffee(coffee).subscribe();
            const req = httpTestController.expectOne(baseUrl + '/2');
            expect(req.request.method).toBe('PUT');
        })
    })
        
    

})