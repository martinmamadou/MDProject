import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmokerProfileComponent } from './smoker-profile.component';

describe('SmokerProfileComponent', () => {
  let component: SmokerProfileComponent;
  let fixture: ComponentFixture<SmokerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmokerProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmokerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
