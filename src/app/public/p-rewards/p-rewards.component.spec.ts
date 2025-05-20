import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PRewardsComponent } from './p-rewards.component';

describe('PRewardsComponent', () => {
  let component: PRewardsComponent;
  let fixture: ComponentFixture<PRewardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PRewardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PRewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
