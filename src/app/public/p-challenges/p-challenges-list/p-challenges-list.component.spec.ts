import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PChallengesListComponent } from './p-challenges-list.component';

describe('PChallengesListComponent', () => {
  let component: PChallengesListComponent;
  let fixture: ComponentFixture<PChallengesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PChallengesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PChallengesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
