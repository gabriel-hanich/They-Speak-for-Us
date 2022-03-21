import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionErrorScreenComponent } from './connection-error-screen.component';

describe('ConnectionErrorScreenComponent', () => {
  let component: ConnectionErrorScreenComponent;
  let fixture: ComponentFixture<ConnectionErrorScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectionErrorScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionErrorScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
