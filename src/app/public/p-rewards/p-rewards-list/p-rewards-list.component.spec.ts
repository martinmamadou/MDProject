import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PRewardsListComponent } from './p-rewards-list.component';

describe('PRewardsListComponent', () => {
  let component: PRewardsListComponent;
  let fixture: ComponentFixture<PRewardsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PRewardsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PRewardsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
