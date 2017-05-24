import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ng2CompleterModule } from 'ng2-completer';
import { CellEditModeComponent } from './cell-edit-mode.component';
import {DataSet,Cell,Column,Row} from '../../data/data-set/index';
import {CellDefaultEditorComponent} from './cell-default-editor/cell-default-editor.component';
import {CustomUrlEditorComponent} from '../custom-editors/custom-url-editor.component';

import {XG_TABLE_CELL_COMPONENTS} from '../editors/index';

describe('CellEditModeComponent', () => {
  let component: CellEditModeComponent;
  let fixture: ComponentFixture<CellEditModeComponent>;

  let data:Array<any>=[
    {id:1,email:'eric@huida.com',roles:[{admin:true},{backup:true}]},
    {id:2,email:'johny@huida.com',roles:[{admin:false},{backup:false}]}
  ];
  let columnSetting:object={
    id:{
        title:'ID',
        type:'string',
        isEditable:'false'
      },
    email:{
      title:'Email',
      type:'string',
      isEditable:'false',
      isSortable:'true',
    },
    roles:{
      titel:'Roles',
      type:'Array<any>'
    }  
  }
  let dataSet=new DataSet(data,columnSetting);
  let column=new Column('0',columnSetting['email'])
  let row=new Row(0,data[0],dataSet);
  let cell:Cell=new Cell(data[0]['email'],column,row);


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        Ng2CompleterModule,
        FormsModule
      ],
      declarations: [
         CellEditModeComponent,
         CustomUrlEditorComponent,
         CellDefaultEditorComponent,
         ...XG_TABLE_CELL_COMPONENTS
        ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellEditModeComponent);
    component = fixture.componentInstance;
    component.cell=cell;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
