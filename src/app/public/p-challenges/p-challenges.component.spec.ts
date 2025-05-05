import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PChallengesComponent } from './p-challenges.component';

describe('PChallengesComponent', () => {
  let component: PChallengesComponent;
  let fixture: ComponentFixture<PChallengesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PChallengesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PChallengesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
