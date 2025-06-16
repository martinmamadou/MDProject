import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PUrgencesCategoryComponent } from './p-urgences-category.component';

describe('PUrgencesCategoryComponent', () => {
  let component: PUrgencesCategoryComponent;
  let fixture: ComponentFixture<PUrgencesCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PUrgencesCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PUrgencesCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
