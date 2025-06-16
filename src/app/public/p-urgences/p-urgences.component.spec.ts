import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PUrgencesComponent } from './p-urgences.component';

describe('PUrgencesComponent', () => {
  let component: PUrgencesComponent;
  let fixture: ComponentFixture<PUrgencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PUrgencesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PUrgencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
