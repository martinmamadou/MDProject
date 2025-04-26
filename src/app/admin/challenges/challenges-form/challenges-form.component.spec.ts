import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengesFormComponent } from './challenges-form.component';

describe('ChallengesFormComponent', () => {
  let component: ChallengesFormComponent;
  let fixture: ComponentFixture<ChallengesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallengesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
