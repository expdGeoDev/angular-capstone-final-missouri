import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeSvcTestComponent } from './coffee-svc-test.component';

describe('CoffeeSvcTestComponent', () => {
  let component: CoffeeSvcTestComponent;
  let fixture: ComponentFixture<CoffeeSvcTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoffeeSvcTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoffeeSvcTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
