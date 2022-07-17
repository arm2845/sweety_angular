import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartAuthComponent } from './start-auth.component';

describe('StartAuthComponent', () => {
  let component: StartAuthComponent;
  let fixture: ComponentFixture<StartAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
