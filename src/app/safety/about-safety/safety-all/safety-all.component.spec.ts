import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafetyAllComponent } from './safety-all.component';

describe('SafetyAllComponent', () => {
  let component: SafetyAllComponent;
  let fixture: ComponentFixture<SafetyAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafetyAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SafetyAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
