
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { async, ComponentFixture, TestBed} from '@angular/core/testing';

import {Ng2CompleterModule} from 'ng2-completer';

import {XG_TABLE_ELEMENTS,Row,Cell,Column,DataSet} from '../../../data/data-set/index';

import { CellDefaultEditorComponent } from './cell-default-editor.component';
import {XG_TABLE_CELL_COMPONENTS} from '../../editors/index'

describe('CellDefaultEditorComponent', () => {
  let component: CellDefaultEditorComponent;
  let fixture: ComponentFixture<CellDefaultEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[Ng2CompleterModule,FormsModule],
      declarations: [ 
        CellDefaultEditorComponent,
        ...XG_TABLE_ELEMENTS,
        ...XG_TABLE_CELL_COMPONENTS ,
      
        ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
      
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
