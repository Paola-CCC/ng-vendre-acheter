/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StarsGroupComponent } from './stars-group.component';

describe('StarsGroupComponent', () => {
  let component: StarsGroupComponent;
  let fixture: ComponentFixture<StarsGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarsGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
