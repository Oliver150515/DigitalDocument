/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SlaComponent } from './Sla.component';

describe('SlaComponent', () => {
  let component: SlaComponent;
  let fixture: ComponentFixture<SlaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
