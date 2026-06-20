import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookRegister } from './book-register';

describe('BookRegister', () => {
  let component: BookRegister;
  let fixture: ComponentFixture<BookRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookRegister],
    }).compileComponents();

    fixture = TestBed.createComponent(BookRegister);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
