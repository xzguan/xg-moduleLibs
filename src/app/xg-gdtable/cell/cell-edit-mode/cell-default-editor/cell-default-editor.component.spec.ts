import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellDefaultEditorComponent } from './cell-default-editor.component';
import {XG_TABLE_CELL_COMPONENTS} from '../../editors/index'

describe('CellDefaultEditorComponent', () => {
  let component: CellDefaultEditorComponent;
  let fixture: ComponentFixture<CellDefaultEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellDefaultEditorComponent,...XG_TABLE_CELL_COMPONENTS ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellDefaultEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
