import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllVendeurComponent } from './all-vendeur.component';

describe('AllVendeurComponent', () => {
  let component: AllVendeurComponent;
  let fixture: ComponentFixture<AllVendeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllVendeurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllVendeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
