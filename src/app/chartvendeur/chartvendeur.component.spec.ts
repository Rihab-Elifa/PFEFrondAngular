import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartvendeurComponent } from './chartvendeur.component';

describe('ChartvendeurComponent', () => {
  let component: ChartvendeurComponent;
  let fixture: ComponentFixture<ChartvendeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartvendeurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartvendeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
