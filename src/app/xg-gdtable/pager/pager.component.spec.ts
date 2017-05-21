import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagerComponent } from './pager.component';
import {LocalDataSource}  from '../data/datasource/local/local-data-source';
import {DataSource} from '../data/datasource/data-source';

describe('PagerComponent', () => {
  let component: PagerComponent;
  let fixture: ComponentFixture<PagerComponent>;

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
  
  let source:DataSource=new LocalDataSource(data);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagerComponent);
    component = fixture.componentInstance;
    component.source=source;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
