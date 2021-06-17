import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KmAdminEditComponent } from './km-admin-edit.component';

describe('KmAdminEditComponent', () => {
  let component: KmAdminEditComponent;
  let fixture: ComponentFixture<KmAdminEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KmAdminEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KmAdminEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
