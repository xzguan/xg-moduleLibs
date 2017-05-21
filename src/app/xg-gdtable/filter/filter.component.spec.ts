import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from '@angular/forms'

import { FilterComponent } from './filter.component';
import { Column,DataSet} from '../data/data-set/index';
import {LocalDataSource} from '../data/datasource/local/local-data-source';
import {DataSource} from '../data/datasource/data-source';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

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


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[FormsModule],
      declarations: [ FilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    component.column=column;
    component.source=dataSource;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
