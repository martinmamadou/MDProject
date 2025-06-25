import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PChallengesDetailComponent } from './p-challenges-detail.component';

describe('PChallengesDetailComponent', () => {
  let component: PChallengesDetailComponent;
  let fixture: ComponentFixture<PChallengesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PChallengesDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PChallengesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
