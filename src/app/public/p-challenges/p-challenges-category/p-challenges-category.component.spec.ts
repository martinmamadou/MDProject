import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PChallengesCategoryComponent } from './p-challenges-category.component';

describe('PChallengesCategoryComponent', () => {
  let component: PChallengesCategoryComponent;
  let fixture: ComponentFixture<PChallengesCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PChallengesCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PChallengesCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
