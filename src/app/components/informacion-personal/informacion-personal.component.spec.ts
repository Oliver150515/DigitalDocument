import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionPersonalComponent } from './informacion-personal.component';

describe('InformacionPersonalComponent', () => {
  let component: InformacionPersonalComponent;
  let fixture: ComponentFixture<InformacionPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacionPersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
