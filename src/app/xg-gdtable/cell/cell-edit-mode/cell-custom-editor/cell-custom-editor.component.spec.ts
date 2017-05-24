import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellCustomEditorComponent } from './cell-custom-editor.component';

describe('CellCustomEditorComponent', () => {
  let component: CellCustomEditorComponent;
  let fixture: ComponentFixture<CellCustomEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellCustomEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellCustomEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
