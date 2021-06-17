import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSafetyComponent } from './form-safety.component';

describe('FormSafetyComponent', () => {
  let component: FormSafetyComponent;
  let fixture: ComponentFixture<FormSafetyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSafetyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSafetyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
