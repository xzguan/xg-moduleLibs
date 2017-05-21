import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleComponent } from './title.component';
import {Cell,Column,DataSet } from '../data/data-set/index'
import {LocalDataSource} from '../data/datasource/local/local-data-source'
import {DataSource} from '../data/datasource/data-source'

describe('TitleComponent', () => {
  let component: TitleComponent;
  let fixture: ComponentFixture<TitleComponent>;


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
  let dataSet:DataSet=new DataSet(data,columnSetting);
  let column:Column=new Column('0',columnSetting['email']); 
  let dataSource:DataSource=new LocalDataSource(data);
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleComponent);
    component = fixture.componentInstance;
    component.column=column;
    component.source=dataSource;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
