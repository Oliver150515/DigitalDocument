/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DocumentosDisponiblesLegalizarComponent } from './documentos-disponibles-legalizar.component';

describe('DocumentosDisponiblesLegalizarComponent', () => {
  let component: DocumentosDisponiblesLegalizarComponent;
  let fixture: ComponentFixture<DocumentosDisponiblesLegalizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentosDisponiblesLegalizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosDisponiblesLegalizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
