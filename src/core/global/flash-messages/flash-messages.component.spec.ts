import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashMessagesComponent } from './flash-messages.component';

describe('FlashMessagesComponent', () => {
  let component: FlashMessagesComponent;
  let fixture: ComponentFixture<FlashMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlashMessagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlashMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
