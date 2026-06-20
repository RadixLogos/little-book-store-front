import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellComponent } from './sell-component';

describe('SellComponent', () => {
  let component: SellComponent;
  let fixture: ComponentFixture<SellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SellComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
