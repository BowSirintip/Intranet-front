import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PpeToolComponent } from './ppe-tool.component';

describe('PpeToolComponent', () => {
  let component: PpeToolComponent;
  let fixture: ComponentFixture<PpeToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PpeToolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PpeToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
