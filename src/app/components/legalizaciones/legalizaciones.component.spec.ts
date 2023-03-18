import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalizacionesComponent } from './legalizaciones.component';

describe('LegalizacionesComponent', () => {
  let component: LegalizacionesComponent;
  let fixture: ComponentFixture<LegalizacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegalizacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
