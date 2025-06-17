import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PUrgencesListComponent } from './p-urgences-list.component';

describe('PUrgencesListComponent', () => {
  let component: PUrgencesListComponent;
  let fixture: ComponentFixture<PUrgencesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PUrgencesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PUrgencesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
