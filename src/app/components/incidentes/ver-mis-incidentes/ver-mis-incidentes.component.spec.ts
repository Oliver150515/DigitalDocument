/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VerMisIncidentesComponent } from './ver-mis-incidentes.component';

describe('VerMisIncidentesComponent', () => {
  let component: VerMisIncidentesComponent;
  let fixture: ComponentFixture<VerMisIncidentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerMisIncidentesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerMisIncidentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
