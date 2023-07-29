import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatgorieComponent } from './catgorie.component';

describe('CatgorieComponent', () => {
  let component: CatgorieComponent;
  let fixture: ComponentFixture<CatgorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatgorieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatgorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
