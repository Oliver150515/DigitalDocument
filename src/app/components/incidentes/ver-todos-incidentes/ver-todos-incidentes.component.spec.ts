/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VerTodosIncidentesComponent } from './ver-todos-incidentes.component';

describe('VerTodosIncidentesComponent', () => {
  let component: VerTodosIncidentesComponent;
  let fixture: ComponentFixture<VerTodosIncidentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerTodosIncidentesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerTodosIncidentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
