import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeFumeursComponent } from './type-fumeurs.component';

describe('TypeFumeursComponent', () => {
  let component: TypeFumeursComponent;
  let fixture: ComponentFixture<TypeFumeursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeFumeursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeFumeursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
