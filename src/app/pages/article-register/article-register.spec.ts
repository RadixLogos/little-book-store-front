import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleRegister } from './article-register';

describe('ArticleRegister', () => {
  let component: ArticleRegister;
  let fixture: ComponentFixture<ArticleRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticleRegister],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleRegister);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
