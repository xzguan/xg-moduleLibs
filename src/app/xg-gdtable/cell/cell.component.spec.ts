import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {CUSTOM_ELEMENTS_SCHEMA}  from '@angular/core';
import  {FormsModule} from '@angular/forms';
import { CellComponent } from './cell.component';
import{Cell,Column,DataSet,Row} from '../data/data-set/index';
import {LocalDataSource} from '../data/datasource/local/local-data-source'
import {DataSource} from '../data/datasource/data-source';
import {CellViewModeComponent} from '../cell/cell-view-mode/cell-view-mode.component'
import {CellEditModeComponent} from '../cell/cell-edit-mode/cell-edit-mode.component'

import {XG_TABLE_CELL_COMPONENTS} from './editors/index';
import {CustomUrlEditorComponent} from './custom-editors/custom-url-editor.component'
import {DefaultEditorComponent} from './cell-edit-mode/cell-default-editor.component'
import {Ng2CompleterModule} from 'ng2-completer'

describe('CellComponent', () => {
  let component: CellComponent;
  let fixture: ComponentFixture<CellComponent>;

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
      isFilterable:'true'
    },
    roles:{
      titel:'Roles',
      type:'Array<any>'
    }  
  }
  let dataSet:DataSet=new DataSet(data,columnSetting)
  let dataSource:DataSource=new LocalDataSource(data);
  let column:Column=new Column('0',columnSetting['email']);
  let row:Row=new Row(0,data,dataSet);
  let cell:Cell=new Cell(data[0]['email'],column,row,dataSet)

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        Ng2CompleterModule,
        FormsModule
        ],
      declarations: [ 
        CellComponent ,
        CellViewModeComponent,
        CellEditModeComponent,
        CustomUrlEditorComponent,
        DefaultEditorComponent,
        ...XG_TABLE_CELL_COMPONENTS
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellComponent);
    component = fixture.componentInstance;
    component.cell=cell;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
