import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinsmgComponent } from './coinsmg.component';

describe('CoinsmgComponent', () => {
  let component: CoinsmgComponent;
  let fixture: ComponentFixture<CoinsmgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoinsmgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoinsmgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
