import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dialog22Component } from './dialog22.component';

describe('Dialog22Component', () => {
  let component: Dialog22Component;
  let fixture: ComponentFixture<Dialog22Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Dialog22Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dialog22Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
