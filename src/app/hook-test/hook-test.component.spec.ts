import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HookTestComponent } from './hook-test.component';

describe('HookTestComponent', () => {
  let component: HookTestComponent;
  let fixture: ComponentFixture<HookTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HookTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HookTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
