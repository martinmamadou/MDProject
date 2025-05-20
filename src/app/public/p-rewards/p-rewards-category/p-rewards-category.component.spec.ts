import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PRewardsCategoryComponent } from './p-rewards-category.component';

describe('PRewardsCategoryComponent', () => {
  let component: PRewardsCategoryComponent;
  let fixture: ComponentFixture<PRewardsCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PRewardsCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PRewardsCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
