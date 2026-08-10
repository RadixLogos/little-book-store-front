import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreRegister } from './genre-register';

describe('GenreRegister', () => {
  let component: GenreRegister;
  let fixture: ComponentFixture<GenreRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenreRegister],
    }).compileComponents();

    fixture = TestBed.createComponent(GenreRegister);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
