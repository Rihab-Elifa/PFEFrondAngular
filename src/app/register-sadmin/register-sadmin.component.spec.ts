import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSAdminComponent } from './register-sadmin.component';

describe('RegisterSAdminComponent', () => {
  let component: RegisterSAdminComponent;
  let fixture: ComponentFixture<RegisterSAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterSAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterSAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
