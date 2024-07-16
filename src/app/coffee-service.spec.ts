import { TestBed } from '@angular/core/testing';

import { CoffeeService } from './coffee-service';
import { HttpClient } from '@angular/common/http';

describe('CoffeeService', () => {
  let service: CoffeeService;
  let mockHttpClient : jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    mockHttpClient = jasmine.createSpyObj(['get', 'post'])
    TestBed.configureTestingModule({providers:[{
      provide : HttpClient, useValue: mockHttpClient}
    ]});
    service = TestBed.inject(CoffeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
